export default class TimeSheetAssert {
  elements = {
    EmployeeName: () => cy.get(".oxd-autocomplete-text-input > input"),
    View: () => cy.get(".oxd-form-actions > .oxd-button"),
    Label: () => cy.get(".orangehrm-timesheet-header--title > .oxd-text"),
    EmployeeOption: () => cy.get(".oxd-autocomplete-dropdown > :nth-child(1)"),
  };

  verifyRecord() {
    this.elements.EmployeeName().type("aamal mahmoud kmail");
    cy.wait(2000);// use intercept for an API
    this.elements.EmployeeOption().click();
    this.elements.View().click({ force: true });
    this.elements.Label().should("contain", "Timesheet for aamal kmail");
  }
}
