import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Camera controller to handle camera movements and animations
const CameraController = ({ isZoomedToLaptop }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (isZoomedToLaptop) {
      // Zoom into the laptop screen
      gsap.to(camera.position, {
        x: 0,
        y: 0.8,
        z: 2.2,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(new THREE.Vector3(0, 0.4, 0)),
      });
    } else {
      // Zoom out to view the entire desk shifted to the right
      gsap.to(camera.position, {
        x: -1.6,
        y: 2.8,
        z: 5.8,
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(new THREE.Vector3(0.2, 0.4, 0)),
      });
    }
  }, [isZoomedToLaptop, camera]);

  return null;
};

// 3D Laptop Component
const Laptop = ({ onLaptopClick, isZoomed }) => {
  const groupRef = useRef();
  const screenRef = useRef();

  useFrame((state) => {
    // Add subtle floating animation to the entire laptop when not zoomed
    if (!isZoomed && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05 + 0.3;
    } else if (groupRef.current) {
      groupRef.current.position.y = 0.3;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onLaptopClick();
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  return (
    <group 
      ref={groupRef} 
      position={[0, 0.3, 0]} 
      onClick={handleClick} 
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Laptop Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 1.1]} />
        <meshStandardMaterial color="#2d3748" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Keyboard area highlight */}
      <mesh position={[0, 0.045, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.6]} />
        <meshStandardMaterial color="#1a202c" roughness={0.8} />
      </mesh>

      {/* Laptop Screen Hinge & Lid */}
      <group position={[0, 0.04, -0.52]} rotation={[-0.35, 0, 0]} ref={screenRef}>
        {/* Lid */}
        <mesh position={[0, 0.55, -0.02]} castShadow>
          <boxGeometry args={[1.6, 1.1, 0.04]} />
          <meshStandardMaterial color="#2d3748" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0.55, 0.005]}>
          <planeGeometry args={[1.5, 1.0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#6366f1"
            emissiveIntensity={1.5}
            roughness={0.1}
          />
        </mesh>

        {/* Screen Inner Glass Overlay / Bezel */}
        <mesh position={[0, 0.55, 0.007]}>
          <planeGeometry args={[1.54, 1.04]} />
          <meshStandardMaterial color="#000000" roughness={0.1} transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
};

// 3D Desk Component
const Desk = () => {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Desk Top */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[4.5, 0.15, 2.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Desk Legs (Sleek minimalist cylinders) */}
      <mesh position={[-2.1, -1.0, -1.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[2.1, -1.0, -1.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-2.1, -1.0, 1.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[2.1, -1.0, 1.1]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.0]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// Glowing floating details around the desk
const FloatingAssets = () => {
  const meshRef1 = useRef();
  const meshRef2 = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef1.current) {
      meshRef1.current.rotation.x = elapsed * 0.5;
      meshRef1.current.rotation.y = elapsed * 0.3;
      meshRef1.current.position.y = 1.2 + Math.sin(elapsed * 1.2) * 0.15;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = elapsed * -0.4;
      meshRef2.current.rotation.y = elapsed * 0.6;
      meshRef2.current.position.y = 1.0 + Math.cos(elapsed * 1.0) * 0.12;
    }
  });

  return (
    <group>
      {/* Floating Glowing Torus */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={meshRef1} position={[-2.2, 1.2, -0.5]}>
          <torusGeometry args={[0.3, 0.08, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#8b5cf6" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      {/* Floating Glowing Sphere */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef2} position={[2.2, 1.0, -0.3]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.0} />
        </mesh>
      </Float>
    </group>
  );
};

const DeskScene = ({ isZoomedToLaptop, onLaptopClick }) => {
  return (
    <Canvas shadows className="w-full h-full">
      <color attach="background" args={['#050816']} />
      
      <PerspectiveCamera makeDefault position={[-1.6, 2.8, 5.8]} fov={50} />
      <CameraController isZoomedToLaptop={isZoomedToLaptop} />

      {/* Environment & Lights */}
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.6} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* Premium Neon Lights */}
      <pointLight position={[-3, 2, -1]} color="#8b5cf6" intensity={2.5} distance={6} />
      <pointLight position={[3, 2, -1]} color="#06b6d4" intensity={2.5} distance={6} />
      <pointLight position={[0, 0.8, -0.5]} color="#6366f1" intensity={3.0} distance={4} />

      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1.5} />

      <group position={[0, -0.2, 0]}>
        <Laptop onLaptopClick={onLaptopClick} isZoomed={isZoomedToLaptop} />
        <Desk />
        <FloatingAssets />
        <ContactShadows 
          position={[0, -1.6, 0]} 
          opacity={0.4} 
          scale={7} 
          blur={2.4} 
          far={3}
        />
      </group>

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.1}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </Canvas>
  );
};

export default DeskScene;
