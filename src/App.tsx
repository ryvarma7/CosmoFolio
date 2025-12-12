// App entry
import './styles/globals.css';
import './App.css';

// Components
import StarBackground from './components/StarBackground';
import Navigation from './components/Navigation';
import ScrollCue from './components/ScrollCue';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import About from './components/About';
import SkillsNew from './components/SkillsNew';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Removed parallax grid scroll handler (grid layer removed)

  return (
    <div className="app">
      {/* Parallax Grid Background removed */}

      {/* Fixed background */}
      <StarBackground />

      {/* Optimized scroll indicator */}
      <ScrollCue />

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="main-content">
        <section id="hero">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <SkillsNew />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Yeshwanth. Crafted with passion in the cosmos.</p>
          <div className="footer-decoration">
            <div className="star" />
            <div className="star" />
            <div className="star" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
