
class ScheduleInterview {
    elements = { 
        InterviewTitle: () => cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'), 
        Date: () => cy.get('.oxd-date-input > .oxd-input'), 
        Interviewer: () => cy.get('.oxd-autocomplete-text-input > input'), 
        InterviewerOption: () => cy.get('.oxd-autocomplete-dropdown > :nth-child(1)'), 
        ScheduleInterviewBtn: () => cy.get('.oxd-button--secondary'), 
        CandidateStatus: () => cy.get('.orangehrm-recruitment-status > .oxd-text'),      
        }; 
       
        ScheduleInterview() { 
           this.elements.InterviewTitle().type('test'); 
       this.elements.Date().click().type("2023-11-6").blur(); 
       this.elements.Interviewer().type('a'); 
       cy.wait(3000) 
       this.elements.InterviewerOption().click() 
       this.elements.ScheduleInterviewBtn().click();  
       }
       ScheduleInterviewAssertion(){
        this.elements.CandidateStatus().should('contain','Status: Interview Scheduled')
       }
       
}
export default ScheduleInterview;
