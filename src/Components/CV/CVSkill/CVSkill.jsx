import React from 'react'
import { CircleFill } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import "./CVSkill.css"

function CVSkill({ cvData }) {
    const { t } = useTranslation()

    return (
        <div className="CVSkill__box">
            <div className="CV__title">{t("cv.title.skill")}</div>
            <div className="CV__content">
                {
                    cvData.map((value, index) => (
                        <div className="CVSkill__content" key={index}>
                            <CircleFill className="CV__icon"></CircleFill>
                            <div className="CV__contentIcon">{value}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CVSkill