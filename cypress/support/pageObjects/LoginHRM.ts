export default class LoginPage {
    elements = {
      loginTitle: () => cy.get(".orangehrm-login-title"),
      userName: () => cy.get('[name ="username"]'),
      passWord: () => cy.get('[name ="password"]'),
      submitButton: () => cy.get("button"),
      alertContent: () => cy.get("p.oxd-alert-content-text"),
      requiredUserField: () =>
        cy.get(":nth-child(2) > .oxd-input-group > .oxd-text"),
      requiredUPassField: () =>
        cy.get(":nth-child(3) > .oxd-input-group > .oxd-text"),
    };
  
  
    //   navigate() {
    //     cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    //   }
  
  
    logIn = (userName: string, passWord: string) => {
      this.elements.userName().type(userName);
      this.elements.passWord().type(passWord);
      this.elements.submitButton().click();
    };
  
  
    //   verifyLoginTitle = () => {
    //     this.elements.loginTitle().should("exist").should("contain.text", "Login");
    //   };
  
  
    verifAlertContent = (text: string) => {
      this.elements.alertContent().should("exist").should("contain.text", text);
    };
  
  
    isSPasswordHidden() {
      this.elements.passWord().should("have.attr", "type", "password");
    }
  
  
    blankLogin = (
      blankElement: "user" | "password" | "both",
      message: string,
      value?: string
    ) => {
      if (blankElement === "user") {
        this.elements.userName().clear();
      } else if (blankElement === "password") {
        this.elements.passWord().clear();
      } else {
        this.elements.userName().clear();
        this.elements.passWord().clear();
      }
  
  
      this.elements.submitButton().click();
  
  
      if (blankElement === "user") {
        this.elements
          .requiredUserField()
          .should("exist")
          .should("contain.text", message);
      } else if (blankElement === "password") {
        this.elements
          .requiredUPassField()
          .should("exist")
          .should("contain.text", message);
      } else {
        this.elements
          .requiredUserField()
          .should("exist")
          .should("contain.text", message);
        this.elements
          .requiredUPassField()
          .should("exist")
          .should("contain.text", message);
      }
    };
  }
  