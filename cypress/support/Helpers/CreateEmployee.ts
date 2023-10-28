import { userRoleType } from "../pageObjects/types";

class CreateEmployee{
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
    
      createUserWithEmpNo(id: number, roleType: keyof typeof userRoleType, userName:string,password:string) {
        //creat user login deails for the new added employee
        cy.request({
          method: "POST",
          url: "/web/index.php/api/v2/admin/users",
          body: {
            empNumber: id,
            password: password,
            status: true,
            userRoleId: userRoleType[roleType],
            username: userName,
          },
        }).then((response) => {
          expect(response).property("status").to.equal(200);
        });
      }
}
export default CreateEmployee