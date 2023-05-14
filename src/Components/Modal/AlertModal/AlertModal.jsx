import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { clearContentAlert } from "Config/Redux/Slice/AlertSlice";
import { useDispatch, useSelector } from "react-redux";
import "./AlertModal.css";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "Components/Button";

const AlertModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const alertData = useSelector((state) => state.AlertState.alertData);
  const onHideParent = () => {
    dispatch(clearContentAlert());
    if (alertData.onHide) alertData.onHide();
  };

  const onConfirmParent = async () => {
    setLoading(true);
    await alertData.onConfirm();
    setLoading(false);
    dispatch(clearContentAlert());
  };

  const listHttpCode = [
    {
      httpCode: 200,
      className: "success",
      variant: "primary",
    },
    {
      httpCode: 400,
      className: "fail",
      variant: "danger",
    },
    {
      httpCode: 401,
      className: "warn",
      variant: "warning",
    },
    {
      httpCode: 403,
      className: "warn",
      variant: "warning",
    },
    {
      httpCode: 406,
      className: "fail",
      variant: "danger",
    },
  ];

  const { variant } = listHttpCode.find((x) => x.httpCode === alertData.httpCode);
  return (
    <Modal
      centered
      show={alertData.show}
      onHide={onHideParent}
      dialogClassName="modal-90w"
    >
      <Alert
        key={variant}
        variant={variant}
        onClose={onHideParent}
        className="AlertModal__bound"
        dismissible
      >
        <Alert.Heading>{alertData.title}</Alert.Heading>
        <hr className="AlertModel__line" />
        {alertData.message}
        {alertData.confirm ? (
          <>
            <hr className="AlertModel__line" />
            <div className="AlertModal__bound-btn">
              <ButtonPrimary onClick={onConfirmParent}>
                {loading ? <Spinner animation="border" variant="light" /> : t("alert.ok")}
              </ButtonPrimary>
              <ButtonPrimary onClick={onHideParent} secondary={true}>
                {t("alert.no")}
              </ButtonPrimary>
            </div>
          </>
        ) : (
          <></>
        )}
      </Alert>
    </Modal>
  );
};

export default AlertModal;
