import React, { useState } from "react";
import "./Customizer.css";
import ColorPalette from "../ColorPalette/ColorPalette";
import ColorConfig from "./ColorConFig";
import Carousel from "../Carousel/Carousel";
import * as THREE from "three";
import gsap from "gsap";
import colorscustomiser from "./ColorConFig";

const Customizer = (props) => {
  const { modelRef, controlsRef } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);

  function changeColor(color, types, position) {
    types.forEach((type) => {
      modelRef.current.getObjectByName(type).material = modelRef.current
        .getObjectByName(type)
        .material.clone();

      modelRef.current.getObjectByName(type).material.color = new THREE.Color(
        new THREE.Color(color)
      );
    });
    window.modelRef = modelRef;
    window.controlsRef = controlsRef;

    gsap.to(controlsRef.current.object.position, {
      ...position,
      duration: 1,
      ease: "power3.inOut",
    });
  }

  const onChange = (index) => {
    setSelectedIndex(index);
    const position = colorscustomiser[index].modelPosition;
    gsap.to(controlsRef.current.object.position, {
      ...position,
      duration: 1,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="color-customizer">
      <div className="color-customizer-tab">
        <Carousel onChange={onChange}>
          {ColorConfig.map((config) => {
            return (
              <ColorPalette
                indexString={`${selectedIndex + 1}/${ColorConfig.length}`}
                config={config}
                changeColor={changeColor}
              ></ColorPalette>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default Customizer;
