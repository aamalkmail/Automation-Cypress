import LoginPage from "../../support/pageObjects/LoginPage";
const loginObj: LoginPage = new LoginPage();
let userId: number = 0;
describe("Login Home Page", () => {
  beforeEach(function () {
    cy.intercept("/web/index.php/dashboard/index").as("LoginPage");
    cy.visit("/");
    loginObj.login("Admin", "admin123");
  });

  it("Valid Login", () => {
    cy.get(".oxd-topbar-header-title").contains("Dashboard").should("exist");
  });

  it("forget password", () => {
    loginObj.clickOnForgetPassword();
    cy.get(".orangehrm-forgot-password-title").should(
      "contain",
      "Reset Password"
    );
    loginObj.resetPass("Admin");
  });

  it("Verify Login response", () => {
    cy.request("/web/index.php/core/i18n/messages").then((response) => {
      expect(response).property("status").to.equal(200);
    });
  });

  it.only("Verify Adding User", () => {
    cy.request({
      method: "POST",
      url: "web/index.php/api/v2/admin/users",
      body: {
        username: "aamal12358",
        password: "aamal12345545548",
        status: true,
        userRoleId: 1,
        empNumber: 61,
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      console.log(response);
      userId = response.body.data.id;
      console.log(userId);
    });
  });
  afterEach(function () {
    cy.request({
      method: "DELETE",
      url: "web/index.php/api/v2/admin/users",
      body: {
        ids: [userId],
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  });
});
