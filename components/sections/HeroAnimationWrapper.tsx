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
 * Hero animation wrapper
 * Manages fullscreen animation playback and displays burning video in Hero area after completion
 */
export default function HeroAnimationWrapper({ children }: HeroAnimationWrapperProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleAnimationComplete = () => {
    console.log('Animation complete!'); // Debug log
    setAnimationComplete(true);
  };

  return (
    <HeroAnimationContext.Provider value={{ animationComplete, setAnimationComplete }}>
      {/* Fullscreen video animation (desktop only) */}
      <div className="hidden lg:block">
        <PhoenixCompleteAnimation onComplete={handleAnimationComplete} />
      </div>

      {/* Hero content */}
      {children}
    </HeroAnimationContext.Provider>
  );
}
