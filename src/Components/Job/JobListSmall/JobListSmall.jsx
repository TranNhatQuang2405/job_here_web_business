import React from "react";
import "./JobListSmall.css";
import _ from "underscore";
import { JobItemSmall } from "Components/Job";
import { Row } from "react-bootstrap";

const JobListSmall = ({ data = [] }) => {
  return (
    <div className="jh-container JobListSmall__bound">
      <Row>
        {_.map(data, (item) => {
          return <JobItemSmall key={item.jobId} jobData={item} />;
        })}
      </Row>
    </div>
  );
};

export default JobListSmall;
