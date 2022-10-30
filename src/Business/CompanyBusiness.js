import Service from "Config/Api/Service";
import {
    getListCompanyOwner,
    getCompanyInfo,
    getAllJobOfCompany,
    createCompany
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
            ...companyInfo
        };
        let result = await this.post(createCompany, params);
        return result;
    }

}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
