import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Dr. John Doe',
      role: 'Director of AI Solutions @ TechCorp',
      quote: 'Rohan is an exceptional AI developer. His ability to deploy vision-language models locally on constraint devices for the screen assistant was highly innovative and performed beyond our benchmarks.'
    },
    {
      name: 'Prof. S. K. Sharma',
      role: 'Department of Computer Science @ UPES',
      quote: 'Rohan consistently demonstrates an outstanding grasp of transfer learning methodologies. His research mindset and dedication to clean engineering principles set him apart.'
    },
    {
      name: 'Aman Verma',
      role: 'Lead ML Engineer @ EcoSmart Solutions',
      quote: 'We collaborated with Rohan on the e-waste classification demo. His integration of CNNs with real-time OpenCV frames created a highly responsive and reliable prototype that exceeded expectations.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 = right, -1 = left

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Slide animations
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' as const }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' as const }
    })
  } as const;

  return (
    <section id="testimonials" className="section">
      <div className="section-title">
        <span className="subtitle">Collaborator Reviews</span>
        <h2>Testimonials</h2>
      </div>

      <div className="testimonials-slider-container">
        <div className="glass-card testimonial-card-slider">
          <Quote className="testimonial-quote-icon" />
          
          <div style={{ minHeight: '130px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ width: '100%' }}
              >
                <p className="testimonial-quote">
                  "{testimonials[activeIndex].quote}"
                </p>
                <div className="testimonial-author">
                  <span className="testimonial-author-name">{testimonials[activeIndex].name}</span>
                  <span className="testimonial-author-role">{testimonials[activeIndex].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="slider-controls">
          <button onClick={handlePrev} className="slider-btn" aria-label="Previous Testimonial">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="slider-btn" aria-label="Next Testimonial">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Sliding Navigation Dots */}
        <div className="slider-dots">
          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`slider-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
