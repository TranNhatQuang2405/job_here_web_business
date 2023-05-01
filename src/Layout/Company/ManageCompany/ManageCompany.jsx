import React, { memo, useState, useEffect } from "react";
import { AddCompany } from "./Component";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { PlusCircleFill } from "react-bootstrap-icons";
import { companyBusiness } from "Business";
import "./ManageCompany.css";
import { Button } from "react-bootstrap";
import { LoadingSpinner } from "Components/Loading";
import { useNavigate } from "react-router-dom";
import { SetCompany } from "Config/Redux/Slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const ManageCompany = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [listCompany, setListCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionInfo = useSelector((state) => state.User.sessionInfo);

  useEffect(() => {
    if (listCompany.length > 0) {
      let _company = listCompany[0];
      navigate(`/manageCompany/companyInfo/${_company.companyId}`);
    }
  }, [listCompany]);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    setLoading(true);
    if (sessionInfo.company) {
      setListCompany([{ companyId: sessionInfo.company }]);
    } else {
      let result = await companyBusiness.GetListCompanyOwner();
      if (result.data.httpCode === 200) {
        let _company = result.data.objectData;
        dispatch(SetCompany(_company.companyId));
        setListCompany(_company);
      } else {
        setListCompany([]);
      }
    }
    setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <AddCompany show={showModal} onHide={() => setShowModal(false)} />
      <div className="manageCompany__header-layout">
        <PathTree className="d-none d-lg-block" />
        <div className="manageCompany__buttonAdd-layout">
          <Button onClick={() => setShowModal(true)}>
            <PlusCircleFill size="25" color="aliceblue" />
            <span className="manageCompany__buttonAdd-content">
              {t("business.manage.company.add")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ManageCompany);
