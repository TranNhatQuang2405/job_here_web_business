import React from "react";
import "./JobCompanyInfo.css";
import { JobItem } from "Components/Job";
import { IconCircle } from "Components/Icon";

const JobCompanyInfo = () => {
  return (
    <div className="JobCompanyInfo__container jh-box-item">
      <div className="JobCompanyInfo__box-title">
        <h2 className="box-name">Thông tin Công Ty TNHH Giáo Dục Quốc Tế MasterKid</h2>
        <a
          href="https://www.topcv.vn/cong-ty/cong-ty-tnhh-giao-duc-quoc-te-masterkid/39472.html"
          target="_blank"
          rel="noreferrer"
        >
          Xem trang công ty <i className="bi bi-arrow-up-right" />
        </a>
      </div>
      <div className="JobCompanyInfo__box-info">
        <div className="JobCompanyInfo__box-item">
          <IconCircle name={"home"} style={{ marginRight: "16px", marginTop: "5px" }} />
          <div>
            <p className="JobCompanyInfo__box-item-title">Giới thiệu</p>
            <span className="JobCompanyInfo__box-item-content">
              <p>
                Hệ thống đào tạo mỹ thuật thiếu nhi TopArt là một trong những thương hiệu
                hàng đầu trong ngành giáo dục mỹ thuật ứng dụng tại Việt Nam, với chương
                trình đào tạo dành cho các học viên từ 3,5 đến 16 tuổi dựa trên nền tảng
                Giáo dục Quốc tế Singapore. Với mong muốn mọi trẻ em đều được phát triển
                tính cách tốt cùng lối suy nghĩ logic vấn đề, tư duy sáng tạo thông qua
                học Vẽ.
              </p>
            </span>
          </div>
        </div>
        <div className="JobCompanyInfo__box-item">
          <IconCircle name={"group2"} style={{ marginRight: "16px", marginTop: "5px" }} />
          <div>
            <p className="JobCompanyInfo__box-item-title">Quy mô</p>
            <span className="JobCompanyInfo__box-item-content">25-99 nhân viên</span>
          </div>
        </div>
        <div className="JobCompanyInfo__box-item">
          <IconCircle name={"map"} style={{ marginRight: "16px", marginTop: "5px" }} />
          <div>
            <p className="JobCompanyInfo__box-item-title">Địa điểm</p>
            <span className="JobCompanyInfo__box-item-content">
              31 Lê Văn Thiêm, Phường Tân Phong, Quận 7, TP HCM
            </span>
          </div>
        </div>
      </div>
      <div className="JobCompanyInfo__box-job-company mt-2">
        <div className="JobCompanyInfo__box-title">
          <h6 className="box-name">
            <i className="bi bi-briefcase-fill" /> Việc làm cùng công ty
          </h6>
          <a
            href="https://www.topcv.vn/cong-ty/cong-ty-tnhh-giao-duc-quoc-te-masterkid/39472.html"
            target="_blank"
            rel="noreferrer"
          >
            Xem nhiều hơn <i className="bi bi-arrow-up-right" />
          </a>
        </div>
        <div className="JobCompanyInfo__job-company-list transition  w-30 ">
          <JobItem />
          <JobItem />
        </div>
      </div>
    </div>
  );
};

export default JobCompanyInfo;
