import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { photos } from '../data/photosData';

// Re-export photos for backward compatibility
export { photos };

// Placeholder for when images don't load
const createPlaceholderTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = 'white';
  ctx.font = '48px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Photo', 256, 256);
  return new THREE.CanvasTexture(canvas);
};

function PhotoFrame({ position, rotation, imageUrl, index, onClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState(null);
  const glowRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 8;
  
  // Load texture with error handling
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        loadedTexture.generateMipmaps = false;
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.warn(`Failed to load image: ${imageUrl}`, error);
        setTexture(createPlaceholderTexture());
      }
    );
  }, [imageUrl]);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.15;
      
      // Enhanced hover effect
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        if (glowRef.current) {
          glowRef.current.material.opacity = 0.5;
        }
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        meshRef.current.rotation.z = 0;
        if (glowRef.current) {
          glowRef.current.material.opacity = 0;
        }
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={isMobile ? [1.7, 2.1] : [2.3, 2.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
          opacity={0}
          transparent
        />
      </mesh>
      
      {/* Photo with shadow */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={() => onClick && onClick(index)}
        castShadow
        receiveShadow
      >
        <planeGeometry args={isMobile ? [1.5, 1.9] : [2, 2.5]} />
        <meshStandardMaterial 
          map={texture || createPlaceholderTexture()}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Modern frame border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={isMobile ? [1.6, 2] : [2.1, 2.6]} />
        <meshStandardMaterial 
          color="#ffffff" 
          metalness={0.9} 
          roughness={0.1}
          opacity={0.1}
          transparent
        />
      </mesh>
    </group>
  );
}

export default function Gallery({ onPhotoClick, isRotating, rotationSpeed }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Responsive radius based on viewport size
  const isMobile = viewport.width < 8; // Roughly 768px when viewport scale is considered
  const radius = useMemo(() => 
    isMobile 
      ? Math.max(5, photos.length * 0.18)
      : Math.max(6.5, photos.length * 0.22),
    [isMobile]
  );
  const photosPerRing = photos.length;
  const angleStep = (Math.PI * 2) / photosPerRing;

  useFrame((state) => {
    if (groupRef.current && isRotating) {
      // Smooth rotation with adjustable speed
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {photos.map((photo, index) => {
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Face the center with slight offset for depth
        const rotation = [0, angle + Math.PI / 2, 0];
        
        return (
          <PhotoFrame
            key={index}
            position={[x, 0, z]}
            rotation={rotation}
            imageUrl={photo}
            index={index}
            onClick={onPhotoClick}
          />
        );
      })}
    </group>
  );
}

