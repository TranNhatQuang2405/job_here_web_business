import React from 'react'
import { Row, Col } from 'react-bootstrap'
import developing from "Assets/Images/developing.gif"
import "./Developing.css"
import { useTranslation } from 'react-i18next'
function Developing() {
    const { t } = useTranslation();
    return (
        <Row>
            <Col>
                <div className="developing__bound">
                    <div className="developing__header">{t("business.page.developing.title")}</div>
                    <img className="developing__img" src={developing} alt="404" />
                </div>
            </Col>
        </Row>
    )
}

export default Developing