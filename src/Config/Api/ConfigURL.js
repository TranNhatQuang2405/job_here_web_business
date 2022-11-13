
// Auth
export const getSessionURL = "/user/getSession";
export const signInURL = "/auth/login";
export const signUpURL = "/auth/register";
export const authCodeURL = "/auth/authenticateCode";

// Company
export const getListCompanyOwner = "/user/company/getListCompanyOwner";
export const getCompanyInfo = "/user/company/getCompanyInfo";
export const getAllJobOfCompany = "/user/company/getAllJobOfCompany";
export const createCompany = "/user/company/createCompany";
export const updateCompany = "/user/company/updateCompany";
export const deleteCompany = "/user/company/delete";

//Job
export const getJobInfo = "/job/getJobInfo";
export const getListJobManageByCompanyId = "/job/getListJobManageByCompanyId";
export const createJob = "/job/create";

//Dropdown
export const genderDropdown = "/dropdown/gender";
export const industryDropdown = "/dropdown/industry";
export const skillDropdown = "/dropdown/skill";
export const experienceDropdown = "/dropdown/experience";
export const titleDropdown = "/dropdown/title";
export const jobtypeDropdown = "/dropdown/jobtype";
export const cityDropdown = "/dropdown/city";
export const unitDropdown = "/dropdown/unit";


//Upload
export const uploadImage = "/user/upload/uploadImage";
export const uploadCV = "/user/upload/uploadCV";
