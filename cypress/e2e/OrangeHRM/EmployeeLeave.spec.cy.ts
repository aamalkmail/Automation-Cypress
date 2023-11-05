import LoginPage from "../../support/pageObjects/LoginPage";
import CreateEmployee from "../../support/Helpers/CreateEmployee";
import LogOut from "../../support/pageObjects/logout";
import LeaveHelper from "../../support/Helpers/leaveHelper";
import Assertions from "../../support/pageObjects/Assertion";
const loginObj: LoginPage = new LoginPage();
const addEmp: CreateEmployee = new CreateEmployee();
const logout: LogOut = new LogOut();
const assert: Assertions = new Assertions();
describe("Leave Page", () => {
  beforeEach(function () {
    cy.visit("/web/index.php/auth/login");
    loginObj.login("admin", "admin123");
    cy.fixture("EmployeeInfo").as("EmpInformation");
  });

  it("Leave Page: Apply for Leave ,Approve it by admin and verify that it is Scheduled", () => {
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
          LeaveHelper.addLeaveEntitlement(empId);

        });
        logout.logout();
        loginObj.login(data.userName,data.pass);
        LeaveHelper.leaveRequest()
        .then((leaveId)=>{
            logout.logout();
            loginObj.login("admin", "admin123");
            LeaveHelper.approveLeaveRequest(leaveId);
        });
        logout.logout();
        loginObj.login(data.userName,data.pass);
        cy.visit(`/web/index.php/leave/viewMyLeaveList`);
        assert.LeaveStatusAssertion();
        
    });
    
  });
});