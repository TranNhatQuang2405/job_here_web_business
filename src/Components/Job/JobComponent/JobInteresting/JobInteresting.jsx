import React, { useState, useEffect } from "react";
import "./JobInteresting.css";
import _ from "underscore";
import { JobListSmall } from "Components/Job";
import { dropdownBusiness, jobBusiness } from "Business";
import { useTranslation } from "react-i18next";
import Pagination from "react-bootstrap/Pagination";
import { LoadingSpinner } from "Components/Loading";

const JobInteresting = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const size = 6;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getData = async () => {
    setLoading(true);
    let result = await jobBusiness.GetListJobInteresting(currentPage, size);
    if (result.data.httpCode === 200) {
      if (totalPage !== result.data.objectData.totalPage) {
        let newTotalPage = result.data.objectData.totalPage;
        setTotalPage(newTotalPage);
      }
      let listJob = result?.data?.objectData?.pageData ?? [];
      let _unitname = await dropdownBusiness.UnitDropdown();
      if (_unitname.data.httpCode === 200) {
        for (let i = 0; i < listJob.length; i++) {
          listJob[i].unitName = _unitname.data.objectData.find(
            (x) => x.unit === listJob[i].unit
          ).unitName;
        }
      }
      setData(listJob);
    }
    setLoading(false);
  };

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setCurrentPage(page);
    }
  };

  if (!data) return null;

  return (
    <div className="JobInteresting__container jh-container jh-box-item mt-3 mb-3 p-3">
      <div className="JobInteresting__box-label">
        <div>
          <div className="JobInteresting__dot" />
          {t("Recommended by JobHere AI")}
        </div>
      </div>
      <div className="JobInteresting__box-header d-flex">
        <h4>{t("Interesting Job")}</h4>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <JobListSmall data={data} />
          <div className="d-flex justify-content-center align-items-center mb-1">
            {totalPage > 0 && (
              <Pagination>
                <Pagination.First onClick={onChangePage(0)} />
                <Pagination.Prev onClick={onChangePage(currentPage - 1)} />
                {_.map([...Array(totalPage)], (item, index) => (
                  <Pagination.Item
                    key={index}
                    active={index === currentPage}
                    onClick={onChangePage(index)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={onChangePage(currentPage + 1)} />
                <Pagination.Last onClick={onChangePage(totalPage - 1)} />
              </Pagination>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInteresting;
