import React, { useEffect, useState } from 'react';
import './Contact.css';

interface ContactLink {
  label: string;
  value: string;
  icon: string;
  url: string;
  type: 'email' | 'phone' | 'github' | 'linkedin';
  color?: string;
}

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const contactLinks: ContactLink[] = [
    {
      label: 'Email',
      value: 'ryvarma7@gmail.com',
      icon: '',
      url: 'mailto:ryvarma7@gmail.com',
      type: 'email',
      color: '#FF6B6B',
    },
    {
      label: 'Phone',
      value: '+919908034912',
      icon: '',
      url: 'tel:+919908034912',
      type: 'phone',
      color: '#4ECDC4',
    },
    {
      label: 'GitHub',
      value: 'github.com/ryvarma7',
      icon: 'github',
      url: 'https://github.com/ryvarma7',
      type: 'github',
      color: '#95E1D3',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/ryvarma7',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/in/ryvarma7',
      type: 'linkedin',
      color: '#38B6FF',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.querySelector('.contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact">
      <div className="contact-background">
        <div className="gradient-orb gradient-orb-1" />
        <div className="gradient-orb gradient-orb-2" />
      </div>

      <div className="contact-wrapper">
        <div className="section-header new-contact-header">
          <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
            Let's Connect
          </h2>
          <div className="title-underline" />
          <p className={`section-subtitle ${isVisible ? 'fade-in-delay' : ''}`}>
            Feel free to reach out through any of these channels
          </p>
        </div>

        <div className={`contact-grid ${isVisible ? 'fade-in' : ''}`}>
          {contactLinks.map((link, index) => (
            <a
              key={link.type}
              href={link.url}
              target={link.type === 'phone' || link.type === 'email' ? undefined : '_blank'}
              rel={link.type === 'phone' || link.type === 'email' ? undefined : 'noopener noreferrer'}
              className={`contact-card ${isVisible ? 'slide-in' : ''}`}
              style={{
                animationDelay: isVisible ? `${0.1 + index * 0.1}s` : '0s',
                '--card-color': link.color,
              } as React.CSSProperties & { '--card-color': string }}
            >
              <div className="card-gradient" />
              <div className="card-content">
                <div className="card-icon-wrapper">
                  <div className="card-icon">
                    {link.type === 'github' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    )}
                    {link.type === 'linkedin' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a2.91 2.91 0 012.7-1.5c2.09 0 3.71 1.36 3.71 4.6z" />
                      </svg>
                    )}
                    {link.type === 'email' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                    )}
                    {link.type === 'phone' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                  </div>
                  <div className="icon-glow" />
                </div>
                <div className="card-info">
                  <div className="card-label">{link.label}</div>
                  <div className="card-value">{link.value}</div>
                </div>
                <div className="card-arrow">
                  <span>→</span>
                </div>
              </div>
              <div className="card-border" />
            </a>
          ))}
        </div>

        <div className={`cta-section ${isVisible ? 'fade-in' : ''}`}>
          <div className="status-line" />
          <div className="status-content">
            <div className="status-pulse">
              <div className="pulse-ring pulse-ring-1" />
              <div className="pulse-ring pulse-ring-2" />
              <div className="status-dot" />
            </div>
            <div className="status-text-wrapper">
              <span className="status-text-main">Open to Opportunities</span>
              <span className="status-text-sub">Let's create something amazing together</span>
            </div>
          </div>
          <div className="status-line" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
