// import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.137.5/build/three.module.js';
// import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.137.5/examples/jsm/controls/OrbitControls.js';

import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h)
document.body.appendChild(renderer.domElement)

const fov = 75;
const aspectRatio = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far)
camera.position.z = 3
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03

const geo = new THREE.IcosahedronGeometry(1.0, 3);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
})
const mesh = new THREE.Mesh(geo, mat)
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat)
mesh.add(wireMesh)
wireMesh.scale.setScalar(1.0001)


const hemiLight = new THREE.HemisphereLight(0x8E44AD, 0x1F618D
    , 0.90)
scene.add(hemiLight)

function animate(t = 0) {
    requestAnimationFrame(animate)
    mesh.rotation.y = t * 0.0005   
    renderer.render(scene, camera)
    controls.update();
}

animate()