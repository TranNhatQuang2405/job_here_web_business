import React from "react";
import _ from "underscore";
import JobItem from "../JobItem/JobItem";
import "./JobList.css";

const JobList = ({ data = [] }) => {
  return (
    <div className="JobList__container">
      {_.map(data, (item) => {
        return <JobItem key={item.jobId} jobData={item} />;
      })}
    </div>
  );
};

export default JobList;
