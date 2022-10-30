import React from 'react'
import { Row, Col } from 'react-bootstrap/'
import experience from "Assets/Icons/experience.png";
import salary from "Assets/Icons/salary.png"
import level from "Assets/Icons/level.png"
import gender from "Assets/Icons/gender.png"
import group from "Assets/Icons/group.png"
import work from "Assets/Icons/work.png"
import { Icon } from 'Components/Image';
import { useTranslation } from 'react-i18next';

function JobInfoCommon({ data }) {
    const { t } = useTranslation()

    const moneyCreate = () => {
        let max = data.salaryMax
        let min = data.salaryMin
        if (max && min) {
            return `${min} - ${max} ${data.unitName}`
        }
        else if (max && !min) {
            return `${t("business.job.unit.max")} ${max} ${data.unitName}`
        }
        else if (!max && min) {
            return `${t("business.job.unit.min")} ${min} ${data.unitName}`
        }
        else {
            return `${t("business.job.unit.not")}`
        }
    }

    return (
        <div className="jobInfo__body-info-common">
            <div className="jobInfo__body-info-common-title">{t("business.job.info.common")}</div>
            <div className="jobInfo__body-info-common-body">
                <div className="flex-grow-1">
                    <Row>
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={salary} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.salary")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {moneyCreate()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={group} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.amount")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {data.amount}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={work} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.jobType")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {data.jobTypeNames.map((e, index) =>
                                            <span key={index}>{e.jobTypeName + (index !== data.jobTypeNames.length - 1 ? ", " : ".")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={level} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.level")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {data.titleName}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={gender} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.gender")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {data.genderName}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} className="mb-3">
                            <div className="jobInfo__common-item">
                                <div>
                                    <Icon url={experience} width="40px" />
                                </div>
                                <div className="d-flex-column">
                                    <div className="jobInfo__common-item-title">
                                        {t("business.job.info.experience")}
                                    </div>
                                    <div className="jobInfo__common-item-content">
                                        {data.experienceNames.map((e, index) =>
                                            <span key={index}>{e.experienceName + (index !== data.experienceNames.length - 1 ? ", " : ".")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Col>

                    </Row>
                </div>

                <div className="flex-grow-1">
                    <div className="mb-3">
                        <div className="jobInfo__common-item-title mb-1">
                            {t("business.job.info.skill")}
                        </div>
                        <div className="jobInfo__common-item-skill">
                            {data.jobSkills.map((e, index) =>
                                <div className="jobInfo__body-info-text-border" key={index}>
                                    {e.skillName}
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="jobInfo__common-item-title mb-1">
                            {t("business.job.info.city")}
                        </div>
                        <div className="jobInfo__body-info-text-border">
                            {data.cityName}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default JobInfoCommon