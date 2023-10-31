export default class AddVacancyFile {
  elements = {
    AddButton: () => cy.get(".orangehrm-header-container > .oxd-button"),
    ImportedFile: () => cy.get('input[type="file"]'),
    saveButton: () =>
      cy.get(
        ":nth-child(3) > .oxd-form > .oxd-form-actions > .oxd-button--secondary"
      ),
    VacancyFileName: () => cy.get(".oxd-file-input-div"),
  };
  uploadVacancyFile(FileName: string) {
    this.elements.AddButton().click();
    const path = `cypress/fixtures/${FileName}`;
    this.elements.ImportedFile().selectFile(path, {
      force: true,
    });
    this.elements.saveButton().click();
    this.elements.VacancyFileName().should("contain", FileName);
  }
}
