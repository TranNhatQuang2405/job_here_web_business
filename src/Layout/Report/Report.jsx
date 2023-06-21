import React from "react";
import "./Report.css";
import { Tab, Tabs } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  ReportTotalJobByIndustry,
  ReportViewCompanyByMonth,
  ReportViewJobByMonth,
} from "./Components";

const Report = () => {
  const { t } = useTranslation();

  return (
    <Tabs className="mb-3">
      <Tab eventKey="viewjob" title={t("business.report.viewjob.month")}>
        <ReportViewJobByMonth />
      </Tab>
      {/* <Tab eventKey="viewcompany" title={t("business.report.viewcompany.month")}>
        <ReportViewCompanyByMonth />
      </Tab> */}
      <Tab eventKey="totaljobindustry" title={t("business.report.totalJob.industry")}>
        <ReportTotalJobByIndustry />
      </Tab>
    </Tabs>
  );
};

export default Report;
