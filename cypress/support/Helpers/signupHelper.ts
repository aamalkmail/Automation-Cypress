export const URls ={
    users:`https://conduit.productionready.io/api/users`
}

export default class addUser {
    static conduitNewUserUsingAPI(payload:any){
        return cy.request({
            method:'POST',
            url:URls.users,
            body:payload
        })
    }
}