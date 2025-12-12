import React, { useEffect, useState } from 'react';
import './About.css';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  const achievements: Achievement[] = [
    { id: 1, title: "Projects", description: "Building innovative digital solutions", icon: "github" },
    { id: 2, title: "Languages", description: "Multiple programming paradigms", icon: "languages" },
    { id: 3, title: "Experience", description: "Years of development expertise", icon: "⚡" },
    { id: 4, title: "Learning", description: "Always exploring new technologies", icon: "🌟" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && count < 10) {
      const timer = setTimeout(() => setCount(count + 1), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, count]);

  return (
    <section className="about">
      <div className="section-header">
        <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
          About Me
        </h2>
        <div className="title-underline" />
      </div>

      <div className="about-container">
        <div className="about-text" style={{ animationDelay: isVisible ? '0.2s' : '0s' }}>
          <p className={isVisible ? 'slide-up' : ''}>
            I' am a Computer Science student with Specialization in CyberSecurity at SRMIST with a strong interest in software development, cybersecurity, and generative AI. I enjoy building practical and reliable solutions that turn ideas into something people can genuinely use.
          </p>
          <p className={isVisible ? 'slide-up' : ''} style={{ animationDelay: isVisible ? '0.3s' : '0s' }}>
            I currently work as a Technical Team Member at Hyperloopin and hold the Oracle Cloud Infrastructure 2025 Generative AI certification. I actively participate in developer communities and hackathons, including the Google GDG Hackathon, where I gained hands-on experience collaborating, solving real problems, and learning new technologies.
          </p>
        </div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`achievement-card ${isVisible ? 'slide-up' : ''}`}
              style={{
                animationDelay: isVisible ? `${0.3 + index * 0.1}s` : '0s',
              }}
            >
              <div className="achievement-icon">
                {achievement.icon === 'github' ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ) : achievement.icon === 'languages' ? (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {/* Python */}
                    <img src="https://appxcontent.kaxa.in/paid_course3/2024-10-15-0.3724774982995829.png" alt="Python" style={{ width: '40px', height: '40px' }} />
                    {/* C */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg" alt="C" style={{ width: '40px', height: '40px' }} />
                    {/* C++ */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/911px-ISO_C%2B%2B_Logo.svg.png" alt="C++" style={{ width: '40px', height: '40px' }} />
                    {/* Java */}
                    <img src="https://education.oracle.com/file/general/p-80-java.png" alt="Java" style={{ width: '40px', height: '40px' }} />
                  </div>
                ) : (
                  achievement.icon
                )}
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <div className="card-glow" />
            </div>
          ))}
        </div>
      </div>

      {/* Constellation animation */}
      <div className="constellation">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`constellation-${i}`}
            className="constellation-line"
            style={{
              '--line-angle': `${(i * 72)}deg`,
            } as React.CSSProperties}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="constellation-star"
            style={{
              '--star-angle': `${(i * 72)}deg`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
