import Service from "Config/Api/Service";
import {
  getJobInfo,
  getListJobManageByCompanyId,
  createJob,
  deleteJob,
  getListApplicationOfJob,
  updateJob,
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
      ...jobInfo,
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
  UpdateJob = async (jobInfo) => {
    let {
      jobId,
      jobName,
      description,
      require,
      benefit,
      salaryMin,
      salaryMax,
      unit,
      experiences,
      jobTypes,
      companyId,
      title,
      skillIds,
      startDate,
      endDate,
      cityId,
      address,
      gender,
      amount,
    } = jobInfo;
    let params = {
      jobId,
      jobName,
      description,
      require,
      benefit,
      salaryMin,
      salaryMax,
      unit,
      experiences,
      jobTypes,
      companyId,
      title,
      skillIds,
      startDate,
      endDate,
      cityId,
      address,
      gender,
      amount,
    };
    let result = await this.post(updateJob, params);
    return result;
  };
}

const jobBusiness = new JobBusiness();

export default jobBusiness;
