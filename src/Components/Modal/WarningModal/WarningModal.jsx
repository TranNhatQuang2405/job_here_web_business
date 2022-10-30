import React, { useState, forwardRef, useImperativeHandle } from "react";
import Modal from "react-bootstrap/Modal";
import "./WarningModal.css"
import { useTranslation } from "react-i18next";

const WarningModal = forwardRef(({ title }, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMess] = useState("");
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    onToggleModal: () => setShow(!show),
    setMessage: (mess) => setMess(mess),
  }));

  const onHide = () => {
    setShow(false);
    setMess("");
  };

  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
      <Modal.Header closeButton className="WarningModal__header">
        <Modal.Title>{title || t("Warning")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="WarningModal__body">
        <p className="WarningModal__body-text">{message}</p>
      </Modal.Body>
    </Modal>
  );
});

export default WarningModal;
