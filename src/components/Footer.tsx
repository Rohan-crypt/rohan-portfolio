import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom inline SVG components for Brand Icons
const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const email = 'ry5517063@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <footer id="contact" className="footer">
      <div className="portfolio-container">
        <div className="footer-grid">
          {/* Left Info Column */}
          <div className="footer-info">
            <h2>Get In Touch</h2>
            <p>
              I am currently looking for internship and project collaborations in Deep Learning, Computer Vision, and Generative AI. Feel free to connect or drop a message!
            </p>
            <div className="social-links">
              <a 
                href="https://linkedin.com/in/rohan-yadav-546866294" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={20} />
              </a>
              <a 
                href="https://github.com/Rohan-crypt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub Profile"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

          {/* Right Contact Card Column */}
          <div className="glass-card contact-card">
            {/* Email Contact Detail */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div className="contact-detail">
                <span className="contact-label">Email Address</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <a href={`mailto:${email}`} className="contact-value">{email}</a>
                  <button 
                    onClick={copyToClipboard}
                    className="email-copy-btn"
                    title="Copy Email to Clipboard"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Check size={14} style={{ color: 'var(--cyan)' }} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Copy size={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>

            {/* Phone Contact Detail */}
            <div className="contact-item">
              <div className="contact-icon-box">
                <Phone size={20} />
              </div>
              <div className="contact-detail">
                <span className="contact-label">Phone Call</span>
                <a href="tel:+919027007620" className="contact-value">+91 9027007620</a>
              </div>
            </div>

            {/* Quick response note */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              fontSize: '0.8rem', 
              color: 'var(--text-muted)',
              borderTop: '1px solid var(--border-glass)',
              paddingTop: '20px',
              marginTop: '10px'
            }}>
              <Send size={12} style={{ color: 'var(--cyan)' }} />
              <span>Typically responds within 24 hours.</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rohan Yadav. Engineered with React, Three.js & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
