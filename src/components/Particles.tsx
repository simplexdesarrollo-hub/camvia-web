'use client';

import { useEffect, useState } from 'react';

export default function Particles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) return; // Disable for performance on low-end mobile
    
    const count = 35;
    const newParticles = [];

    for (let i = 0; i < count; i++) {
      const size = 4 + Math.random() * 10;
      newParticles.push({
        id: i,
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 15}s`,
        animationDelay: `${Math.random() * 10}s`,
        opacity: (0.3 + Math.random() * 0.4).toFixed(2),
      });
    }

    setParticles(newParticles);
  }, []);

  return (
    <div id="particles" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            position: 'absolute',
            borderRadius: '999px',
            background: 'var(--accent)',
            filter: 'drop-shadow(0 0 8px rgba(0,255,127,.25))',
            ...p
          }}
        />
      ))}
    </div>
  );
}
