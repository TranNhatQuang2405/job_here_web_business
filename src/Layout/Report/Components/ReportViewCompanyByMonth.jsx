import React, { useState } from "react";
import _ from "underscore";
import { PieChart } from "Components/Chart";
import { MonthPicker } from "Components/Picker";
import { reportBusiness } from "Business";

const ReportViewCompanyByMonth = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async (month) => {
    setLoading(true);
    let result = await reportBusiness.GetTotalViewCompanyByMonth(month);
    if (result.data.httpCode === 200) {
      let _data = _.map(result?.data?.objectData ?? [], (item) => ({
        type: item.companyName,
        value: item.totalView,
      }));
      let _filterData = _.filter(_data, (item) => item.value > 0);
      setData(_filterData);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="ms-3 mb-3">
        <MonthPicker getData={getData} />
      </div>
      <PieChart data={data} loading={loading} />
    </div>
  );
};

export default ReportViewCompanyByMonth;
