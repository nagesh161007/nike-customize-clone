import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gui from '../../utils/cameraUtils/debug';
import { setupControls } from '../../utils/cameraUtils/controls';
import { setUpRenderer } from '../../utils/cameraUtils/renderer';
import { setupLights } from '../../utils/cameraUtils/light';
import { setUpCamera } from '../../utils/cameraUtils/camera';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { excludedMesh } from '../../utils/cameraUtils//model';
import Customizer from '../Customizer/Customizer';
import Switcher from '../Switcher/Switcher';
import './Playground.css';
import shoeColorConfigs from '../Customizer/ShoeConfig';

function getLoader() {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.1/');
  loader.setDRACOLoader(dracoLoader);
  return loader;
}

function addShadow(modelRef, sceneRef) {
  const shadowPlane = modelRef.current.getObjectByName('shadow_plane');
  const simpleShadow = textureLoader.load(
    '/images/nike-low-top/ground_shadow.png',
    () => {
      console.log('success');
    },
    undefined,
    () => {
      console.error('error');
    },
  );
  sceneRef.current.remove(shadowPlane);
  const material = new THREE.MeshBasicMaterial({ map: simpleShadow });
  shadowPlane.material = material;
  shadowPlane.visible = true;
}

function removeObjects(modelRef) {
  const unnecessaryGroups = [
    'lf_pid_grp',
    'rt_pid_grp',
    'lf_lateral_pid',
    'rt_lateral_pid',
    'lf_heel_stay_pid',
    'rt_heel_stay_pid',
  ];
  unnecessaryGroups &&
    unnecessaryGroups.forEach((group) => {
      if (modelRef.getObjectByName(group)) {
        modelRef.getObjectByName(group).visible = false;
      }
    });
}
const debugObject = {};

const textureLoader = new THREE.TextureLoader();

function Playground() {
  const [loading, setLoading] = useState(true);
  const [selectedShoeIndex, setSelectedShoeIndex] = useState(0);
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

    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(gltf.scene);

    gui.add(model.rotation, 'y', -Math.PI, Math.PI, 0.001).name('rotation');

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMapIntensity = debugObject.envMapIntensity;
        child.castShadow = true;
        child.receiveShadow = true;
        if (excludedMesh[child.name]) {
          child.material.color.set(0xffffff);
          return;
        }
      }
    });

    removeObjects(modelRef.current);
    model.position.x = 1.4;
    model.position.y = 0;
    addShadow(modelRef, sceneRef);
  };

  function selectShoe(index) {
    console.log(index);
    setLoading(true);
    const currentModel = modelRef.current;
    if (currentModel) {
      sceneRef.current.remove(currentModel);
    }

    const selectedShoeConfig = shoeColorConfigs[index];
    const loader = getLoader();

    loader.load(selectedShoeConfig.modelUrl, (gltf) => {
      setLoading(false);
      handleLoad(gltf, sceneRef.current, false);
    });

    setSelectedShoeIndex(index);
  }

  useEffect(() => {
    const scene = new THREE.Scene();

    sceneRef.current = scene;

    const loader = getLoader();

    loader.load(shoeColorConfigs[selectedShoeIndex].modelUrl, (gltf) => {
      setLoading(false);
      handleLoad(gltf, scene);
    });

    cameraRef.current = setUpCamera(canvasRef);
    setupLights(scene);
    rendererRef.current = setUpRenderer(canvasRef);
    controlsRef.current = setupControls(cameraRef.current, canvasRef);
    const pmremGenerator = new THREE.PMREMGenerator(rendererRef.current);

    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 1).texture;

    const environmentMap = new THREE.CubeTextureLoader().load([
      '/texture/environmentMaps/nx.jpg',
      '/texture/environmentMaps/ny.jpg',
      '/texture/environmentMaps/nz.jpg',
      '/texture/environmentMaps/px.jpg',
      '/texture/environmentMaps/py.jpg',
      '/texture/environmentMaps/pz.jpg',
    ]);

    environmentMap.encoding = THREE.sRGBEncoding;

    scene.background = new THREE.Color(0xf6f6f6);
    scene.environment = environmentMap;

    debugObject.envMapIntensity = 5;

    window.addEventListener('resize', () => {
      resize(rendererRef, cameraRef);
    });

    animate();
  }, [animate]);

  function resize(renderer, cameraRef) {
    // Update camera
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();

    // Update renderer
    renderer.current.setSize(window.innerWidth, window.innerHeight - 200);
    renderer.current.setPixelRatio(2);
  }

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>{shoeColorConfigs[selectedShoeIndex].name}</div>
      </div>
      <canvas ref={canvasRef} className='webgl'></canvas>
      <Switcher selectedShoeIndex={selectedShoeIndex} selectShoe={selectShoe} />
      {loading && <div className='loader'></div>}
      <Customizer
        selectedShoeIndex={selectedShoeIndex}
        modelRef={modelRef}
        cameraRef={cameraRef}
        controlsRef={controlsRef}
        canvasRef={canvasRef}
        rendererRef={rendererRef}
      ></Customizer>
    </div>
  );
}

export default Playground;
