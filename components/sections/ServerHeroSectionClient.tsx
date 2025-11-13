'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServerHeroSectionClientProps {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
}

/**
 * Hero Section 客户端包装器
 * 控制内容在动画1秒后淡入显示
 */
export default function ServerHeroSectionClient({ children, onAnimationComplete }: ServerHeroSectionClientProps) {
  const [showContent, setShowContent] = useState(false);

  // 1秒后显示内容
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
