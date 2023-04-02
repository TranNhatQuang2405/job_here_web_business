import React from "react";
import company_default_img from "Assets/Images/company_default_img.jpg";

const CompanyLogo = ({ children, src, alt = "", style = {}, size = 44, className = "" }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        border: "1px solid var(--jh-primary-border-color)",
        borderRadius: `${size / 8}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "var(--jh-white-background)",
      }}
    >
      <img src={src || company_default_img} alt={alt} className="img-fluid" />
      <div>
        {children}
      </div>
    </div>
  );
};

export default CompanyLogo;
