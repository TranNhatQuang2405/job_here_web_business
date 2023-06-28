import React, { useState, forwardRef, useImperativeHandle } from "react";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";
import { ButtonPrimary } from "Components/Button";
import { IconSpinner } from "Components/Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "moment";
import { applicationBusiness } from "Business";

const ProcessApplicationModal = forwardRef(({ onSuccess }, ref) => {
  const [show, setShow] = useState(false);
  const [params, setParams] = useState({
    applicationId: 0,
    status: "ACCEPTED",
  });
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [cancelContent, setCancelContent] = useState("");
  const [pendingProcess, setPendingProcess] = useState(false);

  useImperativeHandle(ref, () => ({
    onToggleModal: () => setShow(!show),
    onSetParams: (pr) => setParams(pr),
  }));

  const onHide = () => {
    setShow(false);
  };

  const onChangeDate = (date) => {
    if (date >= new Date()) setStartDate(date);
  };

  const onChangeContent = (e) => {
    setCancelContent(e.target.value);
  };

  const onApply = async () => {
    if (params.applicationId) {
      let _params = {
        applicationId: params.applicationId,
        applicationStatus: params.status,
        interviewDate: null,
        cancelContent: null,
      };
      setPendingProcess(true);
      if (params.status === "ACCEPTED") {
        _params.interviewDate = Moment(startDate).format("YYYY/MM/DD");
      } else {
        _params.cancelContent = cancelContent;
      }
      let res = await applicationBusiness.processApplication(_params);
      setPendingProcess(false);
      if (res.data.httpCode === 200) {
        onSuccess(res.data.message);
        onHide();
      }
    }
  };

  return (
    <Modal centered show={show} onHide={onHide} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{t("business.job.application.process")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {params.status === "ACCEPTED" ? (
          <div>
            <p>{t("business.job.application.process.choose.interviewDate")}</p>
            <DatePicker selected={startDate} onChange={onChangeDate} />
          </div>
        ) : (
          <div>
            <div className="mt-2">
              <p>{t("business.job.application.process.cancelContent")}</p>
              <textarea
                value={cancelContent}
                onChange={onChangeContent}
                name="letter"
                className="form-control jh-box-input"
                rows="6"
                placeholder={t("business.job.application.process.cancelPlaceholder")}
              />
            </div>
          </div>
        )}

        <div className="JobApply__footer d-flex justify-content-end pt-4">
          <ButtonPrimary secondary onClick={onHide} style={{ marginRight: "10px" }}>
            {t("business.job.application.back")}
          </ButtonPrimary>
          <ButtonPrimary onClick={onApply}>
            {pendingProcess ? (
              <IconSpinner variant="dark" />
            ) : params.status === "ACCEPTED" ? (
              t("business.job.application.accept")
            ) : (
              t("business.job.application.deny")
            )}
          </ButtonPrimary>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ProcessApplicationModal;
