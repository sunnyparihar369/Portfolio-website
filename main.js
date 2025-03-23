import * as THREE from 'https://unpkg.com/three@0.157.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Get the container element
const container = document.getElementById('canvas-container');
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x64ffda,
    transparent: true,
    opacity: 0.8
});

// Create mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Position camera
camera.position.z = 2;

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add geometric shapes
const torusGeometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const torusMaterial = new THREE.MeshPhongMaterial({
    color: 0x64ffda,
    transparent: true,
    opacity: 0.6,
    wireframe: true
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(-2, 0, -3);
scene.add(torus);

const octahedronGeometry = new THREE.OctahedronGeometry(0.5);
const octahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0x64ffda,
    transparent: true,
    opacity: 0.6,
    wireframe: true
});
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedron.position.set(2, 1, -3);
scene.add(octahedron);

// Add directional light for better shape visibility
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.001;
    
    // Smooth mouse follow
    particlesMesh.rotation.y += (mouseX * 0.1 - particlesMesh.rotation.y) * 0.1;
    particlesMesh.rotation.x += (mouseY * 0.1 - particlesMesh.rotation.x) * 0.1;
    
    // Animate geometric shapes
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    octahedron.rotation.x -= 0.01;
    octahedron.rotation.z += 0.01;
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Add fade-in animation to sections
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.classList.add('fade-in');
    section.style.animationDelay = `${index * 0.2}s`;
});

// Start animation
animate();