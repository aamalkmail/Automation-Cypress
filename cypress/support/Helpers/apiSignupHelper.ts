//const baseUrl = Cypress.config().baseUrl
import userInit from "../init/userInit";

export const URls = {
  //users:`{baseUrl}/api/users`
  users: `https://conduit.productionready.io/api/users`,
};

export default class addUser {
  static addNewUserViaAPI() {
    cy.addNewUser(URls.users, userInit.initUser());
  }
}
