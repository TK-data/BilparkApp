# TK_DATA

NTNU Course IT2901 (Bachelorproject) repository for group 15 with the task TK_DATA.

## List of contents
* [Overview](#overview)
* [Run Application](#run-application)
* [Development Setup](#development-setup)
* [React Native App Description](#react-native-app-description)
* [React Dashboard Description](#react-dashboard-description)
* [Database](#database)
* [Sails.js Backend](#sailsjs-backend-description)
* [API Reference](#api-reference)
* [Linting](#linting)
* [Continous Integration](#continous-integration)
* [Deployment](#deployment)

## Overview
Overall description of our task/project, what components are part of the solution and how they work together.

## Run Application
Steps to run our product package as a end-user.

## Development Setup
Do the following steps to set up and run the application for development. To make the application work properly, the backend has to be up and running.
### Backend
Install sails globally for the sails command to work:
```
npm i -g sails
```
To install the application, navigate to the backend folder and run:
```
npm install
```
To locally run the backend on your machine, navigate to the backend folder, and serve it with:
```
sails lift
```
You need to set up the environment variables for the DSM API and the database.
Duplicate ```app-env.example``` and rename it ```app-env```
Open up ```app-env``` and edit the variables to the correct values for your DSM account and database.

To add these variables to the enviroment, open up console at the backend folder, and execute ```source app-env```

### React Native Application
First point to the address of the machine that is running the backend:
```
goto BilparkApp\src\config
duplicated connections.js.example and rename it connections.js
edit the API_ADDRESS
save
```

You need the [Expo app](https://expo.io) to run the app on mobile devices.
```
cd BilparkApp
npm install
npm start
```
Use the Expo app to scan the QR code shown in the terminal.

### Dashboard React Application
Describe steps to setup and run the dashboard application.



## React Native App Description
Components, containers, modules and other parts of the React Native "Mobile" Application.

### Containers/modules

### Components
#### comp 1
Comp 1 description
#### comp 2
comp 2 description
### Service classes

## React Dashboard Description
Components, containers, modules and other parts of the React "Dashboard" Application.

## Database
We use [MySQL](https://www.mysql.com/) for the database. Set up your own MySQL database and use [TKdata_create-tables.sql](TKdata_create-tables.sql) to create all the tables you need for the project.

## Sailsjs Backend Description
Our back-end is based on [Sails](https://sailsjs.com/), an MVC and API framework that builds upon Express.js for Node.js

## API Reference
### User

```
GET /api/user
```
Get an array of user objects, in JSON format. limited to logged in admins.

```
POST /api/user
```
Register a new user. Required fields in http `body`: `Email`, `Password`(min length 8 chars) `Fname`, `Lname`, `Address`.

```
POST /api/user/login
```
Log in as a user. Required fields in http `body`: `Email`, `Password`

```
GET /api/user/logout
```
Log out current user. It just nulls your authentication and UserID in session.

```
GET /api/user/current
```
Get current logged in user. Will get forbidden if not logged in.

```
POST /api/user/notification
```
Updates the user with what time they want to save their push notification. Need to be logged in.

Required fields in body: `FuelTime: 12-00`, `FuelDay: 0-6`, `FuelNotification: 'true'`


### Car

```
POST /api/dsm?regnr=XX00000
```
Get json car object for the input registration number, or a 404 error if no such car exists

```
POST /api/car/save
```
Save a car object to a logged in user.

Example of car object:
```
"car": {
  "RegNr": "VH XXXXX",
  "Cas": "XXXXXXXXXXXX",
  "Brand": "MERCEDES-BENZ",
  "Model": "GLC 350 E 4MATIC/204 X",
  "FuelType": null,
  "RegYear": "2016",
  "VehicleGroup": "PERSONBIL",
  "Co2Emission": null,
  "NoxEmission": null,
  "FuelConsumption": null,
  "ParticleEmmision": null,
  "NextVI": null,
  "NextVINotification": null,
}
```

### FuelRefilll

```
POST /api/fuelrefill/register
```
registers a new fuelrefill entry.

Required fields in body: `FuelTime, Price, Rate`


```
POST /api/fuelrefill/remove
```
Removes a refill entry, for a logged in user.

Required field in body: `RefillID`


```
GET /api/fuelrefill/getall
```
Gets all refill entries for a logged in user.



### DamageReport

```
POST /api/damagereport/register
```
Register a new damage report.

Example of body for POST request, notice description is not required:

```
{
	"Items": [
		{
			"ItemType": "Wheel",
			"Damaged": true,
			"Description": "tire frame exploded",
		},
		{
			"ItemType": "Window",
			"Damaged": true,
		},
	]
}
```


```
GET /api/damagereport/getall
```

Gets all damage reports from a logged in user

```
GET /api/damagereport/getcurrent
```

Gets the latest damage report from a logged in user
### Blueprint APIs
#### Models
#### Controllers
#### Policies
#### Session
#### Database

## Linting
<img
src="https://es6.io/images/eslint.png"
width="50%" height="auto">

We use [ESLint]() to ensure code standards. The rules are defined in [Backend/.eslintrc](Backend/.eslintrc) and [BilparkApp/.eslintrc](BilparkApp/.eslintrc).

For setup: Install "linter" and "linter-eslint" in Atom. For other text editors, search for similar solutions.


## Continous Integration
<img src="https://travis-ci.com/images/logos/TravisCI-Full-Color.png" width="50%" height="auto">

We use [Travis CI](https://travis-ci.org/), a tool for Continuous Integration, to run our tests and upload code coverage reports to [codecov.io](https://codecov.io/).

Travis is activated on the repository and project/language specific settings are specified in the [.travis.yml](.travis.yml).

To make our workflow support continous delivery, we've added the option to automatically deploy pull requests when they are made to dev and master branch, using [Appr](https://github.com/FormidableLabs/appr).
When we use this, it automatically posts a link and QR code to the pull request, so we can run the app on our device on emulator.


## Deployment
We use [Expo](https://expo.io) to deploy our application. Login with your Expo account using `exp login`

### Android Deployment
- Run `exp build:android`
- Wait for build to finnish
- Copy/paste link in browser to download APK.
- Drag and drop .apk file into emulator, or download/transfer it to an Android Device.
- (Upload .apk to Google Play Store)

#### To run on your connected Android Device:
- `brew cask install android-platform-tools`
- [Enable USB debugging on your device](https://developer.android.com/studio/run/device.html#device-developer-options)
- Connect device
- `adb install app-filename.apk`

### iOS Deployment
- Need to have an Apple Developer Account
- Run `exp build:ios`

## Authors
* **Christian Nyvoll** - *Team Leader* - [Git](https://github.com/Chr1stian) - [LinkedIn](https://www.linkedin.com/in/christiannyvoll/)
* **Emil Schrøder** - *Social Leader* - [Git](https://github.com/emilps) - [LinkedIn](https://www.linkedin.com/in/emil-schroder/)
* **Erling Ihlen** - *Test Leader* - [Git](https://github.com/Shamzaa)
* **Henrik Liodden** - *Team Member* - [Git](https://github.com/haattis) - [LinkedIn](https://www.linkedin.com/in/henrikliodden/)
* **Kristiane Westgård** - *Agile Leader* - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/kristianeaw/)
* **Øystein Hammersland** - *Lead Designer* - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/%C3%B8ystein-hammersland-a9698772/)
