'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServerHeroSectionClientProps {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
}

/**
 * Hero Section client wrapper
 * Controls content fade-in display after 1 second
 */
export default function ServerHeroSectionClient({ children, onAnimationComplete }: ServerHeroSectionClientProps) {
  const [showContent, setShowContent] = useState(false);

  // Show content after 1 second
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showContent ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
