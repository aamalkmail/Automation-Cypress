
import candidateInit from "../init/candidateInit";
export const URLs = { 
    addCandidate:"/web/index.php/api/v2/recruitment/candidates" 
  }; 
   
class AddCandidate { 
    elements = { 
 
       
    }; 
    createCandidateAPI(): Cypress.Chainable<number> {
        return cy
          .request({
            method: "POST",
            url: URLs.addCandidate,
            body: candidateInit.initCandidate(),
          })
          .then((response) => {
            return response.body.data.id;
          });
      }

      Shortlisted(candidateId:number){
        cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`) ;
        cy.request({ 
            method: "PUT", 
            url:`/web/index.php/api/v2/recruitment/candidates/${candidateId}/shortlist`, 
            body: { 
                note:null 
            } 
 
        }) 
      } 
      ScheduleINterviewPage(candidateID: number) { 
        cy.visit(`/web/index.php/recruitment/changeCandidateVacancyStatus?candidateId=${candidateID}&selectedAction=4`) 
      } 
      ScheduledInterviewVerification(candidateID: number) { 
        cy.visit(`/web/index.php/recruitment/addCandidate/${candidateID}`) 
      } 
  } 
  export default AddCandidate;