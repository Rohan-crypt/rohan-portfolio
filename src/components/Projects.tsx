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
      title: 'Context-Aware Screen Assistant',
      tech: ['Python', 'Ollama', 'Llama 3', 'LLaVA'],
      description: 'Architected a privacy-first AI productivity suite that synchronizes LLaVA (vision) and Llama 3 (language) for real-time workspace analysis and complex UI interpretation — running fully local.',
      icon: <Laptop size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt',
      highlights: [
        'Implemented global hotkey-driven interaction.',
        'Designed zero-latency vision analysis.',
        'Ensured zero data leaves the local device.'
      ],
      additionalDetails: 'Built leveraging Python bindings for Ollama API. The system handles desktop window capture, runs vision models locally to parse text, tables, and buttons, and allows natural language questions about the user\'s screen state.'
    },
    {
      title: 'E-Waste Classification System',
      tech: ['Python', 'TensorFlow', 'MobileNetV2', 'OpenCV'],
      date: 'Sep 2025 – Nov 2025',
      description: 'Built a transfer learning pipeline using MobileNetV2 to classify electronic waste into recyclable categories, enabling automated segregation for sustainability.',
      icon: <Recycle size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt',
      highlights: [
        'Fine-tuned pre-trained weights on custom e-waste data.',
        'Integrated OpenCV for real-time camera inference.',
        'Achieved 92.4% validation classification accuracy.'
      ],
      additionalDetails: 'Created custom preprocessing pipelines to resize and normalize images. Deployed the lightweight MobileNetV2 model to enable edge inference on small machines, showing promising results for real-time sorting bins.'
    },
    {
      title: 'Hospital Management System',
      tech: ['Java', 'OOP', 'Swing', 'MySQL'],
      date: 'Feb 2025 – Apr 2025',
      description: 'Designed and developed a full-featured desktop application to manage patient records, scheduling, and billing, following SOLID OOP principles.',
      icon: <HeartPulse size={22} />,
      githubUrl: 'https://github.com/Rohan-crypt',
      highlights: [
        'Built an intuitive Swing-based responsive GUI.',
        'Streamlined administrative workflows and billing.',
        'Implemented role-based login security.'
      ],
      additionalDetails: 'Utilized Java Swing for components layout. Modeled data tables with normalization in MySQL, handling transactional operations for scheduling appointments, updating patient histories, and printing PDF receipts.'
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
