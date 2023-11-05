class LoginPage {
  elements = {
    userName: () => cy.getByCy("Username"),
    password: () => cy.getByCy("Password"),
    loginBtn: () => cy.get("button"),
    forgetPass: () => cy.get(".orangehrm-login-forgot-header"),
    resetPass: () => cy.get(".oxd-input"),
    resetBtn: () => cy.get('[type="submit"]'),
    resetMsg: () => cy.get(".orangehrm-forgot-password-title"),
  };
  login(userName: string, password: string) {
    this.elements.userName().type(userName);
    this.elements.password().type(password);
    this.elements.loginBtn().click();
  }
  clickOnForgetPassword() {
    this.elements.forgetPass().click();
  }
  resetPass(resetPass: string) {
    this.elements.resetPass().type(resetPass, { force: true });
    this.elements.resetBtn().click();
    this.elements
      .resetMsg()
      .contains("Reset Password link sent successfully")
      .should("exist");
  }
}
export default LoginPage;
