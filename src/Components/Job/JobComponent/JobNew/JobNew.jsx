import React, { useEffect, useState } from "react";
import "./JobNew.css";
import _ from "underscore";
import { JobHeader } from "Components/Job";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { jobBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";

const JobNew = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let result = await jobBusiness.GetNewJob();
      if (result.data.httpCode === 200) {
        setData(result?.data?.objectData ?? []);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const settings = {
    dots: true,
    speed: 500,
    nextArrow: <></>,
    prevArrow: <></>,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (data.length === 0) return null;

  return (
    <div className="JobNew__container jh-container mt-3 pt-2 pb-4">
      <h4 className="ps-3 JobNew__container-title">{t("New Job")}</h4>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Slider {...settings}>
          {_.map(data, (item) => {
            return <JobHeader className="JobNew__item" key={item.jobId} jobData={item} />;
          })}
        </Slider>
      )}
    </div>
  );
};

export default JobNew;
