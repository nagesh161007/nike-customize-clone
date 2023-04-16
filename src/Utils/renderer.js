import * as THREE from "three";
import gui from "./debug";
import { sizes } from "../Constants/modelConstants";

export function setUpRenderer(canvasRef) {
  // create a Three.js renderer

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvasRef.current,
  });

  renderer.setSize(window.innerWidth, sizes.height - 250);
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 1.5;
  renderer.setSize(window.innerWidth, sizes.height - 250);
  renderer.setPixelRatio(2);

  gui.add(renderer, "toneMapping", {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  });
  gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);
  return renderer;
}
