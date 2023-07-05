import React, { useState, useRef } from "react";
import { Modal, InputGroup, Form, Button, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import validator from "validator";
import { AlertModal, WarningModal } from "Components/Modal";
import { companyBusiness } from "Business";
import "./AddCompany.css";

const AddCompany = ({ show, onHide }) => {
  const { t } = useTranslation();
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    title: t("business.company.addCompanyTitle"),
    httpCode: 200,
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCompanyInfo((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleClose = () => {
    setCompanyInfo({
      companyName: "",
      address: "",
      size: "",
      email: "",
      minSize: 0,
      maxSize: 0,
    });
    onHide();
  };

  const handleFail = () => {
    setShowAlert({
      show: false,
      message: "",
      title: "",
      httpCode: 200,
    });
  };

  const handleSuccess = () => {
    setShowAlert({
      show: false,
      message: "",
      title: "",
      httpCode: 200,
    });
    handleClose();
  };

  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    address: "",
    size: "",
    email: "",
    minSize: 0,
    maxSize: 0,
  });

  const handSumit = async () => {
    if (!validator.isEmail(companyInfo.email)) {
      modalRef.current.setMessage(t("business.company.add.email.error"));
      modalRef.current.onToggleModal();
    } else if (!(companyInfo.minSize <= companyInfo.maxSize)) {
      modalRef.current.setMessage(t("business.company.add.size.error"));
      modalRef.current.onToggleModal();
    } else if (
      companyInfo.address.trim() === "" ||
      companyInfo.companyName.trim() === ""
    ) {
      modalRef.current.setMessage(t("business.company.add.other.error"));
      modalRef.current.onToggleModal();
    } else if (
      companyInfo.address.trim().length < 6 ||
      companyInfo.companyName.trim().length < 6
    ) {
      modalRef.current.setMessage(t("business.company.add.length.error"));
      modalRef.current.onToggleModal();
    } else {
      setLoading(true);
      let params = companyInfo;
      params.size =
        companyInfo.minSize > 0 && companyInfo.maxSize > companyInfo.minSize
          ? `${companyInfo.minSize * 1} - ${companyInfo.maxSize * 1}`
          : companyInfo.maxSize * 1;
      let result = await companyBusiness.CreateCompany(companyInfo);
      setLoading(false);
      if (result && result.data) {
        setShowAlert({
          title: t("business.company.addCompanyTitle"),
          message: result.data.message,
          show: true,
          httpCode: result.data.httpCode,
        });
      }
      if (result.data.httpCode === 200) {
        onHide();
        window.location.reload();
      }
    }
  };

  return (
    <Modal
      className="modal__custom-bg"
      size="lg"
      fullscreen="lg-down"
      centered
      show={show}
      onHide={onHide}
    >
      <WarningModal ref={modalRef} />
      <AlertModal
        data={showAlert}
        onHide={showAlert.httpCode === 200 ? handleSuccess : handleFail}
      />
      <Modal.Header closeButton>
        <Modal.Title>{t("business.company.addCompanyTitle")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="AddCompany__body">
          <Form.Label htmlFor="companyName">
            {t("business.company.add.companyName")}
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange}
              id="companyName"
              placeholder={t("business.company.add.companyName")}
              value={companyInfo.companyName}
              required
            />
          </InputGroup>
          <Form.Label htmlFor="address">{t("business.company.add.address")}</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange}
              id="address"
              placeholder={t("business.company.add.address")}
              value={companyInfo.address}
            />
          </InputGroup>
          <Form.Label htmlFor="minSize">{t("business.company.add.size")}</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>{t("business.company.add.fromSize")}</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              type="number"
              min={0}
              id="minSize"
              placeholder={t("business.company.add.minSize")}
              value={companyInfo.minSize}
            />
            <InputGroup.Text>{t("business.company.add.people")}</InputGroup.Text>
            <InputGroup.Text>{t("business.company.add.toSize")}</InputGroup.Text>
            <Form.Control
              onChange={handleChange}
              type="number"
              min={0}
              id="maxSize"
              placeholder={t("business.company.add.maxSize")}
              value={companyInfo.maxSize}
            />
            <InputGroup.Text>{t("business.company.add.people")}</InputGroup.Text>
          </InputGroup>
          <Form.Label htmlFor="email">{t("business.company.add.email")}</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              onChange={handleChange}
              id="email"
              placeholder={t("business.company.add.email")}
              value={companyInfo.email}
            />
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("business.company.add.close")}
        </Button>
        <Button variant="primary" disabled={loading} onClick={handSumit}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            t("business.company.add.submit")
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCompany;
