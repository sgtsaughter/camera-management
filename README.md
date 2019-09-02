# CameraMangement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## TODO

Change deleted column to "Status" and if flase write "Active" if true write "Deleted"

Make sure to unsubscribe to all subscriptions in components.

Possible requirements conflict - If the user needs to see all "current" assignments then what is the point of the deleted boolean.  Should they see all the deleted ones as well, or should there be a separte tab where they can see the delted assignments...possibly make the dashboard get all assignments, and filter out the assignments with the Deleted flag that are set to false. When deleting an assignment, don't actually delete, instead use PUT to update an assignment's Deleted flag.  