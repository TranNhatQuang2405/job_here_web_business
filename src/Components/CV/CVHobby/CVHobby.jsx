import React from 'react'
import { useTranslation } from 'react-i18next'

function CVHobby({ cvData }) {

    const { t } = useTranslation()

    return (
        <div className="CVHobby__box">
            <div className="CV__title">{t("cv.title.hobby")}</div>
            <div className="CV__content">
                {cvData}
            </div>
        </div>
    )
}

export default CVHobby