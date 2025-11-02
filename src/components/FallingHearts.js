import React, { useEffect, useRef } from 'react';
import './FallingHearts.css';

function FallingHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Array of messages with variations
    const messages = [
      'I ❤️ You',
      'I ❤️ You Kkhargosh',
      'I Love You ❤️',
      'I Love You Kkhargosh ❤️',
      '❤️ I Love You ❤️',
      '❤️ Kkhargosh ❤️',
      'Love ❤️',
      '❤️ You ❤️',
      'I ❤️ Kkhargosh',
      'Kkhargosh ❤️',
      '❤️ I ❤️ You ❤️',
      '❤️ My Love ❤️'
    ];

    const fallingElements = [];
    let animationId;

    function createFallingText() {
      // Create a new falling element
      const element = document.createElement('div');
      element.className = 'falling-text';
      
      // Random message
      const message = messages[Math.floor(Math.random() * messages.length)];
      element.textContent = message;
      
      // Random horizontal position
      const leftPosition = Math.random() * 100;
      element.style.left = `${leftPosition}%`;
      
      // Random animation duration (10-20 seconds) - faster falling
      const duration = 10 + Math.random() * 10;
      element.style.animationDuration = `${duration}s`;
      
      // Random delay to start
      const delay = Math.random() * 5;
      element.style.animationDelay = `${delay}s`;
      
      // Random font size
      const fontSize = 16 + Math.random() * 12;
      element.style.fontSize = `${fontSize}px`;
      
      // Add to container
      container.appendChild(element);
      fallingElements.push(element);
      
      // Remove element after animation completes
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
          const index = fallingElements.indexOf(element);
          if (index > -1) {
            fallingElements.splice(index, 1);
          }
        }
      }, (duration + delay) * 1000);
    }

    // Create initial falling texts - more frequent
    for (let i = 0; i < 40; i++) {
      setTimeout(() => {
        createFallingText();
      }, i * 200);
    }

    // Continuously create new falling texts - more frequently
    const createInterval = setInterval(() => {
      if (fallingElements.length < 50) {
        createFallingText();
        // Sometimes create 2 at once for more density
        if (Math.random() > 0.7) {
          setTimeout(() => createFallingText(), 300);
        }
      }
    }, 800);

    return () => {
      clearInterval(createInterval);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      // Clean up all elements
      fallingElements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="falling-hearts-container" />;
}

export default FallingHearts;

