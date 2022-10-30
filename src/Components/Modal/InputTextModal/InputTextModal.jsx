import React, { forwardRef, useState, useImperativeHandle } from 'react'
import { Modal } from 'react-bootstrap'
import ReactQuill from 'react-quill';
import "./InputTextModal.css"
const InputText = forwardRef(({ title, isShow, handleDone }, ref) => {
    const [show, setShow] = useState(isShow || false)
    const [htmlContent, setHtmlContent] = useState("")
    useImperativeHandle(ref, () => ({
        onToggleModal: () => setShow(!show),
    }));
    const onHide = () => {
        setShow(false)
        handleDone()
    };
    const handleChange = (content, delta, source, editor) => {
        setHtmlContent(content)
    }
    return (
        <Modal className='modal__custom-bg' size="xl" fullscreen='lg-down' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
            </Modal.Header>
            <Modal.Body>
                <ReactQuill onChange={handleChange} theme="snow" />
            </Modal.Body>
        </Modal>
    )
});
export default InputText 