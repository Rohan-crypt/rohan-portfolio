import React from 'react';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Hero3D from './Hero3D';

const Hero: React.FC = () => {
  return (
    <section className="hero-section">
      {/* Content wrapper with motion entry animations */}
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 15, mass: 1 }}
      >
        <div className="hero-greeting" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '2px', color: 'var(--cyan)', marginBottom: '12px' }}>
          <Sparkles size={14} style={{ marginRight: '6px', display: 'inline', color: 'var(--cyan)' }} />
          <span>[ IDENTITY_LOADED // USER: ROHAN_YADAV ]</span>
        </div>
        
        <h1 className="hero-name" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Rohan Yadav</h1>
        
        <h2 className="hero-title" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>// DEPT: AI/ML ENGINEER & RESEARCHER</span>
        </h2>
        
        <p className="hero-objective">
          Computer Science undergraduate specializing in AI/ML with hands-on experience designing scalable, service-oriented systems and building production-style AI applications end to end. Recently re-architected a monolithic enterprise platform into a nine-service microservices system (Kafka event bus, Kubernetes, API gateway with JWT/RBAC), reflecting a systems-design and architecture mindset beyond typical coursework. Proficient in Python, Java, TensorFlow, and PyTorch, with a consistent record of shipping fully working projects rather than prototypes.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">
              Execute Contact <ArrowRight size={16} />
            </a>
            <a href="#projects" className="btn btn-secondary">
              Query Projects
            </a>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '16px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            <span>[ LOC: UPES_DEHRADUN ]</span>
            <span>[ STATUS: ONLINE_ ]</span>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas visualization */}
      <motion.div 
        className="hero-3d-container"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }}
      >
        <Hero3D />
        <div className="hero-canvas-hint">
          <HelpCircle size={12} />
          <span>Drag to rotate, hover to distort</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
