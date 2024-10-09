import "./assets/styles/general.scss";

import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function initScene(canvasRef) {
  // Crea la scena
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef, antialias: true, alpha: true });
  renderer.setSize(canvasRef.clientWidth, canvasRef.clientHeight);

  const homeContainer = document.getElementById("home");
  homeContainer.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = -1; // Distanza minima dalla scena
  controls.maxDistance = 1; // Distanza massima dalla scena
  controls.minPolarAngle = 0; // Limite minimo
  controls.maxPolarAngle = Math.PI / 2; // Limite massimo
  controls.enableDamping = true;
  controls.dampingFactor = 0.25; // Fattore di damping

  // // Crea un TorusKnot
  // const geometry = new THREE.TorusKnotGeometry(20, 0.1, 33, 20, 18, 20);
  // //   const material = new THREE.MeshBasicMaterial({ color: 0xff6347 });
  // const material = new THREE.MeshPhongMaterial({
  //   color: 0xf4f6f9,
  //   shininess: 100,
  // });
  // const torusKnot = new THREE.Mesh(geometry, material);
  // torusKnot.position.x = -5; // Sposta a sinistra (valore negativo)
  // scene.add(torusKnot);
  let mixer;
  let clock = new THREE.Clock(); // Usato per tenere traccia del tempo
  const loader = new GLTFLoader().setPath("/models/nano_wiggler/");

  loader.load("scene.gltf", (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(2, 2, 2);

    // Cambia il colore del materiale
    model.traverse((child) => {
      if (child.isMesh) {
        // Cambia il colore del materiale
        child.material.color.set(0x142f3d); // Rosso, ad esempio
      }
    });
    scene.add(model);
    // Inizializza l'AnimationMixer
    mixer = new THREE.AnimationMixer(model);

    // Aggiungi tutte le animazioni del modello al mixer
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play(); // Riproduci ogni animazione
    });
  });

  //helper
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  // Crea una luce ambientale
  const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Colore bianco e intensità 0.5
  scene.add(ambientLight);

  // Crea una luce direzionale
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5); // Colore bianco e intensità 1
  directionalLight1.position.set(1, 1, 1).normalize();
  directionalLight1.castShadow = true; // Abilita le ombre
  scene.add(directionalLight1);

  // Crea una seconda luce direzionale
  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0); // Intensità inferiore
  directionalLight2.position.set(-1, -1, 1).normalize();
  directionalLight2.castShadow = true; // Abilita le ombre
  scene.add(directionalLight2);

  // Configura le ombre per la luce direzionale principale
  directionalLight1.shadow.mapSize.width = 512; // Dimensione mappa ombra
  directionalLight1.shadow.mapSize.height = 512;
  directionalLight1.shadow.camera.near = 0.5; // Limiti della camera ombra
  directionalLight1.shadow.camera.far = 50;

  // Posiziona la camera
  camera.position.set(0, 0.5, 1);
  camera.lookAt(0, 0, 0);

  // Gestione dello scroll
  window.addEventListener("wheel", (event) => {
    event.preventDefault(); // Previeni lo scroll della pagina

    // Calcola quanto scorrere in base all'evento wheel
    const delta = event.deltaY > 0 ? 0.1 : -0.1; // Puoi regolare questa sensibilità
    const currentTime = mixer.time || 0;
    mixer.time = Math.max(0, currentTime + delta); // Aggiorna il tempo dell'animazione
  });

  // Funzione di animazione
  const animate = () => {
    requestAnimationFrame(animate);
    // torusKnot.rotation.x += 0.001;
    // torusKnot.rotation.y += 0.001;
    controls.update();
    if (mixer) {
      const delta = clock.getDelta(); // Delta di tempo dall'ultimo frame
      mixer.update(delta); // Aggiorna l'animazione
    }
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
