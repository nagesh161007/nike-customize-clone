import React, { useState, useEffect } from "react";
import "./Carousel.css";
import LeftArrow from "../Carousel/LeftArrow";
import RightArrow from "../Carousel/RightArrow";

function Carousel({ children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div className="carousel-container">
      <div className="arrows">
        <div className="arrow" onClick={prev}>
          <LeftArrow></LeftArrow>
        </div>
        <div className="arrow" onClick={next}>
          <RightArrow></RightArrow>
        </div>
      </div>
      <div className="carousel-wrapper">
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
