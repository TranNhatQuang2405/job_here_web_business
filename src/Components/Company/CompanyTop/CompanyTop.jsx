import React, { useState, useEffect } from "react";
import "./CompanyTop.css";
import _ from "underscore";
import { Row, Col } from "react-bootstrap";
import { LoadingSpinner } from "Components/Loading";
import { Avatar } from "Components/Image";
import { useTranslation } from "react-i18next";
import { companyBusiness } from "Business";
import { Link } from "react-router-dom";
import default_company_avatar from "Assets/Images/company_default_img.jpg";

const CompanyTop = () => {
  const { t } = useTranslation();
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 16;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    let result = await companyBusiness.GetListTopCompany();
    if (result.data.httpCode === 200) {
      let _companyList = result?.data?.objectData ?? [];
      if (_companyList.length > limit) _companyList = _companyList.slice(-limit);
      setCompanyList(_companyList);
    }
    setLoading(false);
  };

  return (
    <div className="jh-box-item p-3 mt-3 mb-3 CompanyTop__bound">
      <div className="d-flex justify-content-between">
        <h4 className="CompanyTop__title">{t("Top Company")}</h4>
        <Link to="/Company" className="CompanyTop_all-company">
          See all company <i className="bi bi-arrow-right" />
        </Link>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div>
            <Row style={{ rowGap: 16 }}>
              {_.map(companyList, (companyItem) => (
                <Col md={3} sm={6} key={companyItem.companyId}>
                  <div className="CompanyTop__item mb-3">
                    <Link to={`/Company/${companyItem.companyId}`}>
                      <div className="CompanyTop__item-logo">
                        <Avatar
                          className="CompanyTop__item-img"
                          width="60%"
                          roundedCircle={false}
                          url={companyItem?.avatarUrl || default_company_avatar}
                          alt={companyItem.companyName}
                        />
                        <p className="CompanyTop__item-text">{companyItem.companyName}</p>
                      </div>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyTop;
