import React from 'react'
import { Modal } from 'react-bootstrap'
function UploadModal({ title, show, onHide }) {



    return (
        <Modal className='modal__custom-bg' size="xl" fullscreen='lg-down' centered show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
        </Modal>
    )
}

export default UploadModal