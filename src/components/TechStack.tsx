import React from 'react';
import { Code2, Brain, Layers, Database, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

const TechStack: React.FC = () => {
  const skills: SkillCategory[] = [
    {
      category: 'Languages',
      icon: <Code2 size={20} />,
      items: [
        { name: 'Python', level: 90 },
        { name: 'Java', level: 80 },
        { name: 'C', level: 70 }
      ]
    },
    {
      category: 'ML / AI',
      icon: <Brain size={20} />,
      items: [
        { name: 'TensorFlow & PyTorch', level: 85 },
        { name: 'Transfer Learning & CNNs', level: 85 },
        { name: 'LLMs & Ollama', level: 80 },
        { name: 'LLaVA & Llama 3', level: 75 }
      ]
    },
    {
      category: 'Libraries',
      icon: <Layers size={20} />,
      items: [
        { name: 'NumPy & Pandas', level: 85 },
        { name: 'OpenCV & Computer Vision', level: 80 },
        { name: 'scikit-learn', level: 80 },
        { name: 'MobileNetV2', level: 75 }
      ]
    },
    {
      category: 'Databases',
      icon: <Database size={20} />,
      items: [
        { name: 'MySQL', level: 75 },
        { name: 'MongoDB', level: 70 }
      ]
    },
    {
      category: 'Dev Tools',
      icon: <Terminal size={20} />,
      items: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'VS Code & Jupyter', level: 90 }
      ]
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  } as const;

  return (
    <section id="tech-stack" className="section">
      <div className="section-title">
        <span className="subtitle">Core Competencies</span>
        <h2>Tech Stack</h2>
      </div>

      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={index} 
            className="glass-card skill-category-card"
            variants={cardVariants}
          >
            <div className="skill-category-header">
              {skill.icon}
              <h3>{skill.category}</h3>
            </div>
            
            <div className="skill-items-container">
              {skill.items.map((item, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{item.name}</span>
                    <span className="skill-level-text">{item.level}%</span>
                  </div>
                  <div style={{ display: 'flex', gap: '3px', width: '100%', marginTop: '4px' }}>
                    {Array.from({ length: 10 }).map((_, blockIndex) => {
                      const isFilled = (blockIndex + 1) * 10 <= item.level;
                      return (
                        <motion.div
                          key={blockIndex}
                          initial={{ opacity: 0, scaleY: 0.3 }}
                          whileInView={{ opacity: 1, scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: blockIndex * 0.04, duration: 0.15, ease: 'easeOut' }}
                          style={{
                            height: '6px',
                            flexGrow: 1,
                            backgroundColor: isFilled ? 'var(--cyan)' : 'var(--border-glass)',
                            border: isFilled ? '1px solid rgba(0, 245, 212, 0.4)' : '1px solid transparent',
                            boxShadow: isFilled ? '0 0 4px var(--cyan-glow)' : 'none'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TechStack;
