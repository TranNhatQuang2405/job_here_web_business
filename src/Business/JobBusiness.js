import Service from "Config/Api/Service";
import {
    getJobInfo,
    getListJobManageByCompanyId,
    createJob,
    deleteJob,
    getListApplicationOfJob
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

    CreateJob = async (jobInfo) => {
        let params = {
            ...jobInfo
        };
        let result = await this.post(createJob, params);
        return result;
    };
    DeleteJob = async (id) => {
        let result = await this.post(`${deleteJob}/${id}`);
        return result;
    };
    GetListApplicationOfJob = async (id) => {
        let result = await this.get(`${getListApplicationOfJob}/${id}`);
        return result;
    };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
