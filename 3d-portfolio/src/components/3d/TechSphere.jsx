import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'LangChain', 'LangGraph',
  'RAG', 'Vector Embeddings', 'AI Agents', 'OpenAI API', 'Gemini API',
  'Llama', 'Mistral', 'Neo4j', 'MongoDB', 'PostgreSQL', 'Pinecone',
  'ChromaDB', 'FAISS', 'Docker', 'Kubernetes', 'Git', 'GitHub', 'AWS',
  'Google Cloud', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Framer Motion',
  'Node.js', 'FastAPI', 'Spring Boot', 'YOLOv8', 'Whisper', 'Transformers',
  'Computer Vision', 'Data Science', 'Generative AI', 'Deep Learning', 'C++', 'Java'
];

function SkillWord({ word, position, ...props }) {
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    // Keep text facing the camera (billboarding)
    if (textRef.current) {
      textRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={hovered ? 0.32 : 0.22}
      color={hovered ? '#8b5cf6' : '#ffffff'}
      maxWidth={2}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E79F215.woff" // Space Grotesk font url
      {...props}
    >
      {word}
    </Text>
  );
}

function Cloud({ count = 4, radius = 3 }) {
  // Distribute skills on a Fibonacci sphere
  const words = useMemo(() => {
    const temp = [];
    const countSkills = skills.length;
    for (let i = 0; i < countSkills; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / countSkills);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      temp.push({ word: skills[i], position: new THREE.Vector3(x, y, z) });
    }
    return temp;
  }, [radius]);

  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Automatic slow rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {words.map((item, index) => (
        <SkillWord key={index} word={item.word} position={item.position} />
      ))}
      
      {/* Subtle connection lines inside the sphere to make it look like a network */}
      <mesh>
        <sphereGeometry args={[radius * 0.95, 8, 8]} />
        <meshBasicMaterial 
          color="#6366f1" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>
    </group>
  );
}

const TechSphere = () => {
  return (
    <div className="w-full h-[320px] md:h-[400px] relative">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        <Cloud radius={2.2} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} 
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};

export default TechSphere;
