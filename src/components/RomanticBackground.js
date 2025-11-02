import React, { useEffect, useRef } from 'react';
import './RomanticBackground.css';

function RomanticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create romantic particles (stars/hearts)
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() * 0.02 + 0.01,
        twinkleDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Create floating hearts
    const hearts = [];
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2
      });
    }

    function drawHeart(ctx, x, y, size, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = 'rgba(255, 192, 203, 0.4)';
      ctx.strokeStyle = 'rgba(255, 192, 203, 0.3)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 3/4, x, y + size);
      ctx.bezierCurveTo(x, y + size * 3/4, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles (stars)
      particles.forEach(particle => {
        particle.opacity += particle.twinkle * particle.twinkleDirection;
        if (particle.opacity > 0.8 || particle.opacity < 0.2) {
          particle.twinkleDirection *= -1;
        }

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw floating hearts
      hearts.forEach(heart => {
        heart.y -= heart.speed;
        heart.angle += 0.02;
        heart.x += Math.sin(heart.angle) * 0.5;
        
        if (heart.y < -heart.size) {
          heart.y = canvas.height + heart.size;
          heart.x = Math.random() * canvas.width;
        }

        drawHeart(ctx, heart.x, heart.y, heart.size, heart.opacity);
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="romantic-canvas" />;
}

export default RomanticBackground;

