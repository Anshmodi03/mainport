import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function ThreeDScene() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create particles with new color palette
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.8,
      color: 0x00d4ff, // Updated to accent color
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create geometric shapes with updated color palette
    const shapes = [];

    // Torus with primary accent color
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff, // Accent color
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-30, 0, -50);
    scene.add(torus);
    shapes.push(torus);

    // Icosahedron with secondary accent color
    const icosahedronGeometry = new THREE.IcosahedronGeometry(8, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed, // Accent secondary color
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const icosahedron = new THREE.Mesh(
      icosahedronGeometry,
      icosahedronMaterial
    );
    icosahedron.position.set(30, 20, -60);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Octahedron with muted foreground
    const octahedronGeometry = new THREE.OctahedronGeometry(6, 2);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x94a3b8, // Muted foreground color
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, -20, -40);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Dodecahedron with gradient-like mixed color
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(5, 1);
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Mix of accent and accent-secondary
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const dodecahedron = new THREE.Mesh(
      dodecahedronGeometry,
      dodecahedronMaterial
    );
    dodecahedron.position.set(-15, 30, -70);
    scene.add(dodecahedron);
    shapes.push(dodecahedron);

    // Add additional geometric shapes for more visual interest
    // Sphere with accent color
    const sphereGeometry = new THREE.SphereGeometry(4, 16, 16);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(40, -10, -45);
    scene.add(sphere);
    shapes.push(sphere);

    // Tetrahedron with secondary accent
    const tetrahedronGeometry = new THREE.TetrahedronGeometry(6, 0);
    const tetrahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const tetrahedron = new THREE.Mesh(
      tetrahedronGeometry,
      tetrahedronMaterial
    );
    tetrahedron.position.set(-40, -15, -55);
    scene.add(tetrahedron);
    shapes.push(tetrahedron);

    // Camera position
    camera.position.z = 30;
    camera.position.y = 5;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouse.x = mouseX;
      mouse.y = mouseY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Rotate particles
      if (particlesMesh) {
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.002;
      }

      // Rotate shapes with varying speeds
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.002;
        shape.rotation.y += 0.003 + index * 0.001;
        shape.rotation.z += 0.002;

        // Add floating animation with different patterns
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;

        // Add subtle pulsing effect to materials
        if (shape.material.opacity) {
          shape.material.opacity =
            0.3 + Math.sin(Date.now() * 0.002 + index) * 0.2;
        }
      });

      // Camera follows mouse with smooth interpolation
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose of geometries and materials
      shapes.forEach((shape) => {
        if (shape.geometry) shape.geometry.dispose();
        if (shape.material) shape.material.dispose();
      });

      if (particlesGeometry) particlesGeometry.dispose();
      if (particlesMaterial) particlesMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 opacity-60"
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.08) 0%, rgba(124, 58, 237, 0.05) 50%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  );
}
