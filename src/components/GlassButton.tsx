import React from 'react';
import './GlassButton.css';

interface GlassButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  primary = false,
  secondary = false,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`glass-button ${primary ? 'glass-button-primary' : ''} ${secondary ? 'glass-button-secondary' : ''} ${className}`}
      onClick={onClick}
    >
      <span className="button-text">{children}</span>
      <p className="button-label-primary">{children}</p>
      <p className="button-label-secondary">{children}</p>
      <svg
        className="button-wave"
        viewBox="0 0 2400 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wave-grad" y2="100%" x2="50%" y1="0%" x1="50%">
            <stop offset="0%" stopOpacity="1" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopOpacity="1" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>
        <g transform="matrix(1,0,0,1,0,-91.0877685546875)" fill="url(#wave-grad)">
          <path d="M 0 305.9828838196134 Q 227.6031525693441 450 600 302.17553022897005 Q 1010.7738828515054 450 1200 343.3024459932802 Q 1379.4406250195766 450 1800 320.38902780838214 Q 2153.573162029817 450 2400 314.38564046970816 L 2400 800 L 0 800 L 0 340.3112176762882 Z" />
        </g>
      </svg>
    </button>
  );
};

export default GlassButton;
