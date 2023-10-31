import LoginPage from "../../support/pageObjects/LoginPage";
import UploadFile from "../../support/pageObjects/uploadFileCandidate";
const loginObj: LoginPage = new LoginPage();
const uploadFile: UploadFile = new UploadFile();
describe("Add Employee  Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
  });

  it.only("Create new Employee via API", () => {
    cy.visit("/web/index.php/recruitment/addCandidate");
    uploadFile.CreateCandidate();
    uploadFile.uploadResume("AAMAL.pdf");
  });
});
