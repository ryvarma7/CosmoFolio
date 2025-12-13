import React, { useEffect, useState } from 'react';
import GlassButton from './GlassButton';
import SocialButtons from './SocialButtons';
import BackgroundMusic from './BackgroundMusic';
import './Hero.css';

const Hero: React.FC = () => {
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);
  const firstName = "Yeshwanth";
  const lastName = "Varma";
  const roles = ["Student", "Python Developer", "Cybersecurity Enthusiast"];
  const [currentRole, setCurrentRole] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstIndex < firstName.length) {
        setFirstIndex(firstIndex + 1);
      } else if (lastIndex < lastName.length) {
        setLastIndex(lastIndex + 1);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [firstIndex, lastIndex, firstName.length, lastName.length]);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(roleTimer);
  }, []);

  useEffect(() => {
    let loadingTimer: ReturnType<typeof setInterval>;
    
    if (isImageHovered && loadingProgress < 100) {
      loadingTimer = setInterval(() => {
        setLoadingProgress((prev) => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            clearInterval(loadingTimer);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    } else if (!isImageHovered) {
      setLoadingProgress(0);
    }
    
    return () => clearInterval(loadingTimer);
  }, [isImageHovered, loadingProgress]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-content">
          <h1 className="hero-title">
            <span>{firstName.substring(0, firstIndex)}</span>
            <span className="cursor">{firstIndex < firstName.length ? '|' : ''}</span>
            <br />
            <span>{lastName.substring(0, lastIndex)}</span>
            <span className="cursor">{firstIndex >= firstName.length && lastIndex < lastName.length ? '|' : ''}</span>
          </h1>

          <div className="role-switcher">
            <p className="hero-subtitle fade-in-out">
              {roles[currentRole]}
            </p>
          </div>

          <p className="hero-description slide-up" style={{ animationDelay: '0.3s' }}>
            Exploring the intersection of code and cosmos. Building innovative solutions
            with cutting-edge technology.
          </p>

          <div className="cta-buttons slide-up" style={{ animationDelay: '0.6s' }}>
            <GlassButton
              primary
              onClick={() => {
                const el = document.querySelector('.projects');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              View My Work
            </GlassButton>
            <BackgroundMusic />
          </div>
        </div>

        <div className="video-container" onMouseEnter={() => setIsImageHovered(true)} onMouseLeave={() => setIsImageHovered(false)}>
          <div className="profile-float">
            <img src="/wireart.png" alt="Wire Art" className="profile-video" />
          </div>
          <SocialButtons />
        </div>
      </div>
    </section>
  );
};

export default Hero;
