import React, { useState } from "react";
import { ColumnChart } from "Components/Chart";
import { MonthPicker } from "Components/Picker";
import { reportBusiness } from "Business";
import { useTranslation } from "react-i18next";

const ReportViewCompanyByMonth = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async (month) => {
    setLoading(true);
    let result = await reportBusiness.GetTotalViewCompanyByMonth(month);
    if (result.data.httpCode === 200) {
      setData(result.data.objectData);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="ms-3 mb-3">
        <MonthPicker getData={getData} />
      </div>
      <ColumnChart
        data={data}
        loading={loading}
        fieldLabel={{
          xField: "companyName",
          yField: "totalView",
          yFieldAlias: t("totalView"),
        }}
      />
    </div>
  );
};

export default ReportViewCompanyByMonth;
