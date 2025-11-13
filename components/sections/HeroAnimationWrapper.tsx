'use client';

import React, { useState, createContext, useContext } from 'react';
import { PhoenixCompleteAnimation } from '../animations';

interface HeroAnimationContextType {
  animationComplete: boolean;
  setAnimationComplete: (value: boolean) => void;
}

const HeroAnimationContext = createContext<HeroAnimationContextType>({
  animationComplete: false,
  setAnimationComplete: () => {},
});

export const useHeroAnimation = () => useContext(HeroAnimationContext);

interface HeroAnimationWrapperProps {
  children: React.ReactNode;
}

/**
 * Hero 动画包装器
 * 管理全屏动画播放和完成后在 Hero 区域显示燃烧视频
 */
export default function HeroAnimationWrapper({ children }: HeroAnimationWrapperProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    console.log('Animation complete!'); // 调试
    setAnimationComplete(true);
  };

  return (
    <HeroAnimationContext.Provider value={{ animationComplete, setAnimationComplete }}>
      {/* 全屏视频动画（仅桌面端） */}
      <div className="hidden lg:block">
        <PhoenixCompleteAnimation onComplete={handleAnimationComplete} />
      </div>

      {/* Hero 内容 */}
      {children}
    </HeroAnimationContext.Provider>
  );
}
