export default class TimeSheetHelper {
  static getTimeSheetID(): Cypress.Chainable<number> {
    return cy
      .request({
        method: "GET",
        url: `/web/index.php/api/v2/time/timesheets/default?date=2023-10-28`,//use momentjs
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        console.log(response.body.data.id);
        return response.body.data.id;
      });
  }
  static editEntries(id: number) {
    return cy
      .request({
        method: "PUT",
        url: `/web/index.php/api/v2/time/timesheets/${id}/entries`,
        body: {
          entries: [
            {
              projectId: 2,
              activityId: 11,
              dates: { "2023-10-23": { duration: "09:00" } },
            },
          ],
          deletedEntries: [],
        },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }
  static submitTimeSheet(id: number) {
    return cy
      .request({
        method: "PUT",
        url: `/web/index.php/api/v2/time/timesheets/${id}`,
        body: { action: "SUBMIT" },
      })
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  }
}
