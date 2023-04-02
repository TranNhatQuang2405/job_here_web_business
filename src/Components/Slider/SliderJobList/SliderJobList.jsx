import React from "react";
import _ from "underscore";
import "./SliderJobList.css";
import { JobListSmall } from "Components/Job";
import Slider from "react-slick";

const SliderJobList = ({ data = [] }) => {
  let testData = [];
  for (let i = 0; i < 40; i++) {
    testData.push(i);
  }

  let chunkSize = 18;
  let jobData = [];
  for (let i = 0; i < testData.length; i += chunkSize) {
    const chunk = testData.slice(i, i + chunkSize);
    jobData.push(chunk);
  }

  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="SliderJobList__container pb-4">
      <Slider {...settings}>
        {_.map(jobData, (item, index) => {
          return <JobListSmall key={index} data={item} />;
        })}
      </Slider>
    </div>
  );
};

export default SliderJobList;
