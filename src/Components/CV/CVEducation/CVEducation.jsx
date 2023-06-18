import React from 'react'
import { MortarboardFill } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import "./CVEducation.css"

function CVEducation({ cvData }) {
    const { t } = useTranslation()
    return (
        <div>
            <div className="CV__title">{t("cv.title.education")}</div>
            <div className="CV__content">
                {
                    cvData.map((value, index) => (
                        <div className="CVEducation__content" key={index}>
                            <MortarboardFill className="CV__icon" />
                            <div className="CVEducation__content-schoolName">{value.schoolName}</div>
                            <div className="CVEducation__content-time">({value.year})</div>
                            <div className="CVEducation__content-major">{value.major}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CVEducation