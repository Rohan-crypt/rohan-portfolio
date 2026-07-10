import React, { useState } from 'react';
import { Laptop, Recycle, HeartPulse, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height={size} 
    width={size} 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

interface Project {
  title: string;
  tech: string[];
  date?: string;
  description: string;
  icon: React.ReactNode;
  githubUrl: string;
  highlights: string[];
  additionalDetails?: string;
}

const Projects: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: 'Enterprise Workforce Management Platform – AI Ops Assistant',
      tech: ['Node.js', 'Kafka', 'Docker', 'Kubernetes'],
      date: '2026',
      description: 'Collaborated on re-architecting a monolithic MERN application into a nine-service microservices system with domain-driven service boundaries and polyglot persistence.',
      icon: <Laptop size={22} />,
      githubUrl: 'https://github.com/pdsprabh/Enterprise-Workforce-Management-Platform',
      highlights: [
        'Designed an event-driven backbone using a Kafka message bus and an API gateway with JWT-based authentication and RBAC across services.',
        'Defined the Kubernetes infrastructure and deployment topology, and used AI-assisted development tooling (Antigravity) to accelerate scaffolding across the monorepo.'
      ]
    },
    {
      title: 'AI-Powered Hospital Management System',
      tech: ['Java', 'Gemini API', 'Notion API'],
      date: '2026',
      description: 'Authored a detailed PRD and technical design (with Mermaid architecture diagrams) for an AI-augmented hospital management system integrating the Gemini API for clinical decision support.',
      icon: <HeartPulse size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt/HMS',
      highlights: [
        'Specified a locally-deployable architecture for data privacy and control, with project documentation structured and maintained via the Notion API.'
      ]
    },
    {
      title: 'Sentimental-Alpha – AI Trading Research Terminal',
      tech: ['Python', 'PyTorch', 'FastAPI', 'Streamlit'],
      date: '2026',
      description: 'Built a trading research platform combining a PPO reinforcement learning agent with FinBERT-based news sentiment analysis to generate high-conviction trade signals.',
      icon: <Recycle size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt/Sentimental-Alpha',
      highlights: [
        'Engineered a 16-dimensional market state space (RSI, MACD, volume momentum, financial stress index) with a custom risk-gating mechanism linking volatility to the agent’s risk appetite.',
        'Served real-time inference via a FastAPI backend and built an interactive Streamlit dashboard for visualizing signals and validation metrics (Monte Carlo robustness, rolling Sharpe ratio).'
      ]
    },
    {
      title: 'Context-Aware Screen Assistant',
      tech: ['Python', 'Ollama', 'Llama 3', 'LLaVA'],
      date: '2025',
      description: 'Architected a privacy-first AI productivity suite synchronizing a vision model (LLaVA) and a language model (Llama 3) for real-time, fully local workspace analysis – zero data leaves the device.',
      icon: <Laptop size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt/screen-assistant',
      highlights: [
        'Implemented global hotkey-driven interaction for instant, on-demand AI analysis of any screen region without disrupting user workflow.'
      ]
    }
  ];

  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <section id="projects" className="section">
      <div className="section-title">
        <span className="subtitle">My Creations</span>
        <h2>Featured Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="glass-card project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="project-header">
              <div className="project-icon-wrapper">
                {project.icon}
              </div>
              {project.date && <span className="project-date">{project.date}</span>}
            </div>

            <h3 className="project-title">{project.title}</h3>
            
            <div className="project-tech-tags">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-tag" style={{ fontFamily: 'var(--font-mono)' }}>[{t}]</span>
              ))}
            </div>

            <p className="project-desc">{project.description}</p>

            <div className="project-highlights-title">Highlights:</div>
            <ul className="project-highlights">
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>

            {/* Expandable details */}
            <AnimatePresence>
              {expandedIndex === index && project.additionalDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ 
                    padding: '14px 16px', 
                    borderRadius: '0px', 
                    backgroundColor: '#04040a', 
                    borderLeft: '3px solid var(--magenta)',
                    borderRight: '1px solid var(--border-glass)',
                    borderTop: '1px solid var(--border-glass)',
                    borderBottom: '1px solid var(--border-glass)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6',
                    marginBottom: '20px'
                  }}>
                    <div style={{ color: 'var(--magenta)', fontWeight: 600, marginBottom: '6px', fontSize: '0.75rem' }}>// PROJECT_MANIFEST_DEBUG_SHELL //</div>
                    {project.additionalDetails}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="project-links">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
              >
                <GithubIcon size={16} /> Code
              </a>
              {project.additionalDetails && (
                <button 
                  onClick={() => toggleExpand(index)}
                  className="project-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {expandedIndex === index ? (
                    <>Less <ChevronUp size={16} /></>
                  ) : (
                    <>Details <ChevronDown size={16} /></>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
