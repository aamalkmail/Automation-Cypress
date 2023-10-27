import VacancyUpload from "../init/addVacancyInit";
export const URls = {
  addVacancy: `/web/index.php/api/v2/recruitment/vacancies`,
};

export default class UploadVacancyFile {
  static AddVacancy(): Cypress.Chainable<number> {
    return cy
      .request({
        method: "POST",
        url: URls.addVacancy,
        body: VacancyUpload.initAddVacancy(),
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        const VacancyId = response.body.data.id;
        console.log(VacancyId);
        return VacancyId;
      });
  }
}
