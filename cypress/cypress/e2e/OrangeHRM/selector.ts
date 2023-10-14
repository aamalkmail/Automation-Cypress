import LoginPage from "../../support/pageObjects/LoginPage";
const loginObj: LoginPage = new LoginPage();
let userId: number = 0;
describe("Login Home Page", () => {
  beforeEach(function () {
    cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
    cy.visit("/");
    loginObj.login("Admin", "admin123");
  });
it(("get time from dashboard"),()=>{
    cy.get(".oxd-sheet >.orangehrm-attendance-card-bar >.oxd-text--span")
})
 
});
