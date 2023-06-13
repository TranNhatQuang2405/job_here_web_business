import Service from "Config/Api/Service";
import { processApplication } from "Config/Api/ConfigURL";

class ApplicationBusiness extends Service {
  processApplication = async (applicationId, applicationStatus) => {
    // 'ACCEPTED' - 'DENIED'
    let params = {
      applicationId,
      applicationStatus,
    };
    let result = await this.post(processApplication, params);
    return result;
  };
}

const applicationBusiness = new ApplicationBusiness();

export default applicationBusiness;
