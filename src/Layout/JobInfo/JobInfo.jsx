import React, { useEffect, memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PathTree } from "Components/Path";
import { jobBusiness, dropdownBusiness } from "Business";
import "./JobInfo.css";
import { LoadingPage } from "Layout/Common";
import { Avatar } from "Components/Image";
import { Clock, PencilSquare } from "react-bootstrap-icons";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Moment from "moment";
import { JobInfoCommon, JobInfoDetail, JobListApplication } from "./Component";

const JobInfo = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobInfo, setJobInfo] = useState({});
  const [listApplication, setListApplication] = useState([]);
  const formatDate = (date) => {
    let result = Moment(date).format("DD/MM/yyyy");
    return result;
  };
  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      let stringPath = location.pathname;
      let tmpPath = stringPath.split("/");
      let jobId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
      let prepare = [];
      prepare.push(dropdownBusiness.UnitDropdown());
      prepare.push(dropdownBusiness.ExperienceDropdown());
      prepare.push(dropdownBusiness.JobtypeDropdown());
      prepare.push(dropdownBusiness.TitleDropdown());
      prepare.push(jobBusiness.GetJobInfo(jobId));
      prepare.push(dropdownBusiness.CityDropdown());
      prepare.push(dropdownBusiness.GenderDropdown());
      prepare.push(jobBusiness.GetListApplicationOfJob(jobId));
      let results = await Promise.all(prepare);
      if (!results.find((x) => x.data.httpCode !== 200)) {
        let unit = results[0].data.objectData;
        let experience = results[1].data.objectData;
        let jobType = results[2].data.objectData;
        let title = results[3].data.objectData;
        let city = results[5].data.objectData;
        let data = results[4].data.objectData;
        let gender = results[6].data.objectData;
        setListApplication(results[7].data.objectData);
        // Gán unit
        let u = unit.find((x) => x.unit === data.unit);
        if (u) data.unitName = u.unitName;
        //Gán giới tính
        let g = gender.find((x) => x.gender === data.gender);
        if (g) data.genderName = g.genderName;
        //Gán experiences
        data.experienceNames = [];
        data.experiences.forEach((element) => {
          let ex = experience.find((e) => e.experience === element);
          if (ex) data.experienceNames.push(ex);
        });
        //Gán jobType
        data.jobTypeNames = [];
        data.jobTypes.forEach((element) => {
          let ex = jobType.find((e) => e.jobType === element);
          if (ex) data.jobTypeNames.push(ex);
        });
        //Gán titles
        let t = title.find((x) => x.title === data.title);
        if (t) data.titleName = t.titleName;

        //Gán city
        let c = city.find((x) => x.cityId === data.cityId);
        if (c) data.cityName = c.cityName;
        setJobInfo(data);
      }
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  const handleEdit = () => {
    navigate(`/manageJob/editJob/${jobInfo.jobId}`);
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <PathTree lastPath={jobInfo.jobName} />
      <div className="jobInfo__buttonEdit-layout">
        <Button onClick={handleEdit}>
          <PencilSquare size="25" color="aliceblue" />
          <span className="manageCompany__buttonAdd-content">
            {t("business.manage.editJob.title")}
          </span>
        </Button>
      </div>
      <div className="jobInfo__header">
        <Avatar width="120px" url={jobInfo.avatar} />
        <div className="jobInfo__header-content">
          <div className="jobInfo__header-content-jobName">{jobInfo.jobName}</div>
          <div className="jobInfo__header-content-companyName">{jobInfo.companyName}</div>
          <div className="jobInfo__header-content-date">
            <Clock className="me-2" size="20px" />
            <span>{t("business.job.header.time") + formatDate(jobInfo.endDate)}</span>
          </div>
        </div>
      </div>
      <Container fluid>
        <Row>
          <Col lg={8} className="jobInfo__body mb-2">
            <div className="companyInfo__body-title mb-3">
              <span className="jobInfo__body-title-line"></span>
              {t("business.job.info.about")}
            </div>
            <JobInfoCommon data={jobInfo} />
            <div className="jobInfo__body-info-common mt-3">
              <div className="jobInfo__body-info-common-title">
                {t("business.job.info.address")}
              </div>
              <div className="mt-2">{`- ${jobInfo.address}`}</div>
            </div>
            <JobInfoDetail data={jobInfo} />
          </Col>
          <Col lg={4} className="jobInfo__body mb-2">
            <div className="companyInfo__body-title mb-3">
              <span className="jobInfo__body-title-line"></span>
              {t("business.job.info.listApllication")}
            </div>
            <JobListApplication data={listApplication} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default memo(JobInfo);
