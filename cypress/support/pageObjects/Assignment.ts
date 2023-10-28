import { userRoleType } from "./types";
//Create new employee and fill its detail then make an assertion on them
class addEmployee {
  elements = {
    MainMenuItems: () => cy.get(".oxd-sidepanel-body"),
    AddEmployee: () => cy.get(".oxd-button--secondary"),
    EmployeeInputName: () => cy.get(".--name-grouped-field"),
    saveNewEmp: () => cy.get('button[type="submit"]'),
    LoginDetails: () => cy.get(".--label-right"),
    NameINDetails: () =>
      cy.get(
        ":nth-child(4) > .oxd-grid-2 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
      ),
    Password: () => cy.get('input[type="password"]'),
    confermPass: () => cy.get('input[type="password"]'),
    SaveDetailsBtn: () => cy.get('button[type="submit"]'),
    userLabel: () => cy.get(".orangehrm-edit-employee-name > .oxd-text"),
    lisensDate: () => cy.get('[placeholder="yyyy-mm-dd"]'),
    selectInputs: () =>
      cy.get(".oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input"),
    Smoker: () =>
      cy.get(
        ":nth-child(2) > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon"
      ),
    SaveDetails: () =>
      cy.get(":nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button"),
    //search By ID
    EmpId: () => cy.get(":nth-child(2) > .oxd-input"),
    SearchBtn: () => cy.get(".oxd-form-actions > .oxd-button--secondary"),
    FistAndMiddleName: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(3) > div"),
    LastName: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(4) > div"),
    JobTitle: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(5) > div"),
    EmploymentStatus: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(6) > div"),
    Sununit: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(7) > div"),
    Supervisor: () =>
      cy.get(".oxd-table-card > .oxd-table-row > :nth-child(8) > div"),
  };

  CreateNewEmployeeUI(
    firstName: string,
    MiddleName: string,
    LastName: string,
    DetailaName: string,
    Pass: string,
    ConfirmPass: string
  ) {
    this.elements.MainMenuItems().contains("PIM").click();
    this.elements.AddEmployee().eq(1).click();
    this.elements.EmployeeInputName().children().eq(0).type(firstName);
    this.elements.EmployeeInputName().children().eq(1).type(MiddleName);
    this.elements.EmployeeInputName().children().eq(2).type(LastName);
    this.elements.LoginDetails().click();
    this.elements.NameINDetails().type(DetailaName);
    this.elements.Password().eq(0).type(Pass);
    this.elements.confermPass().eq(1).type(ConfirmPass);
    this.elements.SaveDetailsBtn().click();
    cy.wait(5000);
    const fullName = `${firstName} ${LastName}`;
    this.assertUserLabel(fullName);
    this.elements.lisensDate().eq(0).click().type("2023-11-6").blur();
    this.elements.selectInputs().eq(0).click({ force: true });
    //  cy.pause() in order to find the selector for the options
    cy.get(":nth-child(5) > span").click();
    this.elements.Smoker().click({ force: true });
    this.elements.SaveDetails().click();
  }
  searchByID(id: string) {
    this.elements.MainMenuItems().contains("PIM").click();
    this.elements.EmpId().type(id);
    this.elements.SearchBtn().click({ force: true });
  }
  assertUserLabel(expectedName: string) {
    this.elements.userLabel().should("contain", expectedName);
  }
  EmployeeFieldsAssertion(
    firstName: string,
    middleName: string,
    lastName: string,
    jobTitle: string,
    employmentStatus: string,
    subUnit: string,
    supervisor: string
  ) {
    const Name = `${firstName} ${middleName}`;
    this.elements.FistAndMiddleName().should("contain", Name);
    this.elements.LastName().should("contain", lastName);
    this.elements.JobTitle().should("contain", jobTitle);
    this.elements
      .EmploymentStatus()
      .should("contain", employmentStatus);
    this.elements.Sununit().should("contain", subUnit);
    this.elements.Supervisor().should("contain", supervisor);
  }

  createEmployeeAPI(
    empID: string,
    firstName: string,
    lastName: string,
    middleName: string,
    withUser = true
  ): Cypress.Chainable<number> {
    //create new employee using API
    return cy
      .request({
        method: "POST",
        url: "/web/index.php/api/v2/pim/employees",
        body: {
          empPicture: null,
          employeeId: empID,
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
        },
      })
      .then((response) => {
        // expect(response).property("status").to.equal(200);
        // console.log(response.body);
        // empNO = response.body.data.empNumber;
        // this.elements.empLoader().should('not.exist')
        // withUser && this.createUser(response.body.data.empNumber, "ESS");
        return response.body.data.empNumber;
      });
  }

  createUserWithEmpNo(id: number, roleType: keyof typeof userRoleType) {
    //creat user login deails for the new added employee
    cy.request({
      method: "POST",
      url: "/web/index.php/api/v2/admin/users",
      body: {
        empNumber: id,
        password: "aamal123456789",
        status: true,
        userRoleId: userRoleType[roleType],
        username: "aamal",
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
    });
  }
  addJobDetailsForEmployeeNumber(id: number) {
    //creat user login deails for the new added employee
    cy.request({
      method: "PUT",
      url: `/web/index.php/api/v2/pim/employees/${id}/job-details`,
      body: {
        empStatusId: 5,
        jobTitleId: 26,
        joinedDate: null,
        subunitId: 2,
      },
      // headers: {
      //   Referer: https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewJobDetails/empNumber/${id},
      // },
    });
  }

  addSuperviserForEMployeeNumber(id: number): Cypress.Chainable<string> {
    return cy
      .request({
        method: "POST",
        url: `/web/index.php/api/v2/pim/employees/${id}/supervisors`,
        body: {
          empNumber: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
          reportingMethodId: 1,
        },
      })
      .then((response) => {
        const supervisorFullName = `${response.body.data.supervisor.firstName} ${response.body.data.supervisor.lastName}`;
        return supervisorFullName;
      });
  }
}
export default addEmployee;
