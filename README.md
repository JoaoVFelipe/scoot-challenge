# Technical take-home - Scoot/Adecco
Evaluation project for application in the selection process at Scoot.

## Details

This project was developed using NodeJS for the backend and Angular for the frontend.
It's necessary to run this application:
* Angular CLI 16.0: https://angular.io/
* Node Package Manager: https://nodejs.org/pt-br/download/package-manager/

## Execution
### API:
*  After cloning the repo, open the folder './api';
*  Create a .env file and update it with your desired configuration, following the env.sample file - It's recommended to set the port as '3001';
*  Run 'npm install' to install all necessary packages;
*  Run 'npm start' to start the server in the configured port;

### Front:
* Starting at the application root, open the folder './front/mytodo-app';
* Run 'npm install' to install all necessary packages;
* After installing, check the file at '.src/environment/environment.ts', and change the BASE_URL as per the address adhered by the Node server during backend initialization;
* Run 'npm start' to start the application in the configured port;
* Access it in the address informed at your console;
