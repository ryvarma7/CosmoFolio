import React, { useEffect, useState } from 'react';
import './ScrollCue.css';

const ScrollCue: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Hide scroll cue after scrolling past hero section (400px)
      setIsVisible(window.scrollY < 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="scroll-cue">
      <div className="scroll-cue-inner">
        <div className="scroll-indicator-lines">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </div>
      </div>
    </div>
  );
};

export default ScrollCue;
