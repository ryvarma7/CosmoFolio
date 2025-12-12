import React, { useEffect, useState, useMemo } from 'react';
import './StarBackground.css';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
  duration: number;
  delay: number;
  depthLayer: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  trailLength: number;
}

const StarBackground: React.FC = () => {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  // small satellite flyby delay (randomized on mount)
  const [satDelay] = useState(() => Math.random() * 10 + 2);
  const spaceRef = React.useRef<HTMLDivElement | null>(null);
  const nebulaRef = React.useRef<HTMLDivElement | null>(null);
  const dustRef = React.useRef<HTMLDivElement | null>(null);
  const farRef = React.useRef<HTMLDivElement | null>(null);
  const midRef = React.useRef<HTMLDivElement | null>(null);
  const foreRef = React.useRef<HTMLDivElement | null>(null);

  // Generate stars once on mount - useMemo prevents regeneration
  const stars = useMemo<Star[]>(() => {
    // Slightly increase star count and bias distribution toward the bottom for denser lower sections
    return Array.from({ length: 220 }, (_, i) => {
      const magnitude = Math.pow(Math.random(), 1.5);
      const size = (1 - magnitude) * 2.5;
      const brightness = 0.2 + magnitude * 0.8;
      
      const colorChance = Math.random();
      let color: string;
      if (colorChance < 0.05) color = 'rgba(100, 150, 255, 0.9)';
      else if (colorChance < 0.15) color = 'rgba(200, 200, 255, 0.9)';
      else if (colorChance < 0.50) color = 'rgba(255, 255, 200, 0.8)';
      else if (colorChance < 0.80) color = 'rgba(255, 200, 100, 0.7)';
      else color = 'rgba(255, 100, 80, 0.6)';

      // slight bias toward bottom (exponent < 1 biases larger values)
      const y = Math.pow(Math.random(), 0.6) * 100;

      return {
        id: i,
        x: Math.random() * 100,
        y,
        size: Math.max(0.3, size),
        brightness,
        color,
        duration: 2 + magnitude * 4,
        delay: Math.random() * 3,
        depthLayer: Math.random() * 3,
      };
    });
  }, []);

  useEffect(() => {
    // Only handle shooting stars - removed heavy particle physics
    const shootingStarInterval = setInterval(() => {
      const angle = 60 + Math.random() * 30;
      const startX = Math.random() * 100;
      const startY = -10;
      const distance = 120 + Math.random() * 30;
      const endX = startX + distance * Math.cos((angle - 90) * (Math.PI / 180));
      const endY = startY + distance * Math.sin((angle - 90) * (Math.PI / 180));
      
      const duration = 1.5 + Math.random() * 1;
      
      const newShootingStar: ShootingStar = {
        id: Date.now(),
        startX,
        startY,
        endX,
        endY,
        duration,
        trailLength: 30 + Math.random() * 20,
      };
      setShootingStars((prev) => [...prev, newShootingStar]);

      setTimeout(() => {
        setShootingStars((prev) =>
          prev.filter((star) => star.id !== newShootingStar.id)
        );
      }, duration * 1000 + 500);
    }, 5000 + Math.random() * 3000);

    return () => {
      clearInterval(shootingStarInterval);
    };
  }, []);

  useEffect(() => {
    // Parallax: start an rAF loop on scroll, lerp toward target, stop when settled.
    let target = 0;
    let current = 0;
    let rafId: number | null = null;

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const farFactor = 0.12; // distant stars
    const midFactor = 0.25; // mid stars (0.25 ratio)
    const foreFactor = 0.4; // foreground stars move more

    const onScroll = () => {
      target = window.scrollY || window.pageYOffset;
      // start the RAF loop if it's not running
      if (rafId === null) {
        rafId = requestAnimationFrame(update);
      }
    };

    const update = () => {
      current = lerp(current, target, 0.06); // smoother, slower approach for buttery motion

      if (farRef.current) farRef.current.style.transform = `translate3d(0, ${-current * farFactor}px, 0)`;
      if (midRef.current) midRef.current.style.transform = `translate3d(0, ${-current * midFactor}px, 0)`;
      if (foreRef.current) foreRef.current.style.transform = `translate3d(0, ${-current * foreFactor}px, 0)`;

      // stop the loop when close enough to target to save CPU
      if (Math.abs(current - target) < 0.5) {
        // finalize positions
        if (farRef.current) farRef.current.style.transform = `translate3d(0, ${-target * farFactor}px, 0)`;
        if (midRef.current) midRef.current.style.transform = `translate3d(0, ${-target * midFactor}px, 0)`;
        if (foreRef.current) foreRef.current.style.transform = `translate3d(0, ${-target * foreFactor}px, 0)`;
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        return;
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // initialize positions once (in case user is already scrolled)
    target = window.scrollY || window.pageYOffset;
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="star-background">
      {/* Background layers */}
      <div className="space-gradient" ref={spaceRef} />
      
      {/* Depth layer 1: Far stars */}
      <div className="stars-container stars-far" ref={farRef}>
        {stars
          .filter((s) => s.depthLayer < 1)
          .map((star) => (
            <div
              key={`far-${star.id}`}
              className="star star-far"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${Math.max(0.5, star.size * 0.6)}px`,
                height: `${Math.max(0.5, star.size * 0.6)}px`,
                backgroundColor: star.color,
                opacity: star.brightness * 0.4,
                animation: `twinkleRealistic ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
      </div>

      {/* Depth layer 2: Mid stars */}
      <div className="stars-container stars-mid" ref={midRef}>
        {stars
          .filter((s) => s.depthLayer >= 1 && s.depthLayer < 2)
          .map((star) => (
            <div
              key={`mid-${star.id}`}
              className="star star-mid"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color,
                opacity: star.brightness * 0.7,
                animation: `twinkleRealistic ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
      </div>

      {/* Depth layer 3: Foreground stars */}
      <div className="stars-container stars-foreground" ref={foreRef}>
        {stars
          .filter((s) => s.depthLayer >= 2)
          .map((star) => (
            <div
              key={`fore-${star.id}`}
              className="star star-foreground"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size * 1.2}px`,
                height: `${star.size * 1.2}px`,
                backgroundColor: star.color,
                opacity: Math.min(1, star.brightness),
                animation: `twinkleRealistic ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
      </div>

      {/* CSS-based cosmic dust animation (no JS updates) */}
      <div className="cosmic-dust" ref={dustRef} />

      {/* Nebula clouds */}
      <div className="nebula-system" ref={nebulaRef}>
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
        <div className="nebula nebula-4" />
      </div>

      {/* Shooting stars */}
      <div className="shooting-stars-container">
        {shootingStars.map((shootingStar) => (
          <div key={shootingStar.id}>
            <div
              className="shooting-star"
              style={{
                '--start-x': `${shootingStar.startX}vw`,
                '--start-y': `${shootingStar.startY}vh`,
                '--end-x': `${shootingStar.endX}vw`,
                '--end-y': `${shootingStar.endY}vh`,
                '--duration': `${shootingStar.duration}s`,
              } as React.CSSProperties}
            />
            <div
              className="meteor-trail"
              style={{
                '--start-x': `${shootingStar.startX}vw`,
                '--start-y': `${shootingStar.startY}vh`,
                '--end-x': `${shootingStar.endX}vw`,
                '--end-y': `${shootingStar.endY}vh`,
                '--duration': `${shootingStar.duration}s`,
                '--trail-length': `${shootingStar.trailLength}px`,
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      {/* Small satellite flyby represented as a tiny glowing white dot */}
      <div
        className="satellite-container"
        style={{ ['--sat-delay' as any]: `${satDelay}s` } as React.CSSProperties}
      >
        <div className="satellite-dot" />
      </div>
    </div>
  );
};

export default StarBackground;
