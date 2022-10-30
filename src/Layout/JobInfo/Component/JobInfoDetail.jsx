import React from 'react'
import { useTranslation } from 'react-i18next'
function JobInfoDetail({ data }) {
    const { t } = useTranslation()

    return (
        <div className="jobInfo__body-detail">
            <div className="jobInfo__body-info-common-title mb-2">{t("business.job.info.description")}</div>
            <div className="jobInfo__body-detail-text" dangerouslySetInnerHTML={{ __html: data.description || t("business.job.info.noDescription") }}>

            </div>
            <div className="jobInfo__body-info-common-title mb-2">{t("business.job.info.require")}</div>
            <div className="jobInfo__body-detail-text" dangerouslySetInnerHTML={{ __html: data.require || t("business.job.info.noRequire") }}>

            </div>
            <div className="jobInfo__body-info-common-title mb-2">{t("business.job.info.benefit")}</div>
            <div className="jobInfo__body-detail-text" dangerouslySetInnerHTML={{ __html: data.benefit || t("business.job.info.noBenefit") }}>

            </div>
        </div>
    )
}

export default JobInfoDetail