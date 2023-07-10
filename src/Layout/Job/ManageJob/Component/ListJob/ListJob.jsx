import React, { useEffect, useState } from "react";
import { Table, FormCheck, Spinner } from "react-bootstrap";
import { Avatar } from "Components/Image";
import { jobBusiness } from "Business";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TrashFill } from "react-bootstrap-icons";
import { AlertModal, ConfirmModal } from "Components/Modal";
import Moment from "moment";
import "./ListJob.css";
const ListJob = ({ companyId, enoughJob }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [listJob, setListJob] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reRender, setReRender] = useState(0);
  const [jobId, setJobId] = useState(0);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: "",
    title: t("business.manage.job.delete"),
    httpCode: 200,
  });

  const handleCloseAlert = () => {
    setShowAlert({
      show: false,
      message: "",
      title: t("business.manage.job.delete"),
      httpCode: 200,
    });
  };

  const createUrl = (id) => {
    return `/manageJob/${id}`;
  };

  const handleDelete = async () => {
    let result = await jobBusiness.DeleteJob(jobId);
    if (result) {
      setShowAlert({
        show: true,
        message: result.data.message,
        title: t("business.manage.company.delete"),
        httpCode: result.data.httpCode,
      });
    } else {
      setShowAlert({
        show: true,
        message: t("business.manage.company.delete.fail"),
        title: t("business.manage.company.delete"),
        httpCode: 400,
      });
    }
    setShowConfirm(false);
    setReRender((prev) => prev + 1);
  };
  const handleShowConfirm = (id) => {
    setJobId(id);
    setShowConfirm(true);
  };

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      if (!loading) setLoading(true);
      let result = await jobBusiness.GetListJobManageByCompanyId(companyId);
      if (result.data.httpCode === 200) {
        let listTmp = result.data.objectData;
        setListJob(listTmp);
        setLoading(false);
      } else {
        setListJob([]);
        setLoading(false);
      }
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, reRender]);

  if (!loading && !companyId)
    return <div className="text-center">{t("business.manage.job.noCompany")}</div>;

  return (
    <div className="listJob__parent fix_scroll">
      <ConfirmModal
        show={showConfirm}
        title={t("business.manage.company.delete.title")}
        content={t("business.manage.company.delete.content")}
        handleClose={() => setShowConfirm(false)}
        handleSuccess={handleDelete}
      />
      <AlertModal data={showAlert} onHide={handleCloseAlert} />
      <h2 className="text-center mt-3 mb-3">{t("business.manage.job.title")}</h2>
      {enoughJob && (
        <div className="text-danger mt-1 mb-1">{t("business.manage.job.enough")}</div>
      )}
      <Table striped bordered hover size="lg" responsive="sm">
        <thead>
          <tr>
            <th className="text-center listJob__item-center">#</th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.avatar")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.name")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.createdDate")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.endDate")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.totalAplly")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.status")}
            </th>
            <th className="text-center listJob__item-center">
              {t("business.manage.job.table.delete")}
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && listJob.length > 0 ? (
            listJob.map((ele, index) => (
              <tr key={index}>
                <td className="text-center align-self-center listJob__item-center">
                  <div>{index + 1}</div>
                </td>
                <td className="text-center listJob__item-center">
                  <Avatar url={ele.avatarUrl} width="80px" className="mx-auto" />
                </td>
                <td className="listJob__item-center">
                  <Link to={createUrl(ele.jobId)} className="listJob__item-link">
                    {ele.jobName}
                  </Link>
                </td>
                <td className="text-center listJob__item-center">
                  <div>{Moment(ele.createdDate).format("DD/MM/YYYY")}</div>
                </td>
                <td className="text-center listJob__item-center">
                  <div>{Moment(ele.endDate).format("DD/MM/YYYY")}</div>
                </td>
                <td className="text-center listJob__item-center">
                  {ele.totalApplicant ? (
                    <Link
                      to={`/processApplication/${ele.jobId}`}
                      className="listJob__item-link"
                    >
                      {ele.totalApplicant}
                    </Link>
                  ) : (
                    <div>{ele.totalApplicant}</div>
                  )}
                </td>
                <td className="text-center listJob__item-center">
                  <FormCheck type="switch" checked={ele.isActive} disabled />
                </td>
                <td className="text-center listJob__item-center">
                  <TrashFill
                    size={30}
                    className="cur-pointer"
                    onClick={() => handleShowConfirm(ele.jobId)}
                  />
                </td>
              </tr>
            ))
          ) : !loading && listJob.length === 0 ? (
            <tr className="text-center">
              <td colSpan={100}>
                <div>{t("business.manage.company.table.nothing")}</div>
              </td>
            </tr>
          ) : (
            <tr className="text-center">
              <td colSpan={100}>
                {" "}
                <Spinner animation="border" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListJob;
