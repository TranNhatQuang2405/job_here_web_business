import React, { useState, useEffect } from "react";
import "./ProcessApplicationPage.css";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { jobBusiness } from "Business";
import { success } from "Config/Redux/Slice/AlertSlice";
import { useDispatch } from "react-redux";
import { Tab } from "Components/Navigation";
import AllApplication from "./Component/AllApplication";
import ListInterview from "./Component/ListInterview";

const ProcessApplicationPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const [listApplication, setListApplication] = useState([]);
  const [listInterview, setListInterview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const tabNames = [
    t("business.application.allApplication"),
    t("business.application.interview"),
  ];

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    let stringPath = location.pathname;
    let tmpPath = stringPath.split("/");
    let jobId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
    let res = await jobBusiness.GetJobInfo(jobId);
    if (res.data.httpCode === 200) {
      setJobData(res.data.objectData);
      let jobId = res.data.objectData.jobId;
      await getListApplication(jobId);
      await getListInterviewByJob(jobId);
    }
  };

  const getListApplication = async (jobId) => {
    if (!loading) setLoading(true);
    let res = await jobBusiness.GetListApplicationOfJob(jobId);
    if (res.data.httpCode === 200) {
      setListApplication(res.data.objectData);
    }
    setLoading(false);
  };

  const getListInterviewByJob = async (jobId) => {
    if (!loading) setLoading(true);
    let res = await jobBusiness.getListInterviewByJob(jobId);
    if (res.data.httpCode === 200) {
      setListInterview(res.data.objectData);
    }
    setLoading(false);
  };

  const onSuccess = async (mess) => {
    if (mess) {
      dispatch(
        success({
          message: mess,
          title: t("processApplication"),
        })
      );
    }
    await getListApplication(jobData.jobId);
  };

  return (
    <div className="ProcessApplicationPage__container">
      <PathTree lastPath={jobData?.jobName || t("CV List")} className="ms-3 pt-2" />
      <Tab data={tabNames} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {loading ? (
        <LoadingSpinner />
      ) : currentTab === 0 ? (
        <AllApplication listApplication={listApplication} onSuccess={onSuccess} />
      ) : (
        <ListInterview listInterview={listInterview} />
      )}
    </div>
  );
};

export default ProcessApplicationPage;
