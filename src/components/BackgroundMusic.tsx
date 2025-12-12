import React, { useEffect, useRef, useState } from 'react';
import './BackgroundMusic.css';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play with unmuted state after user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set volume to 30%
      audio.muted = true; // Keep muted on load
      
      // Audio will only play when user unmutes it
      setIsMuted(true);
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      
      // Ensure audio is playing when unmuted
      if (!newMutedState) {
        audioRef.current.play().catch(err => console.log('Play error:', err));
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        crossOrigin="anonymous"
      >
        <source src="/bgm5min.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="music-switch-wrapper">
        <div>
          <input 
            type="checkbox" 
            id="checkboxInput" 
            checked={isMuted}
            onChange={toggleMute}
          />
          <label htmlFor="checkboxInput" className="toggleSwitch">
            <div className="speaker">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 75 75">
                <path d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z" style={{stroke: '#fff', strokeWidth: 5, strokeLinejoin: 'round', fill: '#fff'}} />
                <path d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6" style={{fill: 'none', stroke: '#fff', strokeWidth: 5, strokeLinecap: 'round'}} />
              </svg>
            </div>
            <div className="mute-speaker">
              <svg version="1.0" viewBox="0 0 75 75" stroke="#fff" strokeWidth={5}>
                <path d="m39,14-17,15H6V48H22l17,15z" fill="#fff" strokeLinejoin="round" />
                <path d="m49,26 20,24m0-24-20,24" fill="#fff" strokeLinecap="round" />
              </svg>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;
