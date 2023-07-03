import { AlertModal } from 'Components/Modal'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import validator from 'validator'
function EditHeaderModal({ companyInfoParent, show, handleClose }) {

    const [showAlert, setShowAlert] = useState({
        show: false,
        title: "",
        message: "",
        httpCode: 400
    })
    const init = () => {
        let size = companyInfoParent.size + ""
        let lsSize = size ? size.split('-') : []
        if (lsSize.length === 1) {
            companyInfoParent.minSize = lsSize[0] * 1
            companyInfoParent.maxSize = lsSize[0] * 1
        } else if (lsSize.length === 2) {
            companyInfoParent.minSize = lsSize[0] * 1
            companyInfoParent.maxSize = lsSize[1] * 1
        } else {
            companyInfoParent.minSize = 0
            companyInfoParent.maxSize = 0
        }
    }
    init()
    const [companyInfo, setCompanyInfo] = useState({ ...companyInfoParent })

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCompanyInfo((prev) => {
            return {
                ...prev,
                [id]: value
            }
        })
    }

    const resetAlert = () => {
        setShowAlert({
            show: false,
            title: "",
            message: "",
            httpCode: 400
        })
    }

    const handleSave = () => {
        if (!validator.isEmail(companyInfo.email)) {
            setShowAlert({
                httpCode: 400,
                show: true,
                message: t("business.company.add.email.error")
            });
        } else if (!(companyInfo.minSize * 1 <= companyInfo.maxSize * 1)) {
            setShowAlert({
                httpCode: 400,
                show: true,
                message: t("business.company.add.size.error")
            });
        } else if (companyInfo.address.trim() === "" || companyInfo.companyName.trim() === "") {
            setShowAlert({
                httpCode: 400,
                show: true,
                message: t("business.company.add.other.error")
            });
        } else if (companyInfo.address.trim().length < 6 || companyInfo.companyName.trim().length < 6) {
            setShowAlert({
                httpCode: 400,
                show: true,
                message: t("business.company.add.length.error")
            });
        }
        else {
            let params = companyInfo
            params.size = (companyInfo.minSize > 0 && companyInfo.maxSize > companyInfo.minSize) ? `${companyInfo.minSize} - ${companyInfo.maxSize}` : companyInfo.maxSize
            handleClose(params)
        }
    }

    const { t } = useTranslation()
    return (
        <Modal className='modal__custom-bg' size="lg" fullscreen='lg-down' centered show={show} onHide={handleClose}>
            <AlertModal data={showAlert} onHide={resetAlert} />
            <Modal.Header closeButton>
                <Modal.Title>{t("business.company.editCompanyTitle")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="AddCompany__body">
                    <Form.Label htmlFor="companyName">{t("business.company.edit.companyName")}</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleChange}
                            id="companyName"
                            placeholder={t("business.company.edit.companyName")}
                            value={companyInfo.companyName}
                            required
                        />
                    </InputGroup>
                    <Form.Label htmlFor="address">{t("business.company.edit.address")}</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleChange}
                            id="address"
                            placeholder={t("business.company.edit.address")}
                            value={companyInfo.address}
                        />
                    </InputGroup>
                    <Form.Label htmlFor="minSize">{t("business.company.edit.size")}</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>{t("business.company.edit.fromSize")}</InputGroup.Text>
                        <Form.Control
                            onChange={handleChange}
                            type="number"
                            min={0}
                            id="minSize"
                            placeholder={t("business.company.edit.minSize")}
                            value={companyInfo.minSize}
                        />
                        <InputGroup.Text>{t("business.company.edit.people")}</InputGroup.Text>
                        <InputGroup.Text>{t("business.company.edit.toSize")}</InputGroup.Text>
                        <Form.Control
                            onChange={handleChange}
                            type="number"
                            min={0}
                            id="maxSize"
                            placeholder={t("business.company.edit.maxSize")}
                            value={companyInfo.maxSize}
                        />
                        <InputGroup.Text>{t("business.company.edit.people")}</InputGroup.Text>
                    </InputGroup>
                    <Form.Label htmlFor="email">{t("business.company.edit.email")}</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleChange}
                            id="email"
                            placeholder={t("business.company.edit.email")}
                            value={companyInfo.email}
                        />
                    </InputGroup>
                    <Form.Label htmlFor="urlCompany">{t("business.company.edit.urlCompany")}</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={handleChange}
                            id="urlCompany"
                            placeholder={t("business.company.edit.urlCompany")}
                            value={companyInfo.urlCompany}
                        />
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleSave}>{t("business.company.edit.close")}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditHeaderModal