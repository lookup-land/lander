// © Agni Ilango
// SPDX-License-Identifier: MPL-2.0 AND CC-BY-4.0

import {
  AmbientLight,
  Mesh,
  OrthographicCamera,
  PCFSoftShadowMap,
  RGBAFormat,
  SRGBColorSpace,
  Scene,
  SpotLight,
  WebGLRenderTarget,
  WebGLRenderer,
} from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const renderScene = async (canvas: HTMLCanvasElement) => {
  const modelBinary = (await import("~/assets/models/irl-web.glb")).default;

  let width = window.innerWidth;
  let height = window.innerHeight - 238;
  let aspectRatio = width / height;

  const renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const target = new WebGLRenderTarget(width, height, {
    format: RGBAFormat,
    colorSpace: SRGBColorSpace,
  });
  target.samples = 8;

  const scene = new Scene();

  const cameraScale = 2;
  const camera = new OrthographicCamera(
    -cameraScale * aspectRatio,
    cameraScale * aspectRatio,
    cameraScale,
    -cameraScale,
    1,
    1000
  );
  camera.position.set(-5, 15, 20); // all components equal
  camera.lookAt(scene.position);

  const spotLight = new SpotLight(0xf5edc6, 250, 10000, Math.PI / 6);
  spotLight.position.set(0, 10, 0);
  spotLight.lookAt(0, 0, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const ambientLight = new AmbientLight(0xffffff, 2.5);
  scene.add(ambientLight);

  const modelLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
  );
  modelLoader.setDRACOLoader(dracoLoader);
  dracoLoader.preload();

  const modelGLTF = await modelLoader.loadAsync(modelBinary);
  const model = modelGLTF.scene;
  model.traverse((node) => {
    if (node instanceof Mesh) {
      node.receiveShadow = true;
      node.castShadow = true;
    }
  });
  model.position.setX(0.1);
  model.rotateY(-Math.PI / 3);

  scene.add(model);

  resize();
  render();

  window.addEventListener("resize", resize);

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight - 238;

    aspectRatio = width / height;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.left = -cameraScale * aspectRatio;
    camera.right = cameraScale * aspectRatio;
    camera.updateProjectionMatrix();

    const scale = width < 1000 ? Math.min((width / 1000) * 1.5, 1) : 1;
    model.scale.set(scale, scale, scale);
  }

  function render() {
    requestAnimationFrame(render);

    const cameraWobbleAmplitude = 1;
    const time = Date.now() * 0.0005;
    camera.position.x = Math.sin(time) * cameraWobbleAmplitude;
    camera.position.y = 15 + Math.cos(time);

    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }
};
