import React from "react";
import Modal from "react-bootstrap/Modal";
import "./AlertModal.css"

const AlertModal = ({ data, onHide }) => {

    const listHttpCode = [
        {
            httpCode: 200,
            className: "success"
        },
        {
            httpCode: 400,
            className: "fail"
        },
        {
            httpCode: 401,
            className: "warn"
        },
        {
            httpCode: 403,
            className: "warn"
        },
        {
            httpCode: 406,
            className: "fail"
        },
    ]

    const className = listHttpCode.find(x => x.httpCode === data.httpCode).className
    return (
        <Modal centered show={data.show} onHide={onHide} dialogClassName="modal-90w">
            <Modal.Header closeButton className={`AlertModal__header-${className}`}>
                <Modal.Title>{data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`AlertModal__body-${className}`}>
                <p className="AlertModal__body-text">{data.message}</p>
            </Modal.Body>
        </Modal>
    );
};

export default AlertModal;
