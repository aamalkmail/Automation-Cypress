import { ICreateEntitlementPayload } from "../API/payload/entitlementPayload";

export default class EntitlementPayloadInit {
  static initEntitlement(empNum: number): ICreateEntitlementPayload {
    let leaveEntitlementPayload: ICreateEntitlementPayload = {
      empNumber: empNum,
      leaveTypeId: "6",
      fromDate: "2023-01-01",
      toDate: "2024-8-24",
      entitlement: "30",
    };
    return leaveEntitlementPayload;
  }
}
