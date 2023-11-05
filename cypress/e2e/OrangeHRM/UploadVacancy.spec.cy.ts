import LoginPage from "../../support/pageObjects/LoginPage";
import UploadVacancyFile from "../../support/Helpers/uploadVacancyFileHelper";
import AddVacancyFile from "../../support/pageObjects/UploadVacancyFile";
const loginObj: LoginPage = new LoginPage();
const upload: AddVacancyFile = new AddVacancyFile();
describe("Vacancy Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
  });

  it("Vacancy Page: Verify Uploading file for an existing vacancy", () => {
    UploadVacancyFile.AddVacancy().then((VacId) => {
      cy.visit(`/web/index.php/recruitment/addJobVacancy/${VacId}`);
      upload.uploadVacancyFile("AAMAL.pdf");
    });
  });
});
