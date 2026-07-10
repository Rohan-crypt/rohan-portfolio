import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import InteractiveTraining from './components/InteractiveTraining';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { useTheme } from './components/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Background glowing gradients */}
      <div className="bg-mesh"></div>

      <div className="portfolio-container">
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            RY
          </div>
          <div className="nav-links">
            <a href="#education">Education</a>
            <a href="#tech-stack">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#ml-playground">Playground</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            
            {/* Theme Toggler Button */}
            <motion.button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
        
        <main>
          <Hero />
          <div className="section-divider"></div>
          
          <Education />
          <div className="section-divider"></div>
          
          <TechStack />
          <div className="section-divider"></div>
          
          <Projects />
          <div className="section-divider"></div>

          {/* Interactive ML Training Lab Widget */}
          <InteractiveTraining />
          <div className="section-divider"></div>
          
          <Testimonials />
        </main>
      </div>
      
      <Footer />
    </>
  );
}

export default App;
