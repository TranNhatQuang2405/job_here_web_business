import React from 'react'
import { useTranslation } from 'react-i18next';
import { JobItem } from 'Components/Job';
import _ from 'underscore';
import "./CompanyAboutAndJob.css"

function CompanyAboutAndJob({ companyData }) {
    const { t } = useTranslation()
    return (
        <>
            <div className="CompanyPage__company-info jh-box-item">
                <h4>{t("Company introduction")}</h4>
                <div className="CompanyPage__company-body pt-3">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: companyData.description || t("No Desription"),
                        }}
                        className="CompanyPage__description"
                    />
                </div>
            </div>
            <div className="CompanyPage__company-job pt-3 jh-box-item">
                <h4>{t("Recruit")}</h4>
                <div className="pt-3">
                    {_.map(companyData.companyJobs, (item) => {
                        return <JobItem key={item.jobId} jobData={item} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default CompanyAboutAndJob