import React from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationItem {
  degree: string;
  institution: string;
  date: string;
  grade?: string;
  description: string;
  icon: React.ReactNode;
}

const Education: React.FC = () => {
  const educationData: EducationItem[] = [
    {
      degree: 'B.Tech in Computer Science — Specialization in AI/ML',
      institution: 'UPES, Dehradun, India',
      date: 'Aug 2023 – Aug 2027',
      grade: '7.43 / 10 CGPA',
      description: 'Acquiring deep foundations in Algorithms, Computer Vision, Deep Learning, and Neural Networks. Spearheading practical projects involving vision-language models and transfer learning datasets.',
      icon: <GraduationCap size={18} />
    },
    {
      degree: 'Deep Learning Specialization (Professional Certification)',
      institution: 'DeepLearning.AI via Coursera',
      date: 'Completed Jul 2025',
      grade: 'Authorized by Andrew Ng',
      description: 'Mastered neural networks, hyperparameter tuning, convolutional networks (CNNs), sequence models (RNNs/LSTMs/Transformers), and structuring machine learning projects.',
      icon: <Award size={18} />
    },
    {
      degree: 'Senior Secondary Education (Class XII)',
      institution: 'Central Board of Secondary Education (CBSE)',
      date: 'Completed May 2023',
      grade: '88% Aggregate',
      description: 'Focused on core Sciences (Physics, Chemistry, Mathematics) and Computer Science (Python programming & basics of database management).',
      icon: <BookOpen size={18} />
    }
  ];

  return (
    <section id="education" className="section">
      <div className="section-title">
        <span className="subtitle">My Journey</span>
        <h2>Education</h2>
      </div>

      <div className="education-timeline">
        {educationData.map((item, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
          >
            <div className="timeline-dot"></div>
            
            <div className="glass-card timeline-content">
              <div className="timeline-header">
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: 'var(--cyan)', display: 'inline-flex' }}>{item.icon}</span>
                    {item.degree}
                  </h3>
                  <div className="timeline-institution">{item.institution}</div>
                </div>
                <span className="timeline-date">{item.date}</span>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '12px' }}>
                {item.description}
              </p>

              {item.grade && (
                <div className="timeline-grade">
                  Performance: <strong>{item.grade}</strong>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
