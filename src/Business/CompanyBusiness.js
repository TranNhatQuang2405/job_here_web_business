import Service from "Config/Api/Service";
import {
    getListCompanyOwner
} from "Config/Api/ConfigURL";

class CompanyBusiness extends Service {
    GetListCompanyOwner = async () => {
        let result = await this.get(getListCompanyOwner);
        return result;
    };


}

const companyBusiness = new CompanyBusiness();

export default companyBusiness;
