import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import "./InputTextModal.css"
const InputText = ({ title, content, show, handleDone, handleClose }) => {
    const { t } = useTranslation()
    const [htmlContent, setHtmlContent] = useState(content || "")
    const onHide = () => {
        handleDone(htmlContent)
    };
    const handleChange = (content, delta, source, editor) => {
        setHtmlContent(content)
    }
    const handleSave = () => {
        handleDone(htmlContent)
    }
    return (
        <Modal className='modal__custom-bg' size="xl" fullscreen='lg-down' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactQuill onChange={handleChange} theme="snow" value={htmlContent} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>{t("business.company.edit.close")}</Button>
                <Button variant="success" onClick={handleSave}>{t("business.company.edit.save")}</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default InputText 