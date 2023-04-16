import React, { useEffect } from "react";
import "./Customizer.css";
import ColorPalette from "../ColorPalette/ColorPalette";
import ColorConfig from "./ColorConFig";
import Carousel from "../Carousel/Carousel";
import * as THREE from "three";

const Customizer = (props) => {
  const { modelRef } = props;

  function changeColor(color, types) {
    types.forEach((type) => {
      modelRef.current.getObjectByName(type).material = modelRef.current
        .getObjectByName(type)
        .material.clone();

      modelRef.current.getObjectByName(type).material.color = new THREE.Color(
        new THREE.Color(color)
      );
    });
  }

  useEffect(() => {}, []);
  return (
    <div className="color-customizer">
      <div className="color-customizer-tab">
        <Carousel>
          {ColorConfig.map((config) => {
            return (
              <ColorPalette
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
