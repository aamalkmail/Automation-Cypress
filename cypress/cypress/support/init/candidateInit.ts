import { ICreateCandidatePayload } from "../API/payload/candidateAPIPayload";
import GenericHelper from "../Helpers/genericFunctions";
export default class candidateInit {
  static initCandidate(): ICreateCandidatePayload {
    let createUserPayload: ICreateCandidatePayload = {
      firstName: `Aamal`,
      lastName: `Kmail`,
      middleName: `mahmoud`,
      email: `aamal.m@gmail.com`,
      comment: "",
      consentToKeepData: false,
      contactNumber: "",
      dateOfApplication: "2023-10-14",
      keywords: "",
      vacancyId: 4,
    };
    return createUserPayload;
  }
}
