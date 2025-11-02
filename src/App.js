import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Gallery, { photos } from './components/Gallery';
import Lightbox from './components/Lightbox';
import Controls from './components/Controls';
import RomanticBackground from './components/RomanticBackground';
import FallingHearts from './components/FallingHearts';
import { photosData } from './data/photosData';
import './App.css';

function App() {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePhotoClick = (index) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePreviousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhotoData = photosData[currentPhotoIndex];

  return (
    <div className="App">
      <RomanticBackground />
      <FallingHearts />
      <Canvas shadows>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 0, isMobile ? 10 : 8]} 
          fov={isMobile ? 60 : 50} 
        />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, 5]} intensity={0.5} />
        <directionalLight position={[0, 10, 0]} intensity={0.8} castShadow />
        <Gallery 
          onPhotoClick={handlePhotoClick}
          isRotating={isRotating}
          rotationSpeed={rotationSpeed}
        />
        <OrbitControls 
          enableZoom={!isMobile}
          enablePan={false}
          minDistance={isMobile ? 6 : 5}
          maxDistance={isMobile ? 18 : 15}
          autoRotate={isRotating}
          autoRotateSpeed={rotationSpeed}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
      
      <div className="title">
        <h1 className="title-main">Photo Gallery</h1>
        <div className="title-subtitle">Memories in Motion</div>
      </div>
      
      <Controls
        isRotating={isRotating}
        onToggleRotate={() => setIsRotating(!isRotating)}
        rotationSpeed={rotationSpeed}
        onSpeedChange={setRotationSpeed}
        photoCount={photos.length}
      />
      
      <Lightbox
        imageUrl={currentPhotoData?.path || photos[currentPhotoIndex]}
        description={currentPhotoData?.description}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNextPhoto}
        onPrevious={handlePreviousPhoto}
        currentIndex={currentPhotoIndex}
        totalPhotos={photos.length}
      />
    </div>
  );
}

export default App;

