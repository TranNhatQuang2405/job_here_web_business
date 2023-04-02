import React from "react";
import _ from "underscore";
import "./TagList.css";
import { Link } from "react-router-dom";

const TagList = ({ tagData = [] }) => {
  return (
    <div className="TagList__container">
      {_.map(tagData, (item, index) => {
        if (!item.label) return null;
        return (
          <div key={index} className="TagList__item">
            <Link
              to={item?.link ?? ""}
              className={item.link ? "" : "TagList__item-no-link"}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default TagList;
