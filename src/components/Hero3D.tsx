import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './ThemeContext';

const ParticleSphere: React.FC<{ theme: string }> = ({ theme }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  // Create point coordinates and color variables
  const count = 1200;
  const [positions, originalPositions, stepOffsets] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const steps = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute points in a sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + Math.random() * 0.8; // Radius range [2.0, 2.8]

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      steps[i] = Math.random() * 100; // random phase offset
    }

    return [pos, orig, steps];
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const time = state.clock.getElapsedTime();
    const positionAttr = points.geometry.attributes.position as THREE.BufferAttribute;

    // Slowly rotate the entire system
    points.rotation.y = time * 0.05;
    points.rotation.x = time * 0.02;

    // Interactive deformation based on mouse hover coordinates
    const targetX = mouse.x * 2.5;
    const targetY = mouse.y * 2.5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      // Add a ripple wave based on time and index
      const wave = Math.sin(time * 1.5 + stepOffsets[i]) * 0.08;

      // Distance from mouse target vector (in 2D projected space)
      const dx = ox - targetX;
      const dy = oy - targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Apply vector displacement if cursor is close
      let factor = 0;
      if (dist < 1.5) {
        factor = (1.5 - dist) * 0.25;
      }

      positionAttr.setX(i, ox + dx * factor + wave * (ox / 2));
      positionAttr.setY(i, oy + dy * factor + wave * (oy / 2));
      positionAttr.setZ(i, oz + wave * (oz / 2));
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={theme === 'light' ? '#0066cc' : '#00f5d4'}
        transparent
        opacity={theme === 'light' ? 0.65 : 0.85}
        sizeAttenuation={true}
        depthWrite={false}
        blending={theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
};

const NeuralNetworkLines: React.FC<{ theme: string }> = ({ theme }) => {
  const lineRef = useRef<THREE.LineSegments>(null);

  // Generate fewer, larger nodes representing neural nodes
  const nodeCount = 50;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const vel = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  // Buffer for lines connecting close points
  const maxConnections = 150;
  const linePositions = useMemo(() => new Float32Array(maxConnections * 2 * 3), []);

  useFrame(() => {
    const lineSegments = lineRef.current;
    if (!lineSegments) return;

    // Update node positions based on velocities
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      positions[idx] += velocities[idx];
      positions[idx + 1] += velocities[idx + 1];
      positions[idx + 2] += velocities[idx + 2];

      // Bounce off walls
      const boundary = 3;
      if (Math.abs(positions[idx]) > boundary) velocities[idx] *= -1;
      if (Math.abs(positions[idx + 1]) > boundary) velocities[idx + 1] *= -1;
      if (Math.abs(positions[idx + 2]) > boundary) velocities[idx + 2] *= -1;
    }

    // Connect close nodes
    let connectionCount = 0;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (connectionCount >= maxConnections) break;

        const idxA = i * 3;
        const idxB = j * 3;

        const dx = positions[idxA] - positions[idxB];
        const dy = positions[idxA + 1] - positions[idxB + 1];
        const dz = positions[idxA + 2] - positions[idxB + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.6) {
          const lIdx = connectionCount * 6;

          // Point A
          linePositions[lIdx] = positions[idxA];
          linePositions[lIdx + 1] = positions[idxA + 1];
          linePositions[lIdx + 2] = positions[idxA + 2];

          // Point B
          linePositions[lIdx + 3] = positions[idxB];
          linePositions[lIdx + 4] = positions[idxB + 1];
          linePositions[lIdx + 5] = positions[idxB + 2];

          connectionCount++;
        }
      }
    }

    // Set remaining lines to 0 length so they don't render
    for (let c = connectionCount; c < maxConnections; c++) {
      const lIdx = c * 6;
      linePositions[lIdx] = 0;
      linePositions[lIdx + 1] = 0;
      linePositions[lIdx + 2] = 0;
      linePositions[lIdx + 3] = 0;
      linePositions[lIdx + 4] = 0;
      linePositions[lIdx + 5] = 0;
    }

    const posAttr = lineSegments.geometry.attributes.position as THREE.BufferAttribute;
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
          count={maxConnections * 2}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={theme === 'light' ? '#d9005b' : '#ff007f'}
        transparent
        opacity={theme === 'light' ? 0.25 : 0.4}
        blending={theme === 'light' ? THREE.NormalBlending : THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
};

const Hero3D: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }}>
        <ambientLight intensity={theme === 'light' ? 0.8 : 0.35} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={theme === 'light' ? '#0066cc' : '#00f5d4'} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={theme === 'light' ? '#d9005b' : '#ff007f'} />
        <ParticleSphere theme={theme} />
        <NeuralNetworkLines theme={theme} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
