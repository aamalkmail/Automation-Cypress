export default class Assertions {
  elements = {
    MyLeaveStatus: () => cy.get(":nth-child(7) > div"),
  };

  LeaveStatusAssertion() {
    this.elements
      .MyLeaveStatus()
      .should("contain", "Taken (1.00), Scheduled (2.00)");
  }
}
