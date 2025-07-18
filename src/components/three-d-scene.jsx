import React, { useRef, useEffect, useState, memo } from "react";
import * as THREE from "three";

const ThreeDScene = memo(() => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameId = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup with enhanced renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0b14, 10, 50);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Enhanced lighting system
    const ambientLight = new THREE.AmbientLight(0x6366f1, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 0.6, 20);
    pointLight1.position.set(-10, 5, -5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 0.4, 15);
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

    // Create floating geometric shapes
    const geometries = [
      new THREE.DodecahedronGeometry(1.2),
      new THREE.IcosahedronGeometry(1),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TetrahedronGeometry(1.3),
    ];

    const materials = [
      new THREE.MeshPhysicalMaterial({
        color: 0x6366f1,
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8,
        envMapIntensity: 1,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x8b5cf6,
        metalness: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.9,
        envMapIntensity: 1,
      }),
      new THREE.MeshPhysicalMaterial({
        color: 0xec4899,
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.6,
        envMapIntensity: 1,
      }),
    ];

    const floatingShapes = [];
    for (let i = 0; i < 8; i++) {
      const geometry = geometries[i % geometries.length];
      const material = materials[i % materials.length];
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Add custom properties for animation
      mesh.userData = {
        originalPosition: mesh.position.clone(),
        speed: 0.2 + Math.random() * 0.3,
        rotationSpeed: 0.01 + Math.random() * 0.02,
        amplitude: 2 + Math.random() * 3,
      };

      scene.add(mesh);
      floatingShapes.push(mesh);
    }

    // Enhanced particle system
    const particleCount = 150;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x6366f1),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xec4899),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const color =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        opacity: { value: 0.6 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z) * (0.8 + 0.2 * sin(time + position.x * 0.1));
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float opacity;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          if (distance > 0.5) discard;
          
          float alpha = (1.0 - distance * 2.0) * opacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Create wireframe sphere
    const wireframeGeometry = new THREE.SphereGeometry(8, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireframeSphere = new THREE.Mesh(
      wireframeGeometry,
      wireframeMaterial
    );
    scene.add(wireframeSphere);

    // Create energy rings
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(6 + i * 2, 0.1, 8, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: [0x6366f1, 0x8b5cf6, 0x06b6d4][i],
        transparent: true,
        opacity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = i * 0.5 - 1;
      scene.add(ring);
      rings.push(ring);
    }

    camera.position.z = 15;
    camera.position.y = 2;

    sceneRef.current = {
      scene,
      camera,
      renderer,
      floatingShapes,
      particleSystem,
      particleMaterial,
      wireframeSphere,
      rings,
      pointLight1,
      pointLight2,
    };

    mountRef.current.appendChild(renderer.domElement);

    // Mouse interaction
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;

      timeRef.current += 0.01;
      const {
        scene,
        camera,
        renderer,
        floatingShapes,
        particleSystem,
        particleMaterial,
        wireframeSphere,
        rings,
        pointLight1,
        pointLight2,
      } = sceneRef.current;

      // Animate floating shapes
      floatingShapes.forEach((shape, index) => {
        const userData = shape.userData;
        const time = timeRef.current * userData.speed;

        shape.position.x =
          userData.originalPosition.x + Math.sin(time) * userData.amplitude;
        shape.position.y =
          userData.originalPosition.y +
          Math.cos(time * 0.7) * userData.amplitude * 0.5;
        shape.position.z =
          userData.originalPosition.z +
          Math.sin(time * 0.5) * userData.amplitude * 0.8;

        shape.rotation.x += userData.rotationSpeed;
        shape.rotation.y += userData.rotationSpeed * 0.7;
        shape.rotation.z += userData.rotationSpeed * 0.5;
      });

      // Animate particle system
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] +=
          Math.sin(timeRef.current + positions[i] * 0.01) * 0.02;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      particleMaterial.uniforms.time.value = timeRef.current;

      // Animate wireframe sphere
      wireframeSphere.rotation.x += 0.002;
      wireframeSphere.rotation.y += 0.003;

      // Animate rings
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.01 * (index + 1);
        ring.material.opacity = 0.2 + Math.sin(timeRef.current + index) * 0.1;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(timeRef.current * 0.5) * 10;
      pointLight1.position.z = Math.cos(timeRef.current * 0.5) * 10;

      pointLight2.position.x = Math.cos(timeRef.current * 0.7) * 8;
      pointLight2.position.z = Math.sin(timeRef.current * 0.7) * 8;

      // Mouse interaction
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;

      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      if (sceneRef.current) {
        const { renderer } = sceneRef.current;
        renderer.dispose();

        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-40"
      style={{ background: "transparent" }}
    />
  );
});

ThreeDScene.displayName = "ThreeDScene";

export default ThreeDScene;
