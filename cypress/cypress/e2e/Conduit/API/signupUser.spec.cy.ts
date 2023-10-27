import addUser from "../../../support/Helpers/apiSignupHelper";
describe("Signup Logic", () => {
  it("Signup: User should be able to create new user", () => {
    addUser.addNewUserViaAPI();
  });
});
