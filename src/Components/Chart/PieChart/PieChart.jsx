import React from "react";
import { Pie } from "@ant-design/plots";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";

const PieChart = ({ data = [], loading = false }) => {
  const { t } = useTranslation();

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    label: {
      type: "outer",
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <div className="p-3">
          <Pie {...config} />
        </div>
      ) : (
        <div className="ps-3">
          <p>{t("business.report.nodata")}</p>
        </div>
      )}
    </div>
  );
};

export default PieChart;
