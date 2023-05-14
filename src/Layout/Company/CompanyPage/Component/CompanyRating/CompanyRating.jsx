import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Rate } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import { Pagination, Spinner } from "react-bootstrap";
import { companyBusiness } from "Business";
import moment from "moment";
import _ from "underscore";
import "./CompanyRating.css";

function CompanyRating({ companyId }) {
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalComment, setTotalComment] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 10;

  const onChangePage = (page) => () => {
    if (page >= 0 && page < totalPage) {
      setActivePage(page);
    }
  };

  const convertToString = (time) => {
    let today = moment();
    let dateReceived = moment(time);
    let timeString = dateReceived.format("HH:mm DD/MM");

    if (today.isSame(dateReceived, "day") && today.isSame(dateReceived, "year"))
      timeString = dateReceived.format("HH:mm");
    else if (!today.isSame(dateReceived, "year"))
      timeString = dateReceived.format("HH:mm DD/MM/YYYY");
    return timeString;
  };

  useEffect(() => {
    let isSubscribed = true;
    const getListComment = async () => {
      let result = await companyBusiness.GetListComment(companyId, activePage, pageSize);
      if (result.data.httpCode === 200) {
        if (totalPage !== result.data.objectData.totalPage) {
          let newTotalPage = result.data.objectData.totalPage;
          setTotalPage(newTotalPage);
        }
        if (totalComment !== result.data.objectData.totalRecord) {
          setTotalComment(result.data.objectData.totalRecord);
        }
        setComments(result.data?.objectData?.pageData);
      } else {
        setComments([]);
      }
      setLoading(false);
    };
    if (isSubscribed) getListComment();
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, companyId]);

  if (loading)
    return (
      <div className="CompanyPage__company-info jh-box-item text-center">
        <Spinner animation="border"></Spinner>
      </div>
    );

  return (
    <div className="CompanyPage__company-info jh-box-item">
      <h4 className="CompanyRating__header">{`${totalComment} ${t(
        "companyRating.header"
      )}`}</h4>
      <hr />
      <div>
        {!!comments &&
          comments.map((comment) => (
            <div key={comment.commentId} className="CompanyRating__child">
              <div className="d-flex">
                <div className="CompanyRating__child-title">{comment.title}</div>
                <div className="CompanyRating__child-time">
                  {convertToString(comment.createdDate)}
                </div>
              </div>
              <div className="d-flex">
                <Rate
                  disabled
                  className="CompanyPage_rating-start CompanyRating__child-start"
                  defaultValue={0}
                  value={comment.rateScore}
                />
                {comment.isRecommended ? (
                  <div className="CompanyRating__child-react">
                    <LikeFilled className="CompanyRating__child-like" />
                    {t("companyRating.like")}
                  </div>
                ) : (
                  <div className="CompanyRating__child-react">
                    <DislikeFilled className="CompanyRating__child-dislike" />
                    {t("companyRating.dislike")}
                  </div>
                )}
              </div>
              <div>{comment.content}</div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-center align-items-center">
        {totalPage > 0 && (
          <Pagination>
            <Pagination.First onClick={onChangePage(0)} />
            <Pagination.Prev onClick={onChangePage(activePage - 1)} />
            {_.map([...Array(totalPage)], (item, index) => (
              <Pagination.Item
                key={index}
                active={index === activePage}
                onClick={onChangePage(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={onChangePage(activePage + 1)} />
            <Pagination.Last onClick={onChangePage(totalPage - 1)} />
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default CompanyRating;
