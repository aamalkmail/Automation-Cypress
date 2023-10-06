import addUser from "../../support/Helpers/signupHelper";

addUser
describe("Conduit: Signup Account", () => {
 
it(("Cxxx1: Login - Create New Account "),()=>{
    const apiPayload ={
        user:{
            username:`aamal${Math.round(10000*(Math.random()))}`,
            email:`aamal${Math.round(10000*(Math.random()))}@test.com`,
            password:`123456`
        }
    }
    addUser.conduitNewUserUsingAPI(apiPayload).then((response)=>{
        expect(response.status).to.equal(201);
    })
})
 
});