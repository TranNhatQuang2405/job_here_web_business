import React from 'react'
import { useTranslation } from 'react-i18next'
import "./CVOverall.css"
function CVOverall({ cvData }) {

    const { t } = useTranslation()

    return (
        <div className="CVOverall__box">
            <div className="CV__title">{t("cv.title.overall")}</div>
            <div className="CV__content">
                {cvData}
            </div>
        </div>
    )
}

export default CVOverall