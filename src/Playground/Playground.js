import React, { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import gui from "../Utils/debug";
import { sizes } from "../Constants/modelConstants";
import { setupControls } from "../Utils/controls";
import { setUpRenderer } from "../Utils/renderer";
import { setupLights } from "../Utils/light";
import { setUpCamera } from "../Utils/camera";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RoomEnvironment } from "../addon/RoomEnvironment";
import { excludedMesh } from "../Utils/model";
import Customizer from "../components/Customizer/Customizer";
import "./Playground.css";

function removeObjects(modelRef) {
  const unnecessaryGroups = ["lf_pid_grp", "rt_pid_grp"];
  unnecessaryGroups.forEach((group) => {
    modelRef.getObjectByName(group).visible = false;
  });
}
const debugObject = {};

const textureLoader = new THREE.TextureLoader();

function Playground() {
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  const animate = useCallback(() => {
    controlsRef.current.update();
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    requestAnimationFrame(animate);
  }, []);

  const handleLoad = (gltf, scene) => {
    const model = gltf.scene;
    modelRef.current = model;
    const shadowPlane = model.getObjectByName("shadow_plane");

    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(gltf.scene);

    gui.add(model.rotation, "y", -Math.PI, Math.PI, 0.001).name("rotation");

    scene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material.envMapIntensity = debugObject.envMapIntensity;
        child.castShadow = true;
        child.receiveShadow = true;
        if (excludedMesh[child.name]) {
          child.material.color.set(0xffffff);
          return;
        } else {
        }
      }
    });

    removeObjects(modelRef.current);

    const simpleShadow = textureLoader.load(
      "https://api.nike.com/customization/model_assets/v1/2c820251-5a2d-412f-be7a-4a4324b35627/1629231230072/ground_shadow.png",
      () => {
        console.log("success");
      },
      undefined,
      () => {
        console.error("error");
      }
    );

    const material = new THREE.MeshBasicMaterial({ map: simpleShadow });
    shadowPlane.material = material;
    shadowPlane.visible = true;
    model.position.x = 1.4;
    model.position.y = 0;
  };

  useEffect(() => {
    const scene = new THREE.Scene();

    sceneRef.current = scene;
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderConfig({ type: "wasm" });
    dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.4.1/"
    );
    loader.setDRACOLoader(dracoLoader);

    loader.load("/model/nike-model.gltf", (gltf) => {
      handleLoad(gltf, scene);
    });

    cameraRef.current = setUpCamera(canvasRef);
    window.camera = cameraRef.current;
    setupLights(scene);
    rendererRef.current = setUpRenderer(canvasRef);
    controlsRef.current = setupControls(cameraRef.current, canvasRef);
    const pmremGenerator = new THREE.PMREMGenerator(rendererRef.current);

    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      1
    ).texture;

    const environmentMap = new THREE.CubeTextureLoader().load([
      "/texture/environmentMaps/0/nx.jpg",
      "/texture/environmentMaps/0/ny.jpg",
      "/texture/environmentMaps/0/nz.jpg",
      "/texture/environmentMaps/0/px.jpg",
      "/texture/environmentMaps/0/py.jpg",
      "/texture/environmentMaps/0/pz.jpg",
    ]);

    environmentMap.encoding = THREE.sRGBEncoding;

    scene.background = new THREE.Color(0xf6f6f6);
    scene.environment = environmentMap;

    debugObject.envMapIntensity = 3;

    window.addEventListener("resize", () => {
      resize(rendererRef, cameraRef);
    });

    animate();
  }, [animate]);

  function resize(renderer, cameraRef) {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    cameraRef.current.aspect = sizes.width / sizes.height;
    cameraRef.current.updateProjectionMatrix();

    // Update renderer
    renderer.current.setSize(sizes.width, sizes.height - 200);
    renderer.current.setPixelRatio(2);
  }

  return (
    <div className="app">
      <div className="header">
        <div className="title">
          Converse Custom Chuck Taylor All Star Low Top
        </div>
        <div>
          <a
            href={"https://github.com/nagesh161007/nike-customize-clone"}
            target="_blank"
            rel="noreferrer"
          >
            <img
              height={24}
              width={24}
              src={"/logo/github-mark.svg"}
              alt={"git-logo"}
              className="logo"
              onClick={() => {}}
            ></img>
          </a>
          <a
            href={"https://www.linkedin.com/in/nageshwara-sairam/"}
            target="_blank"
            rel="noreferrer"
          >
            <img
              height={24}
              width={24}
              src={"/logo/linkedin.svg"}
              alt={"git-logo"}
              className="logo"
              onClick={() => {}}
            ></img>
          </a>
        </div>
      </div>
      <canvas ref={canvasRef} className="webgl"></canvas>
      <Customizer
        modelRef={modelRef}
        cameraRef={cameraRef}
        controlsRef={controlsRef}
      ></Customizer>
    </div>
  );
}

export default Playground;
