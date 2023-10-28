import EntitlementPayloadInit from "../init/entitlementInit";
import LeaveRequestPayloadInit from "../init/leaveRequestInit";

export const URls = {
  leaveEntitlements: `/web/index.php/api/v2/leave/leave-entitlements`,
  leaveRequest: `/web/index.php/api/v2/leave/leave-requests`,
};

export default class LeaveHelper {
  static addLeaveEntitlement(employeeNum: number) {
    return cy
      .request({
        method: "POST",
        url: URls.leaveEntitlements,
        body: EntitlementPayloadInit.initEntitlement(employeeNum),
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        cy.log(response.body);
      });
  }

  static leaveRequest(): Cypress.Chainable<number> {
    return cy
      .request({
        method: "POST",
        url: URls.leaveRequest,
        body: LeaveRequestPayloadInit.initLeaveRequest(),
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        const leaveId = response.body.data.id;
        console.log(leaveId);
        return leaveId;
      });
  }
  static approveLeaveRequest(leaveId: number) {
    return cy
      .request({
        method: "PUT",
        url: `/web/index.php/api/v2/leave/employees/leave-requests/${leaveId}`,
        body: {
          action: "APPROVE",
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }
}
