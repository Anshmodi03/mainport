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

  // Website-matching color palette
  const colorPalette = {
    primary: new THREE.Color(0x6366f1), // accent
    secondary: new THREE.Color(0x8b5cf6), // accent-secondary
    tertiary: new THREE.Color(0x06b6d4), // accent-tertiary
    background: new THREE.Color(0x0a0b14), // background
    backgroundSecondary: new THREE.Color(0x0f1127), // background-secondary
    backgroundTertiary: new THREE.Color(0x151729), // background-tertiary
    surface: new THREE.Color(0x1e1f38), // surface
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

    // Determine low-end status and detail settings
    const isLowEnd =
      navigator.deviceMemory < 4 || navigator.hardwareConcurrency <= 4;
    const pixelRatio = Math.min(window.devicePixelRatio, isLowEnd ? 1 : 2);
    const geometryDetail = isLowEnd ? 8 : 16;
    const particleCount = isLowEnd ? 600 : 1200;

    // Enhanced scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEnd,
      alpha: true,
      powerPreference: isLowEnd ? "default" : "high-performance",
      stencil: false,
      depth: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(pixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = isLowEnd
      ? THREE.LinearToneMapping
      : THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = !isLowEnd;
    if (!isLowEnd) {
      renderer.shadowMap.type = THREE.PCFShadowMap;
    }

    // Performance optimizations
    renderer.info.autoReset = false;
    renderer.sortObjects = false;

    mountRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Subtle fog matching website colors
    scene.fog = new THREE.Fog(colorPalette.background.getHex(), 200, 1000);

    // Lighting setup with website colors
    const ambientLight = new THREE.AmbientLight(
      colorPalette.primary.getHex(),
      0.3
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      colorPalette.secondary.getHex(),
      0.6
    );
    directionalLight.position.set(100, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Dynamic point lights
    const pointLight1 = new THREE.PointLight(
      colorPalette.primary.getHex(),
      0.8,
      400
    );
    pointLight1.position.set(-100, 100, 100);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(
      colorPalette.tertiary.getHex(),
      0.6,
      350
    );
    pointLight2.position.set(100, -100, -100);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(
      colorPalette.secondary.getHex(),
      0.7,
      300
    );
    pointLight3.position.set(0, 200, 0);
    scene.add(pointLight3);

    // 1. Floating geometric constellation with website colors
    const geometries = [
      new THREE.OctahedronGeometry(4, 2),
      new THREE.IcosahedronGeometry(3.5, 1),
      new THREE.TetrahedronGeometry(4, 1),
      new THREE.DodecahedronGeometry(3, 1),
      new THREE.BoxGeometry(6, 6, 6),
    ];

    const shapes = [];
    const colorKeys = Object.keys(colorPalette).slice(0, 3); // primary, secondary, tertiary

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[i % geometries.length];
      const selectedColor = colorPalette[colorKeys[i % colorKeys.length]];

      const material = new THREE.MeshPhysicalMaterial({
        color: selectedColor,
        transparent: true,
        opacity: 0.4,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: selectedColor.clone().multiplyScalar(0.1),
        envMapIntensity: 0.8,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 600
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatRange: Math.random() * 40 + 20,
        initialY: mesh.position.y,
        pulseFactor: Math.random() * 0.3 + 0.7,
        orbitRadius: Math.random() * 50 + 100,
        orbitSpeed: Math.random() * 0.005 + 0.002,
      });

      scene.add(mesh);
    }

    // 2. Enhanced particle systems with website colors
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
      const lifetimes = new Float32Array(count);

      for (let i = 0; i < count * 3; i += 3) {
        if (pattern === "spiral") {
          const radius = (i / (count * 3)) * 400;
          const angle = (i / (count * 3)) * Math.PI * 12;
          positions[i] = Math.cos(angle) * radius;
          positions[i + 1] = (Math.random() - 0.5) * 200;
          positions[i + 2] = Math.sin(angle) * radius;
        } else if (pattern === "sphere") {
          const radius = 300 + Math.random() * 200;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          positions[i] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i + 1] = radius * Math.cos(phi);
          positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
        } else {
          positions[i] = (Math.random() - 0.5) * 800;
          positions[i + 1] = (Math.random() - 0.5) * 600;
          positions[i + 2] = (Math.random() - 0.5) * 800;
        }

        velocities[i] = (Math.random() - 0.5) * speed;
        velocities[i + 1] = (Math.random() - 0.5) * speed;
        velocities[i + 2] = (Math.random() - 0.5) * speed;

        // Enhanced color variation
        colors[i] = color.r + (Math.random() - 0.5) * 0.2;
        colors[i + 1] = color.g + (Math.random() - 0.5) * 0.2;
        colors[i + 2] = color.b + (Math.random() - 0.5) * 0.2;

        lifetimes[i / 3] = Math.random();
      }

      for (let i = 0; i < count; i++) {
        scales[i] = Math.random() * 2 + 0.5;
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
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      return { points, velocities, lifetimes };
    };

    // Multiple particle systems with website colors
    const particleSystems = [
      createParticleSystem(1200, colorPalette.primary, 3, 0.015),
      createParticleSystem(800, colorPalette.secondary, 2.5, 0.012, "spiral"),
      createParticleSystem(600, colorPalette.tertiary, 2, 0.018, "sphere"),
    ];

    particleSystems.forEach(({ points }) => scene.add(points));

    // 3. Interconnected energy grid
    const createEnergyGrid = () => {
      const gridGroup = new THREE.Group();
      const gridSize = 15;
      const spacing = 40;

      for (let x = 0; x < gridSize; x++) {
        for (let z = 0; z < gridSize; z++) {
          const nodeGeometry = new THREE.SphereGeometry(1, 8, 8);
          const nodeMaterial = new THREE.MeshPhysicalMaterial({
            color: colorPalette.primary,
            emissive: colorPalette.primary.clone().multiplyScalar(0.3),
            transparent: true,
            opacity: 0.8,
          });

          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.set(
            (x - gridSize / 2) * spacing,
            Math.sin((x + z) * 0.5) * 20,
            (z - gridSize / 2) * spacing
          );

          gridGroup.add(node);

          // Connect nodes with lines
          if (x < gridSize - 1) {
            const lineGeometry = new THREE.BufferGeometry();
            const linePositions = new Float32Array(6);
            linePositions[0] = node.position.x;
            linePositions[1] = node.position.y;
            linePositions[2] = node.position.z;
            linePositions[3] = node.position.x + spacing;
            linePositions[4] = Math.sin((x + 1 + z) * 0.5) * 20;
            linePositions[5] = node.position.z;

            lineGeometry.setAttribute(
              "position",
              new THREE.BufferAttribute(linePositions, 3)
            );

            const lineMaterial = new THREE.LineBasicMaterial({
              color: colorPalette.tertiary,
              transparent: true,
              opacity: 0.3,
            });

            const line = new THREE.Line(lineGeometry, lineMaterial);
            gridGroup.add(line);
          }
        }
      }

      gridGroup.position.y = -200;
      return gridGroup;
    };

    const energyGrid = createEnergyGrid();
    scene.add(energyGrid);

    // 4. Floating energy orbs
    const orbs = [];
    for (let i = 0; i < 12; i++) {
      const orbGeometry = new THREE.SphereGeometry(8, 32, 32);
      const orbMaterial = new THREE.MeshPhysicalMaterial({
        color: Object.values(colorPalette)[i % 3],
        transparent: true,
        opacity: 0.4,
        roughness: 0.1,
        metalness: 0.9,
        clearcoat: 1.0,
        emissive: Object.values(colorPalette)
          [i % 3].clone()
          .multiplyScalar(0.2),
        envMapIntensity: 1.0,
      });

      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 800
      );

      orbs.push({
        mesh: orb,
        speed: Math.random() * 0.008 + 0.003,
        radius: Math.random() * 150 + 250,
        angle: Math.random() * Math.PI * 2,
        height: orb.position.y,
        pulseFactor: Math.random() * 0.5 + 0.5,
      });

      scene.add(orb);
    }

    // 5. Plasma rings with website colors
    const rings = [];
    const ringCount = 6;
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(60 + i * 25, 3, 16, 100);
      const ringMaterial = new THREE.MeshPhysicalMaterial({
        color: Object.values(colorPalette)[i % 3],
        transparent: true,
        opacity: 0.25,
        roughness: 0.1,
        metalness: 0.8,
        emissive: Object.values(colorPalette)
          [i % 3].clone()
          .multiplyScalar(0.1),
      });

      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      ring.rotation.y = (Math.random() - 0.5) * 0.5;
      ring.position.y = (i - ringCount / 2) * 60;

      rings.push({
        mesh: ring,
        speed: 0.005 + i * 0.002,
        direction: i % 2 === 0 ? 1 : -1,
        baseOpacity: 0.15 + i * 0.02,
        wobbleSpeed: Math.random() * 0.01 + 0.005,
      });

      scene.add(ring);
    }

    // Position camera
    camera.position.set(0, 0, 300);

    // Enhanced mouse interaction
    const mouse = new THREE.Vector2();
    const targetCameraPos = new THREE.Vector3();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetCameraPos.x = mouse.x * 50;
      targetCameraPos.y = mouse.y * 50;
      targetCameraPos.z = 300;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Enhanced animation loop
    let time = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId.current = requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();
      time += deltaTime;

      // Smooth camera movement
      camera.position.lerp(targetCameraPos, 0.02);
      camera.lookAt(0, 0, 0);

      // Animate geometric shapes with enhanced movement
      shapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        // Complex floating motion
        const timeOffset = time * shape.floatSpeed + index;
        shape.mesh.position.y =
          shape.initialY + Math.sin(timeOffset) * shape.floatRange;

        // Orbital motion
        const orbitX =
          Math.cos(time * shape.orbitSpeed + index) * shape.orbitRadius;
        const orbitZ =
          Math.sin(time * shape.orbitSpeed + index) * shape.orbitRadius;
        shape.mesh.position.x += orbitX * 0.01;
        shape.mesh.position.z += orbitZ * 0.01;

        // Enhanced pulsing
        const pulse = 1 + Math.sin(time * 2 + index) * 0.15 * shape.pulseFactor;
        shape.mesh.scale.setScalar(pulse);

        // Dynamic opacity and emissive
        const opacity = 0.3 + Math.sin(time * 1.5 + index) * 0.15;
        shape.mesh.material.opacity = opacity;
        shape.mesh.material.emissiveIntensity =
          0.1 + Math.sin(time * 2 + index) * 0.05;
      });

      // Animate particle systems with enhanced effects
      particleSystems.forEach(
        ({ points, velocities, lifetimes }, systemIndex) => {
          const positions = points.geometry.attributes.position.array;
          const colors = points.geometry.attributes.color.array;

          for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i] * (1 + Math.sin(time + i) * 0.1);
            positions[i + 1] +=
              velocities[i + 1] * (1 + Math.cos(time + i) * 0.1);
            positions[i + 2] +=
              velocities[i + 2] * (1 + Math.sin(time + i) * 0.1);

            // Enhanced boundary wrapping with smooth transitions
            if (Math.abs(positions[i]) > 400) velocities[i] *= -0.8;
            if (Math.abs(positions[i + 1]) > 300) velocities[i + 1] *= -0.8;
            if (Math.abs(positions[i + 2]) > 400) velocities[i + 2] *= -0.8;

            // Color animation
            const colorIndex = i / 3;
            const colorIntensity = 0.5 + Math.sin(time * 2 + colorIndex) * 0.3;
            colors[i] *= colorIntensity;
            colors[i + 1] *= colorIntensity;
            colors[i + 2] *= colorIntensity;
          }

          points.geometry.attributes.position.needsUpdate = true;
          points.geometry.attributes.color.needsUpdate = true;

          points.rotation.y += 0.001 * (systemIndex + 1);
          points.rotation.x += 0.0005 * Math.sin(time + systemIndex);
        }
      );

      // Animate energy grid
      energyGrid.rotation.y += 0.002;
      energyGrid.position.y = -200 + Math.sin(time * 0.5) * 20;

      // Animate plasma rings with enhanced effects
      rings.forEach((ring, index) => {
        ring.mesh.rotation.z += ring.speed * ring.direction;
        ring.mesh.rotation.x += ring.wobbleSpeed * Math.sin(time + index);
        ring.mesh.rotation.y += ring.wobbleSpeed * Math.cos(time + index);

        const opacityWave = ring.baseOpacity + Math.sin(time * 3 + index) * 0.1;
        ring.mesh.material.opacity = opacityWave;
        ring.mesh.material.emissiveIntensity =
          0.1 + Math.sin(time * 2 + index) * 0.05;
      });

      // Animate floating orbs with complex motion
      orbs.forEach((orb, index) => {
        orb.angle += orb.speed;
        orb.mesh.position.x =
          Math.cos(orb.angle) * orb.radius + Math.sin(time * 0.5 + index) * 50;
        orb.mesh.position.z =
          Math.sin(orb.angle) * orb.radius + Math.cos(time * 0.3 + index) * 50;
        orb.mesh.position.y = orb.height + Math.sin(time * 1.5 + index) * 60;

        // Complex rotation
        orb.mesh.rotation.y += 0.008;
        orb.mesh.rotation.x += 0.005;
        orb.mesh.rotation.z += 0.003;

        // Pulsing scale
        const pulse = orb.pulseFactor + Math.sin(time * 2 + index) * 0.2;
        orb.mesh.scale.setScalar(pulse);
      });

      // Dynamic lighting animation
      pointLight1.position.x = Math.sin(time * 0.7) * 150;
      pointLight1.position.z = Math.cos(time * 0.7) * 150;
      pointLight1.intensity = 0.8 + Math.sin(time * 2) * 0.2;

      pointLight2.position.x = Math.cos(time * 0.5) * 120;
      pointLight2.position.y = Math.sin(time * 0.5) * 120;
      pointLight2.intensity = 0.6 + Math.cos(time * 1.8) * 0.2;

      pointLight3.position.x = Math.sin(time * 0.3) * 100;
      pointLight3.position.z = Math.cos(time * 0.3) * 100;
      pointLight3.intensity = 0.7 + Math.sin(time * 1.5) * 0.2;

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

      // Comprehensive cleanup
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

      scene.remove(energyGrid);
      energyGrid.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });

      renderer.dispose();
    };
  }, [handleResize]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        pointerEvents: "none",
        background: `radial-gradient(ellipse at center, 
          rgba(10, 11, 20, 0.8) 0%, 
          rgba(15, 17, 39, 0.9) 50%, 
          rgba(21, 23, 41, 0.95) 100%)`,
      }}
    />
  );
});

ThreeDScene.displayName = "ThreeDScene";

export default ThreeDScene;
