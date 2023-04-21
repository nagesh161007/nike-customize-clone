import React, { useState } from "react";
import "./Customizer.css";
import ColorPalette from "../ColorPalette/ColorPalette";
import colorConfig from "./ColorConFig";
import Carousel from "../Carousel/Carousel";
import * as THREE from "three";
import gsap from "gsap";
import { fetchColorPalette } from "../../ApiUtils/api";
import { generateConfig } from "../Customizer/buildColorConfig";

const Customizer = (props) => {
  const { modelRef, controlsRef } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [description, setDescription] = useState("");
  const [generatedColorConfig, setGeneratedColorConfig] = useState([]);

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function generateColorPalette() {
    if (!description) {
      return;
    }
    const requestBody = {
      description: description,
      type: "DESCRIPTION",
      count: 8,
    };
    const response = await fetchColorPalette(requestBody);
    setGeneratedColorConfig(generateConfig(response.data.colors));
  }

  function applyColorPalette() {
    console.log("applying color to shoes");
  }

  function changeColor(color, types) {
    types.forEach((type) => {
      modelRef.current.getObjectByName(type).material = modelRef.current
        .getObjectByName(type)
        .material.clone();

      gsap.to(modelRef.current.getObjectByName(type).material.color, {
        r: new THREE.Color(color).r,
        g: new THREE.Color(color).g,
        b: new THREE.Color(color).b,
        duration: 0.3,
      });
    });
  }

  function blinkAnimation(type) {
    modelRef.current.getObjectByName(type).material = modelRef.current
      .getObjectByName(type)
      .material.clone();
    var mesh = modelRef.current.getObjectByName(type);

    if (!mesh) {
      return;
    }

    // create a GSAP animation for the color transition
    var colorTween = gsap.to(mesh.material, {
      envMapIntensity: 20,
      duration: 0.3,
      onComplete: function () {
        console.log("completing animation");
        // create another GSAP animation to transition back to the old color
        var oldColorTween = gsap.to(mesh.material, {
          envMapIntensity: 3,
          duration: 0.3,
        });
        oldColorTween.play();
      },
    });

    // start the color animation
    colorTween.play();
  }

  const onChange = (index) => {
    setSelectedIndex(index);
    const position = colorConfig[index].modelPosition;
    gsap.to(controlsRef.current.object.position, {
      ...position,
      duration: 1,
      ease: "power3.inOut",
    });
    colorConfig[index].type.forEach((type) => {
      blinkAnimation(type);
    });
  };

  const currentColorConfig = generatedColorConfig.length
    ? generatedColorConfig
    : colorConfig;

  return (
    <div className="color-customizer">
      <div className="color-generator">
        <input
          placeholder="Describe the theme or mood you want your color palette ..."
          type="text"
          className="description-input"
          value={description}
          onChange={handleDescriptionChange}
        ></input>
        <div className="button-container">
          <button
            className="generate-button"
            disabled={description.trim() ? false : true}
            onClick={generateColorPalette}
          >
            Generate
          </button>
          <button
            className="apply-button"
            disabled={currentColorConfig.length ? false : true}
            onClick={applyColorPalette}
          >
            Apply
          </button>
        </div>
      </div>
      <div className="color-customizer-tab">
        <Carousel onChange={onChange}>
          {currentColorConfig.map((config) => {
            return (
              <ColorPalette
                indexString={`${selectedIndex + 1}/${
                  currentColorConfig.length
                }`}
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
