import React from "react";
import _ from "underscore";
import "./JobInfo.css";
import { IconCircle } from "Components/Icon";
import { useTranslation } from "react-i18next";
import { TagList } from "Components/Tag";

const JobInfo = ({ jobData = {} }) => {
  const { t } = useTranslation();

  return (
    <div className="JobInfo__container">
      <div className="JobInfo__box-info">
        <p>{t("Common infomation")}</p>
        <div className="JobInfo__box-main">
          {(!!jobData.salaryMin || !!jobData.salaryMax) && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"salary"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Salary")} </strong> <br />
                <span>
                  {jobData.salaryMin === jobData.salaryMax
                    ? jobData.salaryMin
                    : `${jobData.salaryMin} - ${jobData.salaryMax}`}{" "}
                  {jobData.unitName}
                </span>
              </div>
            </div>
          )}
          {!!jobData.amount && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"group"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Amount")} </strong> <br />
                <span>{jobData.amount}</span>
              </div>
            </div>
          )}
          {!!jobData.jobTypeNames && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"work"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Job Type")} </strong> <br />
                <TagList
                  tagData={_.map(jobData.jobTypeNames, (item) => ({
                    label: item.jobTypeName,
                  }))}
                />
              </div>
            </div>
          )}
          {!!jobData.titleName && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"level"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Level")} </strong> <br />
                <span>{jobData.titleName}</span>
              </div>
            </div>
          )}
          {!!jobData.genderName && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"gender"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Gender")} </strong> <br />
                <span>{jobData.genderName}</span>
              </div>
            </div>
          )}
          {!!jobData.experienceNames && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"experience"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Experience")} </strong>
                <br />
                <TagList
                  tagData={_.map(jobData.experienceNames, (item) => ({
                    label: item.experienceName,
                  }))}
                />
              </div>
            </div>
          )}
          {!!jobData.jobSkills && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"suitcase"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Skills")} </strong>
                <br />
                <TagList
                  tagData={_.map(jobData.jobSkills, (item) => ({
                    label: item.skillName,
                  }))}
                />
              </div>
            </div>
          )}
          {!!jobData.cityName && (
            <div className="JobInfo__box-item">
              <div>
                <IconCircle
                  name={"map"}
                  style={{ marginRight: "16px", marginTop: "5px" }}
                />
              </div>
              <div>
                <strong>{t("Region")} </strong>
                <br />
                <span>{jobData.cityName}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="JobInfo__box-address">
        <p>{t("Work address")}</p>
        <div>{jobData.address}</div>
      </div>
      <div className="JobInfo__job-data">
        {!!jobData.description && (
          <div>
            <h3>{t("Job description")}</h3>
            <div className="JobInfo__content-tab">
              <div
                dangerouslySetInnerHTML={{
                  __html: jobData.description || "",
                }}
                className="JobInfo__html"
              />
            </div>
          </div>
        )}
        {!!jobData.require && (
          <div>
            <h3>{t("Require")}</h3>
            <div className="JobInfo__content-tab">
              <div
                dangerouslySetInnerHTML={{
                  __html: jobData.require || "",
                }}
                className="JobInfo__html"
              />
            </div>
          </div>
        )}
        {!!jobData.benefit && (
          <div>
            <h3>{t("Benefit")}</h3>
            <div className="JobInfo__content-tab">
              <div
                dangerouslySetInnerHTML={{
                  __html: jobData.benefit || "",
                }}
                className="JobInfo__html"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobInfo;
