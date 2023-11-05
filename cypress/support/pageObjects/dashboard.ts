import LoginPage from "./LoginHRM";


const loginPage: LoginPage = new LoginPage();


export default class DashboardPage {
  elements = {
    userDropdownIcon: () =>
      cy.get(".oxd-topbar-header-userarea .oxd-userdropdown-icon"),
    LogoutButton: () => cy.get('a[href="/web/index.php/auth/logout"]'),
  };


//   navigate = () => {
//     cy.visit(EApiPaths.Dashboard);
//   };


//   verifyUrl = () => {
//     cy.verifyUrl(EApiPaths.Dashboard);
//   };


  clickUserDropdownIcon = () => {
    this.elements.userDropdownIcon().click();
  };


  clickLogoutButton = () => {
    this.clickUserDropdownIcon();
    this.elements.LogoutButton().click();
   // loginPage.verifyUrl();
  };
}
