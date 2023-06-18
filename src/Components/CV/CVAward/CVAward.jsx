import React from 'react'
import { useTranslation } from 'react-i18next'
import "./CVAward.css"
import { Award } from 'react-bootstrap-icons'

function CVAward({ cvData }) {
    const { t } = useTranslation()
    return (
        <div>
            <div className="CV__title">{t("cv.title.award")}</div>
            <div className="CV__content">
                {cvData.map((value, index) => (
                    <div className="CVSkill__content" key={index}>
                        <Award className="CV__icon" />
                        <div className="CV__contentIcon">{value}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CVAward