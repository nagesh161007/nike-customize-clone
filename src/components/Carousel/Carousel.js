import React, { useState, useEffect } from 'react';
import './Carousel.css';
import LeftArrow from '../Carousel/LeftArrow';
import RightArrow from '../Carousel/RightArrow';

function Carousel({ children, onChange, selectedIndex }) {
  const [length, setLength] = useState(children.length);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (selectedIndex < length - 1) {
      onChange(selectedIndex + 1);
    }
  };

  const prev = () => {
    if (selectedIndex > 0) {
      onChange(selectedIndex - 1);
    }
  };

  return (
    <div className='carousel-container'>
      <div className='arrows'>
        <div className={`arrow ${selectedIndex <= 0 ? 'disable' : ''} `} onClick={prev}>
          <LeftArrow></LeftArrow>
        </div>
        <div className={`arrow ${selectedIndex >= length - 1 ? 'disable' : ''} "" `} onClick={next}>
          <RightArrow></RightArrow>
        </div>
      </div>
      <div className='carousel-wrapper'>
        <div className='carousel-content-wrapper'>
          <div
            className='carousel-content'
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
