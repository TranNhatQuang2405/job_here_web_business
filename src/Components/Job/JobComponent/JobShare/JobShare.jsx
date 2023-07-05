import React from "react";
import "./JobShare.css";
import { IconSquare } from "Components/Icon";
import { useTranslation } from "react-i18next";

const JobShare = ({ path = "", company = false }) => {
  const { t } = useTranslation();
  const host = "https://jobhere.tech";
  let url = host + path;

  const copyURLToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="JobShare__container jh-box-item">
      <h3>{company ? t("Share company") : t("Share job")}</h3>
      <p>{t("Copy link")}</p>
      <div className="JobShare__box-copy">
        <div className="JobShare__url-copy">{url}</div>
        <div className="JobShare__btn-copy">
          <button className="" onClick={copyURLToClipboard}>
            <i className="bi bi-clipboard-check" />
          </button>
        </div>
      </div>
      <p>{t("Share by social media")}</p>
      <div className="JobShare__box-share d-flex">
        <a
          href={`http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"facebook"} style={{ marginRight: "20px" }} />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"twitter"} style={{ marginRight: "20px" }} />
        </a>
        <a
          href={`https://www.linkedin.com/cws/share?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <IconSquare name={"linkedin"} style={{ marginRight: "20px" }} />
        </a>
      </div>
    </div>
  );
};

export default JobShare;
