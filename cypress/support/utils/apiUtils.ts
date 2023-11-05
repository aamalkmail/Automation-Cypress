// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import { ICreateEmployeeResponse } from "../API/response/userAPIResponse";

declare global {
  namespace Cypress {
    interface Chainable {
      addNewUser: (
        requestUrl: string,
        employeePayload: ICreateEmployeePayload
      ) => Chainable<ICreateEmployeeResponse>;
    }
  }
}

Cypress.Commands.add(
  "addNewUser",
  (requestUrl: string, userPayload: ICreateEmployeePayload) => {
    return cy
      .api({
        method: "POST",
        url: requestUrl,
        body: userPayload,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .its("body");
  }
);
