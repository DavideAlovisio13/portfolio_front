import "./assets/styles/general.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import getStarfield from "./getStarfield.js";
import { getFresnelMat } from "./getFresnelMat.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
THREE.ColorManagement.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.toneMappingExposure = 1.2; // Aumenta l'esposizione per una scena più luminosa

// Gruppo per la Terra
const earthGroup = new THREE.Group();
earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
scene.add(earthGroup);

// Controlli orbitali
new OrbitControls(camera, renderer.domElement);

const detail = 12;
const loader = new THREE.TextureLoader();

// Geometria e materiale del pianeta
const geometry = new THREE.IcosahedronGeometry(1, detail);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("/textures/01_earthdiff1k.jpg"),
  specularMap: loader.load("/textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("/textures/01_earthbump1k.jpg"),
  bumpScale: 0.1, // Maggiore rilievo
  shininess: 15, // Lucentezza aumentata
});
material.map.colorSpace = THREE.SRGBColorSpace;
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Luci del pianeta
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("/textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

// Luce ambientale
const ambientLight = new THREE.AmbientLight(0x404040, 2.5); // Intensità aumentata
scene.add(ambientLight);

// Nuvole
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("/textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("/textures/05_earthcloudmaptrans.jpg"),
  alphaTest: 0.3,
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

// Glow atmosferico
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// Campo stellare
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Luce direzionale (Sole)
const sunLight = new THREE.DirectionalLight(0xffffff, 3); // Intensità aumentata
sunLight.position.set(10, 1.5, 1 );
scene.add(sunLight);

// Helper per la luce direzionale (opzionale, solo per debug)
const lightHelper = new THREE.DirectionalLightHelper(sunLight, 2);
scene.add(lightHelper);

// Animazione
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudsMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  stars.rotation.y -= 0.0002;
  renderer.render(scene, camera);
}

animate();

// Gestione del resize della finestra
function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleWindowResize, false);

// Monta l'app Vue
createApp(App).use(router).mount("#app");
