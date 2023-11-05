import LoginPage from "../../support/pageObjects/LoginPage";
import addEmployee from "../../support/pageObjects/Assignment";
const loginObj: LoginPage = new LoginPage();
const addEmp: addEmployee = new addEmployee();
describe("Add Employee  Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
    cy.fixture("EmployeeInfo").as("EmpInformation");
  });

  it("Create New Employee via UI", () => {
    cy.get("@EmpInformation").then((data: any) => {
      addEmp.CreateNewEmployeeUI(
        data.FirstName,
        data.MiddleName,
        data.LastName,
        data.userName,
        data.pass,
        data.confirmPass
      );
    });
  });

  it.only("Create new Employee via API", () => {
    cy.get("@EmpInformation").then((data: any) => {
      addEmp
        .createEmployeeAPI(
          data.EmpID,
          data.firstName,
          data.lastName,
          data.middelName
        )
        .then((empId) => {
          addEmp.createUserWithEmpNo(empId, "ESS");
          addEmp.addJobDetailsForEmployeeNumber(empId);
          addEmp
            .addSuperviserForEMployeeNumber(empId)
            .then((supervisorName) => {
              addEmp.searchByID(data.EmpID);
              addEmp.EmployeeFieldsAssertion(
                data.firstName,
                data.middelName,
                data.lastName,
                data.JobTitle,
                data.EmploymentStatus,
                data.SubUnit,
                supervisorName
              );
            });
        });
    });
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
});
