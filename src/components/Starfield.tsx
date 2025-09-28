import React, { useEffect, useRef } from 'react';

const Starfield: React.FC = () => {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!starfieldRef.current) return;

    // Clear existing stars
    starfieldRef.current.innerHTML = '';

    // Generate stars
    const numStars = 200;
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 3}s`;
      
      // Random brightness
      star.style.opacity = (Math.random() * 0.8 + 0.2).toString();
      
      starfieldRef.current.appendChild(star);
    }
  }, []);

  return <div ref={starfieldRef} className="starfield" />;
};

export default Starfield;