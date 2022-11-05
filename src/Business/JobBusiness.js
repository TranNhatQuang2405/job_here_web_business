import Service from "Config/Api/Service";
import {
    getJobInfo,
    getListJobManageByCompanyId
} from "Config/Api/ConfigURL";

class JobBusiness extends Service {
    GetJobInfo = async (id) => {
        let result = await this.get(`${getJobInfo}/${id}`);
        return result;
    };
    GetListJobManageByCompanyId = async (id) => {
        let result = await this.get(`${getListJobManageByCompanyId}/${id}`);
        return result;
    };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
