import Service from "Config/Api/Service";
import { processApplication } from "Config/Api/ConfigURL";

class ApplicationBusiness extends Service {
  processApplication = async ({
    applicationId,
    applicationStatus,
    interviewDate,
    cancelContent,
  }) => {
    // 'ACCEPTED' - 'DENIED'
    let result = await this.post(processApplication, {
      applicationId,
      applicationStatus,
      interviewDate,
      cancelContent,
    });
    return result;
  };
}

const applicationBusiness = new ApplicationBusiness();

export default applicationBusiness;
