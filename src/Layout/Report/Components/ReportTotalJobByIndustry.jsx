import React, { useState, useEffect } from "react";
import { ColumnChart } from "Components/Chart";
import { reportBusiness } from "Business";
import { useTranslation } from "react-i18next";

const LIMIT = 10;

const ReportTotalJobByIndustry = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let result = await reportBusiness.getTotalJobByIndustry(LIMIT);
    if (result.data.httpCode === 200) {
      setData(result.data.objectData);
    }
    setLoading(false);
  };

  return (
    <div>
      <ColumnChart
        data={data}
        loading={loading}
        fieldLabel={{
          xField: "industryName",
          yField: "totalJob",
          yFieldAlias: t("business.report.total.job"),
        }}
      />
    </div>
  );
};

export default ReportTotalJobByIndustry;
