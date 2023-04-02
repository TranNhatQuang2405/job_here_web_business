import React from "react";
import Slider from "react-slick";
import _ from "underscore";
import "./SliderKeyword.css";

const SliderKeyword = ({ data = [] }) => {
  const settings = {
    infinite: false,
    slidesToShow: 1,
    swipeToSlide: true,
    variableWidth: true,
  };

  return (
    <div className="SliderKeyword__container px-3 w-100">
      <Slider {...settings} className="sliderKeyword__bound">
        {_.map(data, (item, index) => {
          return (
            <div
              key={index}
              className={
                item.isActive
                  ? "SliderKeyword__item-location active"
                  : "SliderKeyword__item-location"
              }
            >
              {item.city}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SliderKeyword;
