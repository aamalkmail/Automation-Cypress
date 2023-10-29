import LoginPage from "../../support/pageObjects/LoginPage";
import CreateEmployee from "../../support/Helpers/CreateEmployee";
import LogOut from "../../support/pageObjects/logout";
import TimeSheetHelper from "../../support/Helpers/timeSheetHelper";
import TimeSheetAssert from "../../support/pageObjects/timeSheet";
const loginObj: LoginPage = new LoginPage();
const addEmp: CreateEmployee = new CreateEmployee();
const logout: LogOut = new LogOut();
const verifyTime: TimeSheetAssert = new TimeSheetAssert();
describe("Leave Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
    cy.fixture("EmployeeInfo").as("EmpInformation");
  });
  afterEach(function () {
    cy.get("@EmpInfo").then((infoData: any) => {
      cy.request({
        method: "DELETE",
        url: "/index.php/api/v2/admin/users",
        body: {
          ids: [infoData.EmpID],
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
      });
    });
  });

  it("Time Page:Create Time Sheet for Employee and verify it", () => {
    cy.get("@EmpInformation").then((data: any) => {
      addEmp
        .createEmployeeAPI(
          data.EmpID,
          data.firstName,
          data.lastName,
          data.middelName
        )
        .then((empId) => {
          addEmp.createUserWithEmpNo(empId, "ESS", data.userName, data.pass);
        });
      logout.logout();
      loginObj.login(data.userName, data.pass);
      cy.visit("/web/index.php/time/viewMyTimesheet");
      TimeSheetHelper.getTimeSheetID().then((SheetId) => {
        TimeSheetHelper.editEntries(SheetId);
        TimeSheetHelper.submitTimeSheet(SheetId);
      });
      logout.logout();
      loginObj.login("admin", "admin123");
      cy.visit("/web/index.php/time/viewEmployeeTimesheet");
      verifyTime.verifyRecord();
    });
  });


});
