import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface AsteroidData {
  size: number;
  velocity: number;
  angle: number;
  deflectionDeltaV: number;
}

interface AsteroidVisualization3DProps {
  asteroidData: AsteroidData;
}

// Earth component with texture
const Earth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#4A90E2"
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>
      {/* Earth atmosphere glow */}
      <Sphere args={[2.1, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

// Asteroid component
const Asteroid: React.FC<{ 
  position: [number, number, number];
  size: number;
  color: string;
}> = ({ position, size, color }) => {
  const asteroidRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={asteroidRef} args={[size, 8, 8]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={color}
          roughness={0.9}
          metalness={0.1}
        />
      </Sphere>
      <Text
        position={[0, size + 0.3, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Asteroid
      </Text>
    </group>
  );
};

// Trajectory line component
const TrajectoryLine: React.FC<{
  points: THREE.Vector3[];
  color: string;
}> = ({ points, color }) => {
  if (points.length < 2) return null;

  return (
    <Line
      points={points}
      color={color}
      lineWidth={3}
      dashed={false}
    />
  );
};

// Impact visualization
const ImpactEffect: React.FC<{
  position: [number, number, number];
  size: number;
  show: boolean;
}> = ({ position, size, show }) => {
  const impactRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (impactRef.current && show) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      impactRef.current.scale.setScalar(scale);
    }
  });

  if (!show) return null;

  return (
    <group ref={impactRef} position={position}>
      {/* Impact crater */}
      <Sphere args={[size, 16, 16]}>
        <meshBasicMaterial 
          color="#FF4444"
          transparent
          opacity={0.6}
        />
      </Sphere>
      {/* Shockwave rings */}
      {[1.5, 2, 2.5].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius * size, radius * size + 0.1, 32]} />
          <meshBasicMaterial 
            color="#FF6666"
            transparent
            opacity={0.3 - index * 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D scene component
const Scene3D: React.FC<{ asteroidData: AsteroidData }> = ({ asteroidData }) => {
  // Calculate asteroid trajectory based on parameters
  const trajectoryData = useMemo(() => {
    const { size, velocity, angle, deflectionDeltaV } = asteroidData;
    
    // Convert angle to radians
    const angleRad = (angle * Math.PI) / 180;
    
    // Starting position (far from Earth)
    const startDistance = 15;
    const startX = startDistance * Math.cos(angleRad);
    const startY = startDistance * Math.sin(angleRad);
    
    // Earth radius
    const earthRadius = 2;
    
    // Calculate trajectory points
    const points: THREE.Vector3[] = [];
    const numPoints = 50;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      
      // Apply deflection effect
      const deflectionEffect = deflectionDeltaV * 0.5;
      const deflectedAngle = angleRad + (deflectionEffect * t);
      
      const distance = startDistance * (1 - t);
      const x = distance * Math.cos(deflectedAngle);
      const y = distance * Math.sin(deflectedAngle);
      const z = 0;
      
      points.push(new THREE.Vector3(x, y, z));
    }
    
    // Final position (impact point or miss)
    const finalPoint = points[points.length - 1];
    const distanceFromCenter = Math.sqrt(finalPoint.x ** 2 + finalPoint.y ** 2);
    const willImpact = distanceFromCenter <= earthRadius + 0.1;
    
    // Impact position on Earth surface
    const impactPosition: [number, number, number] = willImpact 
      ? [finalPoint.x, finalPoint.y, 0]
      : [0, 0, 0];
    
    return {
      points,
      willImpact,
      impactPosition,
      asteroidPosition: [startX, startY, 0] as [number, number, number],
      asteroidSize: Math.max(0.05, size / 500), // Scale asteroid size
      trajectoryColor: willImpact ? "#FF4444" : "#44FF44"
    };
  }, [asteroidData]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {/* Background stars */}
      <Stars radius={300} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      {/* Earth */}
      <Earth />
      
      {/* Asteroid */}
      <Asteroid 
        position={trajectoryData.asteroidPosition}
        size={trajectoryData.asteroidSize}
        color="#8B4513"
      />
      
      {/* Trajectory line */}
      <TrajectoryLine 
        points={trajectoryData.points}
        color={trajectoryData.trajectoryColor}
      />
      
      {/* Impact effect */}
      <ImpactEffect 
        position={trajectoryData.impactPosition}
        size={0.3}
        show={trajectoryData.willImpact}
      />
      
      {/* Deflection indicator */}
      {asteroidData.deflectionDeltaV > 0 && (
        <Text
          position={[0, 4, 0]}
          fontSize={0.3}
          color={trajectoryData.willImpact ? "#FF4444" : "#44FF44"}
          anchorX="center"
          anchorY="middle"
        >
          {trajectoryData.willImpact ? "IMPACT!" : "DEFLECTED!"}
        </Text>
      )}
      
      {/* Camera controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={25}
        autoRotate={false}
      />
    </>
  );
};

// Main component
const AsteroidVisualization3D: React.FC<AsteroidVisualization3DProps> = ({ asteroidData }) => {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-b from-background/20 to-secondary/10">
      <Canvas
        camera={{ position: [8, 8, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene3D asteroidData={asteroidData} />
      </Canvas>
    </div>
  );
};

export default AsteroidVisualization3D;