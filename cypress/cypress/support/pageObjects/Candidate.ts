class CandidatesOperations { 
    elements = { 
      MainMenuItems: () => cy.get('.oxd-topbar-header-title'), 
      Recrutmenit: () => cy.get(":nth-child(5) > .oxd-main-menu-item"),
      candidateTable:()=>cy.get('.oxd-table-body'), 
       
    }; 
   
    openCandidatesPage() { 
      this.elements.Recrutmenit().click(); 
      this.elements.MainMenuItems().contains("Recruitment");  
    } 
    countCandidateRows(count: number){
        this.elements.candidateTable().find('.oxd-table-card').should('have.length',count)
    }
     
  } 
  export default CandidatesOperations;