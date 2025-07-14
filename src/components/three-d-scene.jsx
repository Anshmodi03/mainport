import React, { useRef, useEffect, useState, memo, useCallback } from "react";
import * as THREE from "three";
import { usePerformanceOptimization } from "../hooks/use-performance.jsx";

const ThreeDScene = memo(() => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationId = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { throttle } = usePerformanceOptimization();

  // Minimal dark color palette
  const colorPalette = {
    primary: new THREE.Color(0x4c1d95), // Deep purple
    secondary: new THREE.Color(0x1e1b4b), // Dark indigo
  };

  const handleResize = useCallback(
    throttle(() => {
      if (!rendererRef.current || !sceneRef.current) return;

      const camera = sceneRef.current.children.find(
        (child) => child instanceof THREE.PerspectiveCamera
      );

      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }, 100),
    [throttle]
  );

  useEffect(() => {
    if (!mountRef.current) return;

    // Enhanced scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create darker fog for depth
    scene.fog = new THREE.Fog(0x050517, 100, 800);

    // Darker ambient lighting
    const ambientLight = new THREE.AmbientLight(0x1e1b4b, 0.15);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x4c1d95, 0.3);
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Minimal point lights
    const pointLight1 = new THREE.PointLight(0x4c1d95, 0.25, 300);
    pointLight1.position.set(-80, 80, 80);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x1e1b4b, 0.2, 250);
    pointLight2.position.set(80, -80, -80);
    scene.add(pointLight2);

    // 1. Minimal geometric constellation
    const geometries = [
      new THREE.OctahedronGeometry(3, 1),
      new THREE.IcosahedronGeometry(2.5, 1),
      new THREE.TetrahedronGeometry(3.5, 0),
    ];

    const shapes = [];
    for (let i = 0; i < 12; i++) {
      const geometry = geometries[i % geometries.length];
      const colorKeys = Object.keys(colorPalette);
      const selectedColor = colorPalette[colorKeys[i % colorKeys.length]];

      const material = new THREE.MeshPhongMaterial({
        color: selectedColor,
        transparent: true,
        opacity: 0.25,
        shininess: 100,
        specular: 0x333333,
        emissive: selectedColor.clone().multiplyScalar(0.05),
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.03,
          y: (Math.random() - 0.5) * 0.03,
          z: (Math.random() - 0.5) * 0.03,
        },
        floatSpeed: Math.random() * 0.015 + 0.008,
        floatRange: Math.random() * 30 + 15,
        initialY: mesh.position.y,
        pulseFactor: Math.random() * 0.5 + 0.5,
      });

      scene.add(mesh);
    }

    // 2. Multi-layered particle systems with different colors
    const createParticleSystem = (
      count,
      color,
      size,
      speed,
      pattern = "random"
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const scales = new Float32Array(count);
      const colors = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        if (pattern === "spiral") {
          const radius = (i / (count * 3)) * 300;
          const angle = (i / (count * 3)) * Math.PI * 10;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 100;
          positions[i + 2] = Math.sin(angle) * radius;
        } else {
          positions[i] = (Math.random() - 0.5) * 500;
          positions[i + 1] = (Math.random() - 0.5) * 500;
          positions[i + 2] = (Math.random() - 0.5) * 500;
        }

        velocities[i] = (Math.random() - 0.5) * speed;
        velocities[i + 1] = (Math.random() - 0.5) * speed;
        velocities[i + 2] = (Math.random() - 0.5) * speed;

        // Color variation
        colors[i] = color.r + (Math.random() - 0.5) * 0.3;
        colors[i + 1] = color.g + (Math.random() - 0.5) * 0.3;
        colors[i + 2] = color.b + (Math.random() - 0.5) * 0.3;
      }

      for (let i = 0; i < count; i++) {
        scales[i] = Math.random() * 1.5 + 0.5;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: size,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      return { points, velocities };
    };

    // Minimal particle systems
    const particleSystems = [
      createParticleSystem(800, colorPalette.primary, 2.5, 0.02),
      createParticleSystem(500, colorPalette.secondary, 2, 0.018, "spiral"),
    ];

    particleSystems.forEach(({ points }) => scene.add(points));

    // 3. Enhanced energy field with multiple colors
    const createEnergyField = () => {
      const fieldGeometry = new THREE.BufferGeometry();
      const fieldCount = 2000;
      const fieldPositions = new Float32Array(fieldCount * 3);
      const fieldColors = new Float32Array(fieldCount * 3);

      const colorArray = Object.values(colorPalette);

      for (let i = 0; i < fieldCount; i++) {
        const radius = Math.random() * 300 + 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        fieldPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        fieldPositions[i * 3 + 1] = radius * Math.cos(phi);
        fieldPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

        const color = colorArray[i % colorArray.length];
        fieldColors[i * 3] = color.r;
        fieldColors[i * 3 + 1] = color.g;
        fieldColors[i * 3 + 2] = color.b;
      }

      fieldGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(fieldPositions, 3)
      );
      fieldGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(fieldColors, 3)
      );

      const fieldMaterial = new THREE.PointsMaterial({
        size: 1.5,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexColors: true,
      });

      return new THREE.Points(fieldGeometry, fieldMaterial);
    };

    const energyField = createEnergyField();
    scene.add(energyField);

    // 4. Subtle energy rings
    const rings = [];
    const ringColors = Object.values(colorPalette);
    for (let i = 0; i < 4; i++) {
      const ringGeometry = new THREE.RingGeometry(40 + i * 20, 44 + i * 20, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ring.rotation.y = (Math.random() - 0.5) * 0.3;
      ring.position.y = (i - 4) * 40;
      rings.push({
        mesh: ring,
        speed: 0.008 + i * 0.003,
        direction: i % 2 === 0 ? 1 : -1,
        baseOpacity: 0.08 + i * 0.01,
      });
      scene.add(ring);
    }

    // 5. Floating orbs with inner glow
    const orbs = [];
    for (let i = 0; i < 6; i++) {
      const orbGeometry = new THREE.SphereGeometry(8, 16, 16);
      const orbMaterial = new THREE.MeshPhongMaterial({
        color:
          Object.values(colorPalette)[i % Object.values(colorPalette).length],
        transparent: true,
        opacity: 0.2,
        emissive: Object.values(colorPalette)
          [i % Object.values(colorPalette).length].clone()
          .multiplyScalar(0.1),
        shininess: 100,
      });

      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 600
      );

      orbs.push({
        mesh: orb,
        speed: Math.random() * 0.01 + 0.005,
        radius: Math.random() * 100 + 200,
        angle: Math.random() * Math.PI * 2,
        height: orb.position.y,
      });

      scene.add(orb);
    }

    // Position camera
    camera.position.set(0, 0, 200);

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Smooth camera movement
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        mouse.x * 30,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        mouse.y * 30,
        0.05
      );
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Enhanced animation loop
    let time = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId.current = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      time += deltaTime;

      // Animate geometric shapes with pulsing
      shapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        // Enhanced floating motion with pulsing
        shape.mesh.position.y =
          shape.initialY +
          Math.sin(time * shape.floatSpeed + index) * shape.floatRange;

        // Pulsing effect
        const pulse = 1 + Math.sin(time * 2 + index) * 0.1 * shape.pulseFactor;
        shape.mesh.scale.setScalar(pulse);

        // Dynamic opacity
        shape.mesh.material.opacity = 0.2 + Math.sin(time * 1.5 + index) * 0.1;
      });

      // Animate particle systems
      particleSystems.forEach(({ points, velocities }, systemIndex) => {
        const positions = points.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Enhanced boundary wrapping
          if (Math.abs(positions[i]) > 250) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 250) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 250) velocities[i + 2] *= -1;
        }

        points.geometry.attributes.position.needsUpdate = true;
        points.rotation.y += 0.002 * (systemIndex + 1);
        points.rotation.x += 0.001 * Math.sin(time + systemIndex);
      });

      // Animate energy field
      energyField.rotation.y += 0.008;
      energyField.rotation.x += 0.003;

      // Animate rings with enhanced effects
      rings.forEach((ring, index) => {
        ring.mesh.rotation.z += ring.speed * ring.direction;
        ring.mesh.rotation.x += 0.002 * Math.sin(time + index);
        ring.mesh.material.opacity =
          ring.baseOpacity + Math.sin(time * 3 + index) * 0.1;
      });

      // Animate floating orbs
      orbs.forEach((orb, index) => {
        orb.angle += orb.speed;
        orb.mesh.position.x = Math.cos(orb.angle) * orb.radius;
        orb.mesh.position.z = Math.sin(orb.angle) * orb.radius;
        orb.mesh.position.y = orb.height + Math.sin(time * 2 + index) * 50;

        // Rotation
        orb.mesh.rotation.y += 0.01;
        orb.mesh.rotation.x += 0.005;
      });

      // Subtle dynamic lighting
      pointLight1.position.x = Math.sin(time * 0.5) * 120;
      pointLight1.position.z = Math.cos(time * 0.5) * 120;
      pointLight1.intensity = 0.25 + Math.sin(time * 1.5) * 0.05;

      pointLight2.position.x = Math.cos(time * 0.3) * 100;
      pointLight2.position.y = Math.sin(time * 0.3) * 100;
      pointLight2.intensity = 0.2 + Math.cos(time * 1.2) * 0.05;

      // Render
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Event listeners
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Cleanup
      shapes.forEach((shape) => {
        scene.remove(shape.mesh);
        shape.mesh.geometry.dispose();
        shape.mesh.material.dispose();
      });

      particleSystems.forEach(({ points }) => {
        scene.remove(points);
        points.geometry.dispose();
        points.material.dispose();
      });

      rings.forEach((ring) => {
        scene.remove(ring.mesh);
        ring.mesh.geometry.dispose();
        ring.mesh.material.dispose();
      });

      orbs.forEach((orb) => {
        scene.remove(orb.mesh);
        orb.mesh.geometry.dispose();
        orb.mesh.material.dispose();
      });

      scene.remove(energyField);
      energyField.geometry.dispose();
      energyField.material.dispose();

      renderer.dispose();
    };
  }, [handleResize]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at center, rgba(15, 23, 42, 0.4) 0%, rgba(2, 6, 23, 0.7) 100%)",
      }}
    />
  );
});

ThreeDScene.displayName = "ThreeDScene";

export default ThreeDScene;
