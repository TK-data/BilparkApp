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
The system will be a portal for businesses to manage their fleet of cars. Each company that wants to use the platform will get access to two main features. The person in charge from the company will have access to an administration dashboard, which will are a web application. The employees of the company that use company vehicles will use a mobile application to log any car related activities.

#### The Application
The application will give the employees a range of functionality that will make it easier to use the car at work.

Examples of functionalities:

- Driving log: The employe can register work related car trips.
- Damage report: The employe can register any damage on the vehicle.
- Fuel refill notification: The employe can choose when it want's to refill fuel and then get a notification every week on the same day and time.

#### The Dashboard
The dashboard will give an overview of all car related activities that the employees in the company registers. For now the only thing that is ready is the login page and a page that shows all the cars in the database.

Future development will give the person in charge from the company an complete overview of everything about their fleet of cars. Ranging from when people refills and how long every car have driven to when the insurance of each car expires.

#### The Backend
The backend is made with Sails which is a MVC framework built on Node.js. It serves as an API endpoint on our backend and let users manipulate and fetch data from the database, by using our frontend applications.



The [Application](https://github.com/TK-data/BilparkApp) and the [Dashboard](https://github.com/TK-data/BilparkDashboard) are both connected to the same [backend](https://github.com/TK-data/BilparkBackend).

## Development Setup
Do the following steps to set up and run the application for development. To make the application work properly, the backend has to be up and running.
### Backend
First you need to clone https://github.com/TK-data/BilparkBackend.
```
git clone https://github.com/TK-data/BilparkBackend.git
```
Install sails globally for the sails command to work:
```
npm i -g sails
```
To install the application, navigate to the backend folder and install dependencies:
```
cd Backend
npm install
```
To locally run the backend on your machine serve it with:
```
sails lift
```
You need to set up the environment variables for the DSM API and the database.
Duplicate ```app-env.example``` and rename it ```app-env```
Open up ```app-env``` and edit the variables to the correct values for your DSM account and database.

To add these variables to the enviroment, open up console at the backend folder, and execute ```source app-env```

### React Native Application
First you need to clone https://github.com/TK-data/BilparkApp.
```
git clone https://github.com/TK-data/BilparkApp.git
```
Then point to the address of the machine that is running the backend:
```
go to BilparkApp\src\config
duplicate connections.js.example and rename it connections.js
edit the API_ADDRESS to where the backend is running
save
```
Then install the dependencies and run the application.
```
cd BilparkApp
npm install
npm start
```
You can now run the application on mobile devices\* or in an emulator.

\* You need the [Expo app](https://expo.io) to run the app on mobile devices.
Use the Expo app to scan the QR code shown in the terminal.

### Dashboard React Application
First you need to clone https://github.com/TK-data/BilparkDashboard.
```
git clone https://github.com/TK-data/BilparkDashboard.git
```
First point to the address of the machine that is running the backend:
```
go to bpdashboard\src\config
duplicate connections.js.example and rename it connections.js
edit the API_ADDRESS to where the backend is running
save
```

Then run the Application from terminal

```
cd bpdashboard
npm Install
npm start
```

The Dashboard will automatically open in your preferred browser.
(If not, go to http://localhost:3000/)


## React Native App Description
Components, containers, modules and other parts of the React Native "Mobile" Application.

### Containers/modules

#### Login
Is put together by LoginScreen and LoginForm\* which give the user the possibility to log into the application.
#### UserRegister
Is put together by UserRegisterScreen and UserRegisterForm\*  which give the user the possibility to register into the application.
#### Menu
Is put together by MenuScreen, MenuBox, ProfileButton, Slide1 and Slide2. You will be able to navigate to all functionality from the Menu.
#### DamageReport
Is put together by DamageReportScreen and DamageReportForm\*. The user can register damage on it's vehicle from this component.  
#### FuelDay
Is put together by FuelDayScreen and FuelDayForm\*. The user can change when it wants notification about when to refill from this component.  
#### FuelDayModal
FuelSetNotificationScreen will tell the user how much he/she can save by refueling on specific days.
#### FuelRefill
Is put together by FuelRefillScreen, FuelRefillList, FuelRefillItem, FuelRefillForm and SettingsButton. This component gives the user the possibility to register when they did refill, how much the petrol cost and how much they paid.
#### RegisterCompany
Is put together by RegisterCompanyScreen and CompanyPicker. This component lets the user choose which company they are connected to.
#### RegisterVehicle
Is put together by GetCarScreen, GetCarForm and CarForm\* which together lets the user search for their car and then accept if it is theirs.
#### TravelLog
Is put together by TravelLogScreen, TravelLogInput, TravelLogPassengerForm\*, TravelLogCargoForm\*, GooglePlacesAutocompleteFrom and GooglePlacesAutocompleteTo.

\* This component are using [tcomb-form-native ](https://github.com/gcanti/tcomb-form-native)

### Components

#### LoginScreen
Container for LoginForm
#### LoginForm

#### UserRegisterScreen

#### UserRegisterForm

#### MenuScreen

#### MenuBox

#### ProfileButton

#### Slide1

#### Slide2

#### DamageReportScreen

#### DamageReportForm

#### FuelDayScreen

#### FuelDayForm

#### FuelSetNotificationScreen

#### FuelRefillScreen

#### FuelRefillList

#### FuelRefillItem

#### FuelRefillForm

#### SettingsButton

#### RegisterCompanyScreen

#### CompanyPicker

#### GetCarScreen

#### GetCarForm

#### CarForm

#### TravelLogScreen

#### TravelLogInput

#### TravelLogPassengerForm

#### TravelLogCargoForm

#### GooglePlacesAutocompleteFrom

#### GooglePlacesAutocompleteTo


### Service classes

This project handles state with [redux](https://redux.js.org/).

## React Dashboard Description
Components, containers, modules and other parts of the React "Dashboard" Application.

### Containers/modules

### Components
#### comp 1
Comp 1 description
#### comp 2
comp 2 description
### Service classes

## Database
We use [MySQL](https://www.mysql.com/) for the database. You can set up your own MySQL database and Sails will create all the tables for you. If you want to use a different database you can read more about adapters here: https://sailsjs.com/documentation/concepts/extending-sails/adapters

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
Registers a new fuelrefill entry.

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





### DrivingLog
```
POST /api/drivinglog/save
```
Saves a driving log for the current user
```
GET /api/drivinglog/getall
```
Get all driving logs for current user
```
POST /api/drivinglog/remove
```
Deletes a driving log
### Admin
```
POST /api/admin/login
```
Login as admin
```
GET /api/admin/logout
```
Logs out the current user
### Company
```
POST /api/company/save
```
Saves the company on the current user.
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

### React Native Application
We use [Expo](https://expo.io) to deploy our application. Login with your Expo account using `exp login`

#### Android Deployment
- Run `exp build:android`
- Wait for build to finnish
- Copy/paste link in browser to download APK.
- Drag and drop .apk file into emulator, or download/transfer it to an Android Device.
- (Upload .apk to Google Play Store)

##### To run on your connected Android Device:
- `brew cask install android-platform-tools`
- [Enable USB debugging on your device](https://developer.android.com/studio/run/device.html#device-developer-options)
- Connect device
- `adb install app-filename.apk`

#### iOS Deployment
- Need to have an Apple Developer Account
- Run `exp build:ios`

### React Dashboard

Build the Dashboard

```
npm run build
```
The project is now built assuming it is hosted at the server root.
If you want to read more about other methods for deployment, check out
[React Deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment).

### Backend
Info here


## Authors
* **Christian Nyvoll** - [Git](https://github.com/Chr1stian) - [LinkedIn](https://www.linkedin.com/in/christiannyvoll/)
* **Emil Schrøder** - [Git](https://github.com/emilps) - [LinkedIn](https://www.linkedin.com/in/emil-schroder/)
* **Erling Ihlen** - [Git](https://github.com/Shamzaa)
* **Henrik Liodden** - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/henrikliodden/)
* **Kristiane Westgård** - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/kristianeaw/)
* **Øystein Hammersland** - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/%C3%B8ystein-hammersland-a9698772/)
