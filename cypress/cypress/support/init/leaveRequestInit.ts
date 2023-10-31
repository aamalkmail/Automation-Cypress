import { LeaveRequestPayload } from "../API/payload/leaveRequestPayload";

export default class LeaveRequestPayloadInit {
  static initLeaveRequest(): LeaveRequestPayload {
    let LeaveRequestPayload: LeaveRequestPayload = {
      leaveTypeId: 6,
      fromDate: "2023-10-25",
      toDate: "2023-10-27",
      comment: null,
    };
    return LeaveRequestPayload;
  }
}
