import React from 'react'
import { useTranslation } from 'react-i18next'
import "./CVExperience.css"
import { BriefcaseFill } from 'react-bootstrap-icons'

function CVExperience({ cvData }) {
    const { t } = useTranslation()
    return (
        <div className="CVExperience__box">
            <div className="CV__title">{t("cv.title.experience")}</div>
            <div className="CV__content">
                {
                    cvData.map((value, index) => (
                        <div className="CVExperience__content" key={index}>
                            <BriefcaseFill className="CV__icon" />
                            <div className="CVExperience__content-companyName">{value.companyName}</div>
                            <div className="CVExperience__content-time">({value.timeWork})</div>
                            <div className="CVExperience__content-title">{value.title}</div>
                            <div className="CVExperience__content-description">{value.description}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CVExperience