import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const scene = new THREE.Scene();
const container = document.getElementById('game');
const width = container.clientWidth;
const height = container.clientHeight;
const renderer = new THREE.WebGLRenderer();
const composer = new THREE.EffectComposer(renderer);
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

renderer.setSize(width, height);
container.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x000000);
composer.addPass(new RenderPass(scene, camera));

const light = new THREE.PointLight(0xffffff, 1);
const chara = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshStandardMaterial({color: 0xff9500, emissive: 0xff9500, emissiveIntensity: 5}));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight),
  2.5, // strength
  0.6, // radius
  0.2 // threshold
);

scene.add(light);
scene.add(chara);
composer.addPass(bloomPass);

function animate() {
  requestAnimationFrame(animate);

  chara.rotation.x += 0.01;
  chara.rotation.y += 0.01;

  composer.render(); // 👈 instead of renderer.render
}
animate();
