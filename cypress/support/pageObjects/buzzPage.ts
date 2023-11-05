export default class BuzzPage{
    elements={
        MainMenuItems: () => cy.get(".oxd-sidepanel-body"),
    }

    goToBuzzPage(){
        this.elements.MainMenuItems().contains("Buzz").click(); 
    }
}