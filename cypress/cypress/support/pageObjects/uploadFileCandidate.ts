export default class UploadFile {
  elements = {
    firstName: () =>
      cy.get(
        ".--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input"
      ),
    lastName: () => cy.get(":nth-child(3) > :nth-child(2) > .oxd-input"),
    email: () =>
      cy.get(
        ":nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ),
    ImportedFile: () => cy.get('input[type="file"]'),
    saveButton: () => cy.get(".oxd-button--secondary"),
    resumeAssertion: () => cy.get(".oxd-file-input-div"),
  };

  CreateCandidate() {
    this.elements.firstName().type("aamal");
    this.elements.lastName().type("kmail");
    this.elements.email().type("a.kmail@gmail.com");
  }
  uploadResume(FileName: string) {
    const path = `cypress/fixtures/${FileName}`;
    this.elements.ImportedFile().selectFile(path, {
      force: true,
    });
    this.elements.resumeAssertion().should("contain", FileName);
    this.elements.saveButton().click();
  }
}
