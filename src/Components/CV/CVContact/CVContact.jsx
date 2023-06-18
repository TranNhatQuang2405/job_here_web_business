import React from 'react'
import { useTranslation } from 'react-i18next'
import "./CVContact.css"
import { Calendar2CheckFill, EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons'

function CVContact({ cvData }) {
    const { t } = useTranslation()
    return (
        <div className="CVContact__box">
            <div className="CV__title">{t("cv.title.contact")}</div>
            <div className="CV__content">
                <div className="CVContact__content">
                    <EnvelopeFill className="CV__icon" />
                    <div className="CVContact__content-text">{cvData.email}</div>
                </div>
                <div className="CVContact__content">
                    <TelephoneFill className="CV__icon" />
                    <div className="CVContact__content-text">{cvData.phone}</div>
                </div>
                <div className="CVContact__content">
                    <Calendar2CheckFill className="CV__icon" />
                    <div className="CVContact__content-text">{cvData.dateOfBirth}</div>
                </div>
            </div>
        </div>
    )
}

export default CVContact