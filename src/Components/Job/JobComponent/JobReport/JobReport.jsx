import React from "react";
import "./JobReport.css";
import { ButtonPrimary } from "Components/Button";
import { useTranslation } from "react-i18next";

const JobReport = () => {
  const { t } = useTranslation();

  return (
    <div className="JobReport__container jh-box-item mt-3">
      <h3>{t("Report job")}</h3>
      <p>{t("jh-report-job")}</p>
      <ButtonPrimary secondary style={{ width: "100%", paddingLeft: 0, paddingRight: 0 }}>
        {t("Report job")}
      </ButtonPrimary>
    </div>
  );
};

export default JobReport;
