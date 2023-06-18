import Service from "Config/Api/Service";
import { getCVContent } from "Config/Api/ConfigURL";

class CVBusiness extends Service {
  getCVContent = async (cvId) => {
    let result = await this.get(`${getCVContent}/${cvId}`);
    return result;
  };
}

const cvBusiness = new CVBusiness();

export default cvBusiness;
