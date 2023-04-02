import React from "react";
import "./JobHeader.css";
import company_default_img from "Assets/Images/company_default_img.jpg";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Moment from "moment";

const JobHeader = ({ jobData = {}, className }) => {
    const { t } = useTranslation();

    return (
        <div className={"JobHeader__container jh-box-item" + (className ? " " + className : "")}>
            <div className="JobHeader_job-box-header d-flex align-items-center">
                <Link
                    to={`/Company/${jobData?.companyId ?? ""}`}
                    title={jobData?.companyName ?? ""}
                    className="JobHeader_job-company-logo"
                >
                    <div className="JobHeader_box-company-logo d-flex align-items-center justify-content-center">
                        <img
                            src={jobData.avatar || company_default_img}
                            alt={jobData?.companyName ?? ""}
                            className="w-100"
                        />
                    </div>
                </Link>
                <div className="JobHeader_box-info-job flex-grow-1">
                    <Link to={`/manageJob/${jobData?.jobId ?? ""}`}>
                        <h1 className="JobHeader_job-title JobPage__text-highlight">
                            {jobData?.jobName ?? "Job Name"}
                        </h1>
                    </Link>
                    <div className="JobHeader_company-title">
                        <Link to={`/Company/${jobData?.companyId ?? ""}`}>
                            {jobData?.companyName ?? "Company Name"}
                        </Link>
                    </div>

                    <div className="JobHeader_job-deadline">
                        <i className="bi bi-clock" /> {t("Deadline")}
                        {": "}
                        {Moment(jobData.endDate).format("DD/MM/yyyy")}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobHeader;
