"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageSlider.css";

export default function ImageSlider({ images }) {
  var settings = {
    infinte: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    accessibility: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div>
      <Slider {...settings}>
        {images.map((image) => (
          <img
            src={image}
            alt={image}
            key={image}
            className="object-cover rounded-[5px] md:rounded-[8px] h-[320px]"
          />
        ))}
      </Slider>
    </div>
  );
}
