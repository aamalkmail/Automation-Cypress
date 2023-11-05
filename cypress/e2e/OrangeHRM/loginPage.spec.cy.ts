import DashboardPage from "../../support/pageObjects/dashboard";
import LoginPage from "../../support/pageObjects/LoginHRM";
const loginObj: LoginPage = new LoginPage();
const dashboardPage: DashboardPage = new DashboardPage();
describe("Login Home Page", () => {
  beforeEach(function () {
    cy.visit("https://opensource-demo.orangehrmlive.com/");
    cy.fixture("login").as("login");
  });


  it("Check valid user name and password", () => {
    cy.get("@login").then((infoData: any) => {
      loginObj.logIn(
        infoData.valid_both.userName,
        infoData.valid_both.password
      );
    });
  });


  it("Check invalid user name and wrong password", () => {
    cy.get("@login").then((infoData: any) => {
      const { userName, password } = infoData.invalid_both;


      const { invalidCredentials } = infoData.messages;
      //console.log(invalidCredentials)
      loginObj.logIn(userName, password);
      loginObj.verifAlertContent(invalidCredentials);
    });
  });
  it("Check valid user name and wrong password", () => {
    cy.get("@login").then((infoData: any) => {
      const { userName, password } = infoData.invalid_pass;


      const { invalidCredentials } = infoData.messages;
      //console.log(invalidCredentials)
      loginObj.logIn(userName, password);
      loginObj.verifAlertContent(invalidCredentials);
    });
  });


  it("Check invalid user name and valid password", () => {
    cy.get("@login").then((infoData: any) => {
      const { userName, password } = infoData.invalid_username;


      const { invalidCredentials } = infoData.messages;
      //console.log(invalidCredentials)
      loginObj.logIn(userName, password);
      loginObj.verifAlertContent(invalidCredentials);
    });
  });


  it("Check password if hidden ", () => {
    cy.get("@login").then((infoData: any) => {
      const { userName, password } = infoData.invalid_username;


      loginObj.isSPasswordHidden();
    });
  });


  it("Check Case sensitivity for username ", () => {
    cy.get("@login").then((data: any) => {
      const { userName, password } = data.sensitivity;


      loginObj.logIn(userName.toLowerCase(), password);
      dashboardPage.clickLogoutButton();
      loginObj.logIn(userName.toUpperCase(), password);
    });
  });


  it("should redirect to login page when not logged in", () => {
    cy.get("@login").then((dataINfo: any) => {
      const { userName, password } = dataINfo.valid_both;
      loginObj.logIn(userName, password);
    });


    dashboardPage.clickLogoutButton();
    //dashboardPage.navigate();
    // loginObj.verifyUrl();
  });
  // blank
  it(" Verfiy Required Felids", () => {
    cy.get("@login").then((dataINfo: any) => {
      const { userName } = dataINfo.valid_both;


      const { Required } = dataINfo.messages;


      loginObj.blankLogin("password", Required, userName);
    });
  });


  it("should not login blank user blank password", () => {
    cy.get("@login").then((dataINfo: any) => {
      const { Required } = dataINfo.messages;


      loginObj.blankLogin("both", Required);
    });
  });


  it.only("should not login blank user valid password", () => {
    cy.get("@login").then((data: any) => {
      const { userName, password } = data.valid_both;


      const { Required } = data.messages;


      loginObj.blankLogin("user", Required, password);
    });
  });
});
