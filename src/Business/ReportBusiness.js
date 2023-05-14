import Service from "Config/Api/Service";
import {
  getTotalViewJobByMonth,
  getTotalViewCompanyByMonth,
  getDashboard,
} from "Config/Api/ConfigURL";

class ReportBusiness extends Service {
  GetTotalViewJobByMonth = async (month) => {
    let result = await this.get(`${getTotalViewJobByMonth}/${month}`);
    return result;
  };

  GetTotalViewCompanyByMonth = async (month) => {
    let result = await this.get(`${getTotalViewCompanyByMonth}/${month}`);
    return result;
  };

  getDashboard = async () => {
    let result = await this.get(getDashboard);
    return result;
  };
}

const reportBusiness = new ReportBusiness();

export default reportBusiness;
