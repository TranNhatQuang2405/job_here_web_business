import React from "react";
import JobItem from "../JobItem/JobItem";
import "./JobList.css";

const JobList = () => {
  return (
    <div className="JobList__container list-job">
      <div className="JobList__header">
        <span>
          Tìm thấy <b className="JobList__text-highlight">136</b> việc làm phù
          hợp với yêu cầu của bạn.
        </span>
      </div>

      <div className="JobList__job-body row">
        <div className="lists">
          <JobItem id={1} />
          <JobItem id={1} />
          <JobItem id={1} />
        </div>
        <div className="text-center">
          <nav>
            <ul className="JobList__pagination pagination">
              <li
                className="disabled"
                aria-disabled="true"
                aria-label="« Previous"
              >
                <span aria-hidden="true">{"<"}</span>
              </li>
              <li className="JobList__pagination-active" aria-current="page">
                <span>1</span>
              </li>
              <li>
                <a href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=2">
                  2
                </a>
              </li>
              <li>
                <a href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=3">
                  3
                </a>
              </li>
              <li>
                <a href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=4">
                  4
                </a>
              </li>
              <li>
                <a href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=5">
                  5
                </a>
              </li>
              <li>
                <a href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=6">
                  6
                </a>
              </li>
              <li>
                <a
                  href="https://www.topcv.vn/tim-viec-lam-buu-chinh-vien-thong-tai-ho-chi-minh-l2c10005?salary=0&amp;exp=0&amp;sort=top_related&amp;page=2"
                  rel="next"
                  aria-label="Next »"
                >
                  {">"}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default JobList;
