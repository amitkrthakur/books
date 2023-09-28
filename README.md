# Books Assignment

You can preview this project live at this [link](https://books-sv6a.onrender.com).

This project is developed as per the assignment and requirements specified [here](https://github.com/Inspire-com/candidate-homework/blob/main/FE_Engineer.md)

It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

#### Pre-Requisites

Node environemnt required to start the dev server and Angular need to be installed globally to be able to run `ng serve` command. `npm start` command could also be used to do the same.

## Build

Run `ng build` or `npm run build` command to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployment

For static deployment use the artifacts generated after successfully running the build process. Copy all contents from the `dist/<project-name>` and place it in the server root directory from where the application needs to be served.

#### NOTE

As this is a SPA (Single Page Application) if rounting is used further configurations required to be done on server t avoid **404** errors.
Configure the server to send all requests to the index file
