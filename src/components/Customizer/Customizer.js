import React, { useCallback, useState } from "react";
import "./Customizer.css";
import ColorPalette from "../ColorPalette/ColorPalette";
import colorConfig from "./ColorConFig";
import Carousel from "../Carousel/Carousel";
import * as THREE from "three";
import gsap from "gsap";
import { fetchColorPalette } from "../../ApiUtils/api";
import { generateConfig } from "../Customizer/buildColorConfig";
import { getRandomColor } from "./colorUtils";
const Customizer = (props) => {
  const { modelRef, controlsRef, rendererRef } = props;
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

  const applyColorPalette = useCallback(() => {
    const configToUse = generatedColorConfig.length
      ? generatedColorConfig
      : colorConfig;

    configToUse.forEach((config) => {
      const colorToApply = getRandomColor(config.colors);
      config.types.forEach((type) => {
        modelRef.current.getObjectByName(type).material = modelRef.current
          .getObjectByName(type)
          .material.clone();

        gsap.to(modelRef.current.getObjectByName(type).material.color, {
          r: new THREE.Color(colorToApply).r,
          g: new THREE.Color(colorToApply).g,
          b: new THREE.Color(colorToApply).b,
          duration: 0.1,
        });
      });
    });
  }, [modelRef, generatedColorConfig]);

  const rotateModel = useCallback(() => {
    gsap.to(modelRef.current.rotation, {
      y: Math.PI * 2,
      duration: 0.8,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.to(modelRef.current.rotation, {
          y: 0,
          duration: 0,
        });
        applyColorPalette();
      },
    });
  }, [modelRef, applyColorPalette]);

  const blinkAnimation = useCallback(
    (type) => {
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
        duration: 0.5,
        onComplete: function () {
          // create another GSAP animation to transition back to the old color
          var oldColorTween = gsap.to(mesh.material, {
            envMapIntensity: 3,
            duration: 0.5,
          });
          oldColorTween.play();
        },
      });

      colorTween.play();
    },
    [modelRef]
  );
  const onChange = useCallback(
    (index) => {
      setSelectedIndex(index);
      const position = colorConfig[index].modelPosition;
      gsap.to(controlsRef.current.object.position, {
        ...position,
        duration: 1,
        ease: "power3.inOut",
      });
      colorConfig[index].types.forEach((type) => {
        blinkAnimation(type);
      });
    },
    [blinkAnimation, controlsRef]
  );

  const reset = useCallback(() => {
    const configToUse = generatedColorConfig.length
      ? generatedColorConfig
      : colorConfig;

    configToUse.forEach((config) => {
      config.types.forEach((type) => {
        modelRef.current.getObjectByName(type).material = modelRef.current
          .getObjectByName(type)
          .material.clone();

        gsap.to(modelRef.current.getObjectByName(type).material.color, {
          r: new THREE.Color(0xf6f6f6).r,
          g: new THREE.Color(0xf6f6f6).g,
          b: new THREE.Color(0xf6f6f6).b,
          duration: 0.1,
        });
      });
    });
    const position = colorConfig[2].modelPosition;
    gsap.to(controlsRef.current.object.position, {
      ...position,
      duration: 1,
      ease: "power3.inOut",
    });
  }, [generatedColorConfig, modelRef, controlsRef]);

  function download() {
    const shadowPlane = modelRef.current.getObjectByName("shadow_plane");
    shadowPlane.visible = false;
    shadowPlane.material.visible = false;

    setTimeout(() => {
      const imageData = rendererRef.current.domElement.toDataURL();
      const image = new Image();
      image.src = imageData;
      image.addEventListener("load", () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "nike-customizable.png";
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        shadowPlane.visible = true;
        shadowPlane.material.visible = true;
      });
    }, 100);
  }

  const currentColorConfig = generatedColorConfig.length
    ? generatedColorConfig
    : colorConfig;

  return (
    <div className="color-customizer">
      <div className="color-generator">
        <input
          placeholder="Describe theme for color"
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
            onClick={reset}
          >
            <img
              height={16}
              width={16}
              src="/logo/reload.svg"
              alt="reload"
            ></img>
          </button>
          <button className="apply-button" onClick={rotateModel}>
            <img
              className="apply-colors"
              src="/logo/magic.png"
              alt="magic"
              width={24}
              height={24}
            ></img>
          </button>
          <button className="apply-button" onClick={download}>
            <img
              className="apply-colors"
              src="/logo/download.svg"
              alt="magic"
              width={24}
              height={24}
            ></img>
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
