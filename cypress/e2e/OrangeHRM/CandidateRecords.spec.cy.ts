
import LoginPage from "../../support/pageObjects/LoginHRM";
import CandidatesOperations from "../../support/pageObjects/Candidate";
import CountCandidatRecords from "../../support/Helpers/NumberofCandidateHelper";
import AddCandidate from "../../support/Helpers/apiCreateCandidateHelper";
import ScheduleInterview from "../../support/pageObjects/ScheduleInterview";
const loginObj: LoginPage = new LoginPage();
const Candidate: CandidatesOperations = new CandidatesOperations();
const CandidateAdd: AddCandidate = new AddCandidate();
const scheduleInterview: ScheduleInterview = new ScheduleInterview(); 

describe("Recruitment Page- Candidate table data Validation", () => {
  beforeEach(function () {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    loginObj.logIn("admin", "admin123"); 
    
  });


  it("Candidate: Verify the number of records", () => {
    Candidate.openCandidatesPage();
    CountCandidatRecords.getTotalFromAPI().then((total) => { 
       Candidate.countCandidateRows(total); 
       }) 
  });

  it.only('Candidate: Schedule Meeting for a Shortlisted Candidate',()=>{
    CandidateAdd.createCandidateAPI().then((cId)=>{
        console.log(cId);
        CandidateAdd.Shortlisted(cId);
        CandidateAdd.ScheduleINterviewPage(cId);
        scheduleInterview.ScheduleInterview();
        CandidateAdd.ScheduledInterviewVerification(cId);
        scheduleInterview.ScheduleInterviewAssertion();

    })
  })




});