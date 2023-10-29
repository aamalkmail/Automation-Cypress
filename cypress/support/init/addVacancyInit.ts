import { AddVacancyPayload } from "../API/payload/addVacancyPayload";
export default class VacancyUpload {
  static initAddVacancy(): AddVacancyPayload {
    let addVacancyPayload: AddVacancyPayload = {
      name: "",
      jobTitleId: 2,
      employeeId: 22,
      numOfPositions: null,
      description: "",
      status: true,
      isPublished: true,
    };
    return addVacancyPayload;
  }
}
