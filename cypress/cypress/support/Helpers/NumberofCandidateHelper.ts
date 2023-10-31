export const URLs = { 
    users: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC" 
  }; 
   
  export default class CountCandidatRecords { 
   
      static getTotalFromAPI() { 
          return cy.request({ 
            method: 'GET', 
            url: URLs.users 
          }).then((response) => { 
            expect(response.status).to.eq(200);  
            const total = response.body.meta.total;
            return total; 
          }); 
        } 
  }