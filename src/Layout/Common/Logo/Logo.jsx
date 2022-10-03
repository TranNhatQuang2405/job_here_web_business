import React from "react";
import logo from "Assets/Images/logo_no_text.png";
import logo_title_dark from "Assets/Images/title_dark.png";
import logo_title_light from "Assets/Images/title_light.png";
import "./Logo.css";

const Logo = ({ isDark = false }) => {
  return (
    <div className="Logo__layout">
      <img alt="Job Here" src={logo} className="Logo__image1" />
      <img
        src={isDark ? logo_title_dark : logo_title_light}
        alt="Job Here"
        height="24"
      />
    </div>
  );
};

export default Logo;
