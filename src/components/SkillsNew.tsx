import React, { useEffect, useState, useRef } from 'react';
import './SkillsNew.css';

interface SkillItem {
  name: string;
  category: 'Languages' | 'Frameworks' | 'Tools';
  description: string;
  proficiency: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
}

const SkillsNew: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const skillsData: SkillItem[] = [
    // Languages
    {
      name: 'Python',
      category: 'Languages',
      description: 'Backend development, data processing, automation, and machine learning',
      proficiency: 'Expert',
    },
    {
      name: 'C++',
      category: 'Languages',
      description: 'Systems and performance-sensitive applications',
      proficiency: 'Intermediate',
    },
    {
      name: 'Java',
      category: 'Languages',
      description: 'Object-oriented programming and enterprise applications',
      proficiency: 'Intermediate',
    },
    {
      name: 'C',
      category: 'Languages',
      description: 'Systems programming and performance-critical applications',
      proficiency: 'Intermediate',
    },
    {
      name: 'DSA',
      category: 'Languages',
      description: 'Data structures & algorithms problem solving',
      proficiency: 'Intermediate',
    },
    {
      name: 'SQL',
      category: 'Languages',
      description: 'Database design, optimization, and complex queries',
      proficiency: 'Beginner',
    },

    // Frameworks (Python-focused)
    {
      name: 'Flask',
      category: 'Frameworks',
      description: 'Lightweight Python web framework',
      proficiency: 'Intermediate',
    },
    {
      name: 'Django',
      category: 'Frameworks',
      description: 'Full-featured Python web framework',
      proficiency: 'Intermediate',
    },
    {
      name: 'FastAPI',
      category: 'Frameworks',
      description: 'Fast Python API framework with ASGI',
      proficiency: 'Intermediate',
    },

    // Tools + Python Libraries (placed under Tools category)
    {
      name: 'Git & GitHub',
      category: 'Tools',
      description: 'Version control, collaboration, and repository management',
      proficiency: 'Expert',
    },
    {
      name: 'VS Code',
      category: 'Tools',
      description: 'Primary development environment and code editor',
      proficiency: 'Expert',
    },
    {
      name: 'Linux',
      category: 'Tools',
      description: 'Operating system for development and deployment',
      proficiency: 'Advanced',
    },
    {
      name: 'Docker',
      category: 'Tools',
      description: 'Containerization for consistent deployments',
      proficiency: 'Intermediate',
    },
    {
      name: 'Oracle Cloud',
      category: 'Tools',
      description: 'Cloud infrastructure and deployment (OCI Certified)',
      proficiency: 'Advanced',
    },
    // Python libraries
    {
      name: 'NumPy',
      category: 'Tools',
      description: 'Numerical computing for Python',
      proficiency: 'Intermediate',
    },
    {
      name: 'Pandas',
      category: 'Tools',
      description: 'Data manipulation and analysis',
      proficiency: 'Intermediate',
    },
    {
      name: 'Matplotlib',
      category: 'Tools',
      description: 'Visualization library for Python',
      proficiency: 'Intermediate',
    },
    {
      name: 'Scikit-learn',
      category: 'Tools',
      description: 'Classical ML algorithms and utilities',
      proficiency: 'Intermediate',
    },
    {
      name: 'TensorFlow',
      category: 'Tools',
      description: 'Deep learning framework',
      proficiency: 'Intermediate',
    },
    {
      name: 'PyTorch',
      category: 'Tools',
      description: 'Deep learning framework',
      proficiency: 'Intermediate',
    },
    {
      name: 'OpenCV (cv2)',
      category: 'Tools',
      description: 'Computer vision library',
      proficiency: 'Intermediate',
    },
    {
      name: 'MediaPipe',
      category: 'Tools',
      description: 'Perception pipelines for ML',
      proficiency: 'Intermediate',
    },
  ];

  // Normalize proficiencies: make everything Intermediate except Python which stays Expert
  const normalizedSkills = skillsData.map((s): SkillItem => ({
    ...s,
    proficiency: s.name === 'Python' ? 'Expert' : 'Intermediate',
  }));

  const languageSkills = normalizedSkills.filter((s) => s.category === 'Languages');
  const frameworkSkills = normalizedSkills.filter((s) => s.category === 'Frameworks');
  const toolSkills = normalizedSkills.filter((s) => s.category === 'Tools');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const SkillCard = ({ skill, index }: { skill: SkillItem; index: number }) => (
    <div
      className={`skill-card ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: isVisible ? `${index * 0.05}s` : '0s' }}
    >
      <div className="skill-header">
        <h4 className="skill-name">{skill.name}</h4>
        <span className={`proficiency-badge proficiency-${skill.proficiency.toLowerCase()}`}>
          {skill.proficiency}
        </span>
      </div>
      <p className="skill-description">{skill.description}</p>
    </div>
  );

  return (
    <section className="skills-new" ref={containerRef}>

      <div className="skills-container">
        <div className="skills-header">
          <h2 className={`skills-title ${isVisible ? 'visible' : ''}`}>Skills & Technologies</h2>
          <p className={`skills-subtitle ${isVisible ? 'visible' : ''}`}>
            A comprehensive overview of my technical expertise across languages, frameworks, and tools
          </p>
        </div>

        <div className="skills-sections">
          {/* Languages Section */}
          <div className={`skill-section ${isVisible ? 'visible' : ''}`}>
            <div className="section-header">
              <h3 className="section-title">Languages</h3>
              <div className="section-divider" />
            </div>
            <div className="skills-list">
              {languageSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Frameworks Section */}
          <div className={`skill-section ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: isVisible ? '0.1s' : '0s' }}>
            <div className="section-header">
              <h3 className="section-title">Frameworks & Libraries</h3>
              <div className="section-divider" />
            </div>
            <div className="skills-list">
              {frameworkSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index + languageSkills.length} />
              ))}
            </div>
          </div>

          {/* Tools Section */}
          <div className={`skill-section ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: isVisible ? '0.2s' : '0s' }}>
            <div className="section-header">
              <h3 className="section-title">Tools & Platforms</h3>
              <div className="section-divider" />
            </div>
            <div className="skills-list">
              {toolSkills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index + languageSkills.length + frameworkSkills.length} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsNew;
