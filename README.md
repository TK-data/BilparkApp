# TK_DATA

NTNU Course IT2901 (Bachelorproject) repository for group 15 with the task TK_DATA.

## List of contents
* [Overview](#overview)
* [Run Application](#run-application)
* [Development Setup](#development-setup)
* [React Native App Description](#react-native-app-description)
* [React Dashboard Description](#react-dashboard-description)
* [Sails.js Backend](#sails.js-backend-description)
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

### React Native Application
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

## Sails.js Backend Description
Our back-end is based on [Sails](https://sailsjs.com/), an MVC and API framework that builds upon Express.js for Node.js

## API Reference
### Example Users
```
POST /api/user
```
Create a new user. Required fields: `email`and `password`.
Passworld limits etcetc
```
GET /api/user
```
Get the list of all users. Admin privileges.

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

## Deployement
Additional notes about how to deploy this on a system.

## Authors
* **Christian Nyvoll** - *Team Leader* - [Git](https://github.com/Chr1stian) - [LinkedIn](https://www.linkedin.com/in/christiannyvoll/)
* **Emil Schrøder** - *Social Leader* - [Git](https://github.com/emilps) - [LinkedIn](https://www.linkedin.com/in/emil-schroder/)
* **Erling Ihlen** - *Test Leader* - [Git](https://github.com/)
* **Henrik Liodden** - *Nothing* - [Git](https://github.com/)
* **Kristiane Westgård** - *Agile Leader* - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/kristianeaw/)
* **Øystein Hammersland** - *Lead Designer* - [Git](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/%C3%B8ystein-hammersland-a9698772/)
