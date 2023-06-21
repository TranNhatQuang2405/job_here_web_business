import React from "react";
import { useTranslation } from "react-i18next";
import { Column } from "@ant-design/plots";
import { LoadingSpinner } from "Components/Loading";

const ColumnChart = ({ data = [], loading = false, fieldLabel = {} }) => {
  const { t } = useTranslation();

  const config = {
    data,
    xField: fieldLabel.xField,
    yField: fieldLabel.yField,
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        // autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      [fieldLabel.yField]: {
        alias: fieldLabel.yFieldAlias,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <div className="p-3 columns__container">
          <Column {...config} />
        </div>
      ) : (
        <div className="ps-3">
          <p>{t("business.report.nodata")}</p>
        </div>
      )}
    </div>
  );
};

export default ColumnChart;
