'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Web3SectionAnimatorProps {
  children: React.ReactNode;
  animationType: 'glitch' | 'matrix' | 'hologram' | 'quantum' | 'neon' | 'cyber';
  className?: string;
  delay?: number;
  viewport?: {
    once?: boolean;
    amount?: number;
  };
}

// Web3 style animation variant configuration
const getAnimationConfig = (type: string, delay: number = 0) => {
  const configs = {
    // 1. Glitch style - suitable for Features Section
    glitch: {
      initial: {
        opacity: 0,
        x: -100,
        rotateY: -45,
      },
      animate: {
        opacity: 1,
        x: 0,
        rotateY: 0,
      },
      transition: {
        duration: 1.2,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    },

    // 2. Matrix style - suitable for Roadmap Section
    matrix: {
      initial: {
        opacity: 0,
        scale: 0.3,
        y: 100,
      },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
      },
      transition: {
        duration: 1.5,
        delay,
        ease: [0.175, 0.885, 0.32, 1.275] as const,
      }
    },

    // 3. Hologram style - suitable for Governance Section
    hologram: {
      initial: {
        opacity: 0,
        rotateX: 90,
      },
      animate: {
        opacity: 1,
        rotateX: 0,
      },
      transition: {
        duration: 1.8,
        delay,
        ease: [0.23, 1, 0.32, 1] as const,
      }
    },

    // 4. Quantum style - suitable for Partners Section
    quantum: {
      initial: {
        opacity: 0,
        scale: 0,
        rotate: -180,
      },
      animate: {
        opacity: 1,
        scale: 1,
        rotate: 0,
      },
      transition: {
        duration: 1.6,
        delay,
        ease: [0.34, 1.56, 0.64, 1] as const,
      }
    },

    // 5. Neon style - suitable for CTA Section
    neon: {
      initial: {
        opacity: 0,
        y: -100,
        scale: 0.5,
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
      },
      transition: {
        duration: 1.4,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }
    },

    // 6. Cyber style - suitable for Vision Section
    cyber: {
      initial: {
        opacity: 0,
        x: 100,
        skewX: 20,
      },
      animate: {
        opacity: 1,
        x: 0,
        skewX: 0,
      },
      transition: {
        duration: 1.3,
        delay,
        ease: [0.6, 0.01, 0.05, 0.95] as const,
      }
    },
  };

  return configs[type as keyof typeof configs];
};

const Web3SectionAnimator: React.FC<Web3SectionAnimatorProps> = ({
  children,
  animationType,
  className = '',
  delay = 0,
  viewport = { once: true, amount: 0.3 }
}) => {
  const config = getAnimationConfig(animationType, delay);

  return (
    <motion.div
      className={className}
      initial={config.initial}
      whileInView={config.animate}
      viewport={viewport}
      transition={config.transition}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Web3SectionAnimator;
