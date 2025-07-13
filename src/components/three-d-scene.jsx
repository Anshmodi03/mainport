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

    // Create particles
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
      color: 0xe94560,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Create geometric shapes
    const shapes = [];

    // Torus
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xe94560,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-30, 0, -50);
    scene.add(torus);
    shapes.push(torus);

    // Icosahedron
    const icosahedronGeometry = new THREE.IcosahedronGeometry(8, 1);
    const icosahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x6b7280,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const icosahedron = new THREE.Mesh(
      icosahedronGeometry,
      icosahedronMaterial
    );
    icosahedron.position.set(30, 20, -60);
    scene.add(icosahedron);
    shapes.push(icosahedron);

    // Octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(6, 2);
    const octahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0x9ca3af,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, -20, -40);
    scene.add(octahedron);
    shapes.push(octahedron);

    // Dodecahedron
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(5, 1);
    const dodecahedronMaterial = new THREE.MeshBasicMaterial({
      color: 0xe94560,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const dodecahedron = new THREE.Mesh(
      dodecahedronGeometry,
      dodecahedronMaterial
    );
    dodecahedron.position.set(-15, 30, -70);
    scene.add(dodecahedron);
    shapes.push(dodecahedron);

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

      // Rotate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.002;
        shape.rotation.y += 0.003 + index * 0.001;
        shape.rotation.z += 0.002;

        // Add floating animation
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      // Camera follows mouse
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
          "radial-gradient(circle at 50% 50%, rgba(233, 69, 96, 0.1) 0%, transparent 50%)",
        pointerEvents: "none",
      }}
    />
  );
}
