import React from "react";
import defaultIcon from "Assets/Icons/suitcase.png";

const IconCircle = ({ name, style = {}, size = 36, backgroundColor = "#e5e5e5" }) => {
  let _icon = false;
  try {
    _icon = require(`Assets/Icons/${name}.png`);
  } catch (error) {}
  let _src = name && _icon ? _icon : defaultIcon;

  return (
    <div
      style={{
        ...style,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size / 2}px`,
        display: "flex",
        backgroundColor: backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <img src={_src} alt="" style={{ width: "60%", height: "60%" }} />
    </div>
  );
};

export default IconCircle;
