export default class LogOut{
    elements={
        dropDownTap: () => cy.get(".oxd-userdropdown-tab > .oxd-icon"),
        logout: () => cy.get(":nth-child(4) > .oxd-userdropdown-link"),
    }

    logout(){
        this.elements.dropDownTap().click()
        this.elements.logout().click()
    }
}