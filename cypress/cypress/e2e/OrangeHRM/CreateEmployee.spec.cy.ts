import LoginPage from "../../support/pageObjects/LoginPage";
import CreateEmployee from "../../support/Helpers/CreateEmployee";
import LogOut from "../../support/pageObjects/logout";
const loginObj: LoginPage = new LoginPage();
const addEmp: CreateEmployee = new CreateEmployee();
const logout: LogOut = new LogOut();
describe("Add Employee  Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
    cy.fixture("EmployeeInfo").as("EmpInformation");
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
          addEmp.createUserWithEmpNo(empId, "ESS",data.userName,data.pass); 
        });
        logout.logout();
        loginObj.login(data.userName,data.pass);
    });
    
  });
});
