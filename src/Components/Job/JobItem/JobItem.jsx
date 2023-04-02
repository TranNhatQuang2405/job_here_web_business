import React from "react";
import "./JobItem.css";
import { TagList } from "Components/Tag";
import { CompanyLogo } from "Components/Company";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const JobItem = ({ jobData = {}, applied = false }) => {
    const { t } = useTranslation();

    let tagData = [
        {
            label: `${jobData.salaryMin === jobData.salaryMax
                ? jobData.salaryMin
                : `${jobData.salaryMin} - ${jobData.salaryMax}`
                } ${jobData?.unitName ?? ""}`,
        },
        {
            label: jobData?.city?.cityName ?? "",
        },
        {
            label: `${t("Update")} ${parseInt(
                (new Date() - new Date(jobData?.createdDate ?? null)) / 86400000
            )} ${t("days ago")}`,
        },
    ];

    return (
        <div className="JobItem__container d-flex">
            <div className="JobItem__company-logo-wrapper">
                <Link
                    rel="noreferrer"
                    to={`/manageJob/${jobData?.jobId ?? 0}`}
                    className="JobItem__company-logo d-block overflow-hidden"
                >
                    <CompanyLogo src={jobData?.avatarUrl ?? null} size={80} />
                </Link>
            </div>
            <div className="JobItem__body d-flex flex-column w-100">
                <div className="JobItem__content d-flex w-100">
                    <div className="me-auto">
                        <h3 className="JobItem__title mt-0 mb-0">
                            <Link rel="noreferrer" to={`/manageJob/${jobData?.jobId ?? 0}`}>
                                {jobData?.jobName ?? ""}
                            </Link>
                        </h3>
                        <p className="JobItem__company">
                            <Link
                                to={`/Company/${jobData?.companyId ?? 0}`}
                                className="text-uppercase text-decoration-none"
                                rel="nooppener noreferrer"
                            >
                                {jobData?.companyName ?? ""}
                            </Link>
                        </p>
                    </div>
                    <div className="ms-auto text-right">
                        {applied ? (
                            jobData.viewed && (
                                <div className="d-flex">
                                    <i className="bi bi-check-circle-fill primary-color" />{" "}
                                    <p className="ps-1">{t("jh-job-item-viewed")}</p>
                                </div>
                            )
                        ) : (
                            <p className="JobItem__deadline">
                                {t("jh-job-item-date-left-1")}
                                <strong>
                                    {parseInt((new Date(jobData?.endDate ?? null) - new Date()) / 86400000)}
                                </strong>
                                {t("jh-job-item-date-left-2")}
                            </p>
                        )}
                    </div>
                </div>
                <div className="d-flex">
                    <div className="JobItem__label-content me-auto">
                        <TagList tagData={tagData} />
                    </div>
                    <div className="JobItem__save-job ms-auto mt-0 text-center">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobItem;
