import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import GenericHelper from "../Helpers/genericFunctions";
export default class userInit {
  static initUser(): ICreateEmployeePayload {
    let createUserPayload: ICreateEmployeePayload = {
      user: {
        email: `aamal_${GenericHelper.genericRandomString()}@gmail.com`,
        password: `12345`,
        username: `aamal${GenericHelper.genericRandomString()}`,
      },
    };
    return createUserPayload;
  }
}
