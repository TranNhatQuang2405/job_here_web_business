// Auth
export const getSessionURL = "/user/getSession";
export const signInURL = "/auth/login";
export const signUpURL = "/auth/register";
export const authCodeURL = "/auth/authenticateCode";

// User
export const viewApplication = "/user/viewApplication";
export const getUserInfo = "/user/getInfoById";

// Company
export const getListCompanyOwner = "/company/getListCompanyOwner";
export const getCompanyInfo = "/company/getCompanyInfo";
export const getAllJobOfCompany = "/company/getAllJobOfCompany";
export const createCompany = "/company/createCompany";
export const updateCompany = "/company/updateCompany";
export const deleteCompany = "/company/delete";
export const getCompanyScore = "/company/getCompanyScore";
export const getListComment = "/company/getListComment";

// Job
export const getJobInfo = "/job/getJobInfo";
export const getListJobManageByCompanyId = "/job/getListJobManageByCompanyId";
export const createJob = "/job/create";
export const deleteJob = "/job/delete";
export const getListApplicationOfJob = "/job/getListApplicationOfJob";
export const updateJob = "/job/updateJob";
export const getListInterviewByJob = "/job/getListInterviewByJob";

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
export const getDashboard = "/report/getBusinessReportOverall";
export const getTotalJobByIndustry = "/report/getTotalJobByIndustry";

// Upload
export const uploadImage = "/user/upload/uploadImage";
export const uploadCV = "/user/upload/uploadCV";

// Message
export const sendMessage = "/chat/send";
export const getListChildMessage = "/chat";
export const getListMessage = "/chat/company";
export const viewAllMessage = "/chat/view/company";
export const countMessageNoRead = "/chat/count/company";
export const deleteMessage = "/chat/delete";

// Notification
export const countNotification = "/notification/company";
export const getLastsNotificationOfCompany = "/notification/all/company";
export const viewNotification = "/notification/view";
export const viewNotificationOfCompany = "/notification/view/company";

// Application
export const processApplication = "/application/processApplication";

// Packet
export const getAllPacket = "/packet/getAll";
export const buyPacket = "/packet/buyPacket";
export const getBoughtPacket = "/packet/boughtPackets";

// CV
export const getCVContent = "/cv/getCVContent";
