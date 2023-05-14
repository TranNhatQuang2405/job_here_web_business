import Service from "Config/Api/Service";
import {
  getListCompanyOwner,
  getCompanyInfo,
  getAllJobOfCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyScore,
  getListComment,
} from "Config/Api/ConfigURL";

class CompanyBusiness extends Service {
  GetListCompanyOwner = async () => {
    let result = await this.get(getListCompanyOwner);
    return result;
  };

  GetCompanyInfo = async (id) => {
    let result = await this.get(`${getCompanyInfo}/${id}`);
    return result;
  };

  GetAllJobOfCompany = async (id) => {
    let result = await this.get(`${getAllJobOfCompany}/${id}`);
    return result;
  };

  CreateCompany = async (companyInfo) => {
    let params = {
      ...companyInfo,
    };
    let result = await this.post(createCompany, params);
    return result;
  };

  UpdateCompany = async (companyInfo) => {
    let params = {
      ...companyInfo,
    };
    let result = await this.post(updateCompany, params);
    return result;
  };

  DeleteCompany = async (id) => {
    let result = await this.post(`${deleteCompany}/${id}`);
    return result;
  };

  GetCompanyScore = async (companyId) => {
    let result = await this.get(`${getCompanyScore}/${companyId}`);
    return result;
  };

  GetListComment = async (companyId, page, size) => {
    let params = {
      companyId: companyId,
      page: page,
      size: size,
    };
    let result = await this.get(getListComment, params);
    return result;
  };
}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
