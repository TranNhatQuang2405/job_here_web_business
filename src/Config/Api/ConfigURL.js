// Auth
export const getSessionURL = "/user/getSession";
export const signInURL = "/auth/login";
export const signUpURL = "/auth/register";
export const authCodeURL = "/auth/authenticateCode";

// User
export const viewApplication = "/user/viewApplication";
export const getUserInfo = "/user/getInfoById";

// Company
export const getListCompanyOwner = "/user/company/getListCompanyOwner";
export const getCompanyInfo = "/user/company/getCompanyInfo";
export const getAllJobOfCompany = "/user/company/getAllJobOfCompany";
export const createCompany = "/user/company/createCompany";
export const updateCompany = "/user/company/updateCompany";
export const deleteCompany = "/user/company/delete";

// Job
export const getJobInfo = "/job/getJobInfo";
export const getListJobManageByCompanyId = "/job/getListJobManageByCompanyId";
export const createJob = "/job/create";
export const deleteJob = "/job/delete";
export const getListApplicationOfJob = "/job/getListApplicationOfJob";
export const updateJob = "/job/updateJob";

// Dropdown
export const genderDropdown = "/dropdown/gender";
export const industryDropdown = "/dropdown/industry";
export const skillDropdown = "/dropdown/skill";
export const experienceDropdown = "/dropdown/experience";
export const titleDropdown = "/dropdown/title";
export const jobtypeDropdown = "/dropdown/jobtype";
export const cityDropdown = "/dropdown/city";
export const unitDropdown = "/dropdown/unit";

// Report
export const getTotalViewJobByMonth = "/report/getTotalViewJobByMonth";
export const getTotalViewCompanyByMonth = "/report/getTotalViewCompanyByMonth";

// Upload
export const uploadImage = "/user/upload/uploadImage";
export const uploadCV = "/user/upload/uploadCV";
