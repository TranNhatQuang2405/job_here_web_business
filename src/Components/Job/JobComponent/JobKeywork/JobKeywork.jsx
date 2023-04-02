import React from "react";
import { TagList } from "Components/Tag";
import "./JobKeywork.css";

const JobKeywork = () => {
  let jobTypeData = [
    {
      label: "Marketing / Truyền thông / Quảng cáo",
      link: "https://www.topcv.vn/tim-viec-lam-marketing-truyen-thong-quang-cao-c10029",
    },
    {
      label: "Báo chí / Truyền hình",
      link: "https://www.topcv.vn/tim-viec-lam-bao-chi-truyen-hinh-c10004",
    },
  ];

  let areaData = [
    {
      label: "Hồ Chí Minh",
    },
    {
      label: "Quận 7",
    },
  ];

  return (
    <div className="JobKeywork__container">
      <h3>Ngành nghề</h3>
      <TagList tagData={jobTypeData} />
      <h3>Khu vực</h3>
      <TagList tagData={areaData} />
    </div>
  );
};

export default JobKeywork;
