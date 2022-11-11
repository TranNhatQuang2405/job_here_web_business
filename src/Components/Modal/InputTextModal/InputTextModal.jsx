import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import "./InputTextModal.css"
const InputText = ({ title, content, show, handleDone, handleClose }) => {
    const { t } = useTranslation()
    const [htmlContent, setHtmlContent] = useState(content || "")
    const onClose = () => {
        setHtmlContent("")
        handleClose();
    }

    const onHide = () => {
        setHtmlContent("")
        handleDone(htmlContent)
    };
    const handleChange = (content, delta, source, editor) => {
        setHtmlContent(content)
    }
    const handleSave = () => {
        setHtmlContent("")
        handleDone(htmlContent)
    }

    useEffect(() => {
        setHtmlContent(content)
    }, [content])


    return (
        <Modal className='modal__custom-bg' size="xl" fullscreen='lg-down' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ReactQuill onChange={handleChange} theme="snow" value={htmlContent} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onClose}>{t("business.company.edit.close")}</Button>
                <Button variant="success" onClick={handleSave}>{t("business.company.edit.save")}</Button>
            </Modal.Footer>
        </Modal>
    )
}
export default InputText 