import "./assets/styles/general.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import * as THREE from "three";

export function initScene(canvasRef) {
  // Crea la scena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef, alpha: true });
  renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);
  const homeContainer = document.getElementById("home");
  homeContainer.appendChild(renderer.domElement);

  // Crea un TorusKnot
  const geometry = new THREE.TorusKnotGeometry(20, 0.1, 33, 20, 18, 20);
  //   const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4f6f9,
    metalness: 1, // Valore da 0 a 1
    roughness: 1, // Valore da 0 a 1
    clearcoat: 1, // Effetto di trasparenza (0 = nessun effetto, 1 = massimo effetto)
    clearcoatRoughness: 0.1, // Rudezza del clearcoat
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.position.x = -5; // Sposta a sinistra (valore negativo)
  scene.add(torusKnot);

  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5).normalize();
  scene.add(light);

  // Posiziona la camera
  camera.position.z = 10;

  // Funzione di animazione
  const animate = () => {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.001;
    renderer.render(scene, camera);
  };

  animate();

  // Gestione del resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

createApp(App).use(router).mount("#app");
