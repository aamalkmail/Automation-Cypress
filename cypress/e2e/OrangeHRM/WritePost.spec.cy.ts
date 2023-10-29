
import LoginPage from "../../support/pageObjects/LoginPage";
import BuzzPage from "../../support/pageObjects/buzzPage";
const loginObj: LoginPage = new LoginPage();
const buzzPage: BuzzPage = new BuzzPage;
describe("Buzz Page: Write Buzz data", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
    buzzPage.goToBuzzPage();
    cy.writeFile('cypress/fixtures/newPost.txt','Hi there!')
  });

  it("Buzz Page: Post a feedback then verify that is published", () => {
    cy.fixture('newPost.txt').then((data)=>{
        cy.get('.oxd-buzz-post-input').type(data);
        cy.get('.oxd-buzz-post-slot > .oxd-button').click();
        cy.get('p.orangehrm-buzz-post-body-text').should("contain",data)
    })
  });
});