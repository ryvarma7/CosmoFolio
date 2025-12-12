import React, { useEffect, useState } from 'react';
import './Projects.css';

interface GitHubProject {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
}

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<GitHubProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<GitHubProject | null>(null);
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('.projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      try {
        // Try to fetch with better headers
        const response = await fetch('https://api.github.com/users/ryvarma7/repos?sort=updated&order=desc&per_page=100', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          console.error('Unexpected API response format:', data);
          setProjects([]);
          setLoading(false);
          return;
        }
        
        const formattedProjects: GitHubProject[] = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || 'No description available',
          url: repo.html_url,
          language: repo.language || 'Not specified',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          topics: repo.topics || [],
        }));
        
        console.log('Fetched projects:', formattedProjects);
        setProjects(formattedProjects);
      } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        // Fallback: Use hardcoded projects if API fails
        const fallbackProjects: GitHubProject[] = [
          {
            id: 1,
            name: 'CosmoFolio',
            description: 'Portfolio website with cosmic theme',
            url: 'https://github.com/ryvarma7/CosmoFolio',
            language: 'CSS',
            stars: 0,
            forks: 0,
            topics: ['portfolio', 'cosmotheme'],
          },
          {
            id: 2,
            name: 'SafeShare',
            description: 'Secure file sharing application',
            url: 'https://github.com/ryvarma7/SafeShare',
            language: 'Java',
            stars: 0,
            forks: 1,
            topics: ['security', 'file-sharing'],
          },
          {
            id: 3,
            name: 'dijkstraVisualizer',
            description: 'Visualization of Dijkstra\'s algorithm',
            url: 'https://github.com/ryvarma7/dijkstraVisualizer',
            language: 'JavaScript',
            stars: 0,
            forks: 0,
            topics: ['algorithm', 'visualization'],
          },
          {
            id: 4,
            name: 'AI-Traffic-Light-Recognition',
            description: 'AI model for traffic light detection and recognition',
            url: 'https://github.com/ryvarma7/AI-Traffic-Light-Recognition',
            language: 'Python',
            stars: 0,
            forks: 0,
            topics: ['ai', 'opencv', 'traffic-detection'],
          },
          {
            id: 5,
            name: 'SecureYatra',
            description: 'Travel safety application with security features',
            url: 'https://github.com/ryvarma7/SecureYatra',
            language: 'JavaScript',
            stars: 0,
            forks: 0,
            topics: ['travel', 'security'],
          },
          {
            id: 6,
            name: 'SudoAI',
            description: 'Personal Gemini Powered AI Chat Bot',
            url: 'https://github.com/ryvarma7/SudoAI',
            language: 'CSS',
            stars: 1,
            forks: 0,
            topics: ['ai', 'chatbot', 'gemini'],
          },
        ];
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C': '#555555',
      'C++': '#f34b7d',
      'Go': '#00ADD8',
      'Rust': '#dea584',
      'CSS': '#563d7c',
      'HTML': '#e34c26',
    };
    return colors[language] || '#858585';
  };

  return (
    <section className="projects">
      <div className="section-header">
        <div className="header-with-logo">
          <svg className="github-logo" viewBox="0 0 24 24" fill="currentColor" width="40" height="40">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <h2 className={`section-title ${isVisible ? 'slide-up' : ''}`}>
            GitHub Projects
          </h2>
        </div>
        <div className="title-underline" />
      </div>

      <div className="projects-container" ref={containerRef}>
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading projects...</p>
          </div>
        ) : (
          <div className="github-projects-grid">
              {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`github-project-card ${isVisible ? 'slide-up' : ''}`}
                  style={{
                    animationDelay: isVisible ? `${0.1 + index * 0.05}s` : '0s',
                  }}
                  onClick={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    const container = containerRef.current;
                    if (container && el) {
                      const cardRect = el.getBoundingClientRect();
                      const containerRect = container.getBoundingClientRect();
                      const top = cardRect.top - containerRect.top + container.scrollTop + el.offsetHeight + 12;
                      const left = cardRect.left - containerRect.left + container.scrollLeft;
                      setPopupPos({ top, left });
                    }
                    setSelectedProject(project);
                  }}
                >
                  <div className="github-card-header">
                    <h3 className="github-project-name">{project.name}</h3>
                    <div className="github-links">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="github-icon-link" title="View on GitHub">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <p className="github-project-description">{project.description}</p>

                  <div className="github-project-meta">
                    <div className="language-badge">
                      <span className="language-dot" style={{ backgroundColor: getLanguageColor(project.language) }}></span>
                      <span>{project.language}</span>
                    </div>
                    <div className="project-stats">
                      <span className="stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {project.stars}
                      </span>
                      <span className="stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        {project.forks}
                      </span>
                    </div>
                  </div>

                  {project.topics.length > 0 && (
                    <div className="github-topics">
                      {project.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="github-topic">{topic}</span>
                      ))}
                    </div>
                  )}

                  <div className="card-hover-glow" />
                </div>
              ))
            ) : (
              <div className="no-projects">
                <p>No public repositories found.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Detail Popup (positioned near clicked card) */}
      {selectedProject && popupPos && (
        <div className="github-popup-overlay" onClick={() => { setSelectedProject(null); setPopupPos(null); }}>
          <div
            className="github-popup"
            onClick={(e) => e.stopPropagation()}
            style={{ top: popupPos.top, left: popupPos.left }}
          >
            <button className="modal-close" onClick={() => { setSelectedProject(null); setPopupPos(null); }}>✕</button>
            <div className="github-modal-content">
              <div className="modal-header-github">
                <h3>{selectedProject.name}</h3>
                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="modal-github-link">
                  View on GitHub →
                </a>
              </div>
              <p className="modal-description-github">{selectedProject.description}</p>
              
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">{selectedProject.language}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Stars:</span>
                  <span className="detail-value">{selectedProject.stars}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Forks:</span>
                  <span className="detail-value">{selectedProject.forks}</span>
                </div>
              </div>

              {selectedProject.topics.length > 0 && (
                <div className="modal-topics">
                  <h4>Topics</h4>
                  <div className="topics-list">
                    {selectedProject.topics.map((topic) => (
                      <span key={topic} className="topic-badge">{topic}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
