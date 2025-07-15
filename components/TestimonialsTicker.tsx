'use client';
import React, { useRef, useEffect } from 'react';

export function TestimonialsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    '🔥 "SecretStash changed how I organize my projects. Game changer!" - Alex R.',
    '🐼 "Sticky notes are trembling in fear. SecretStash is their nightmare." - Julius (and Panda 🐼)',
    '🌙 "Unlike my MacBook, SecretStash is impossible to crack." - Morgen',
    '🎵 "I tried to remember my secrets in a song, but SecretStash is easier." - Dan',
    '🚦 "If you see this, you found the secret stash. Ruh-Roh!" - Ruh-Roh',
    '💡 "This isn’t just a vault, it’s a vibe." - Jayme L.',
  ];

  useEffect(() => {
    const ticker = tickerRef.current!;
    let animationId: number;
    let px = 0;

    function animate() {
      const speed = 0.4; // Adjust speed as needed
      px -= speed;

      const resetPoint = -ticker.scrollWidth / 2;
      if (px <= resetPoint) {
        px = 0;
      }

      ticker.style.transform = `translateX(${px}px)`;
      animationId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap border-t border-b border-muted py-2 bg-card/70 mb-6 relative">
      <div
        ref={tickerRef}
        className="flex gap-12 text-md font-medium text-primary"
        style={{
          willChange: 'transform',
          whiteSpace: 'nowrap',
          display: 'inline-flex',
        }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}