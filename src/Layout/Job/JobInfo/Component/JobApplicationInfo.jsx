import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { userBusiness } from "Business"
function JobApplicationInfo({ show, onHide, data }) {

    const { t } = useTranslation()

    useEffect(() => {
        if (data && data.applicationId > 0 && data.viewed === false)
            userBusiness.ViewApplication(data.applicationId)
    }, [data])


    return (
        <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title>{t("business.job.application.title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="form-group">
                        <p>
                            {t("business.job.application.fullname")}: <b>{data.fullName}</b>
                        </p>
                    </div>
                    <div className="form-group">
                        <p>
                            {t("business.job.application.email")} : <b>{data.email}</b>
                        </p>
                    </div>
                    <div className="form-group">
                        <p>
                            {t("business.job.application.phone")} : <b>{data.phone}</b>
                        </p>
                    </div>
                    <div className="form-group">
                        <p>
                            {t("business.job.application.cv")} :
                            <a className="jobApplication__linkCv" target="_blank" href={data.cvUrl} rel="noreferrer">
                                {t("business.job.application.cvUrl")}
                            </a>
                        </p>

                    </div>
                    <div className="mt-2">
                        <p>{t("business.job.application.about")}</p>
                        <textarea
                            className="form-control"
                            rows="6"
                            disabled
                            value={data.note}
                        ></textarea>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>
                    {t("business.job.application.closeBtn")}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default JobApplicationInfo