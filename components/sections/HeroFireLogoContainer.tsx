'use client';

import React from 'react';
import { PhoenixFireLogo, PhoenixMobileLogo } from '../animations';
import { useHeroAnimation } from './HeroAnimationWrapper';

/**
 * Hero Fire Logo Container
 * Desktop: Full-screen coverage, using total.webm and last.webm
 * Mobile: Directly display static logo (no fly-in animation)
 */
export default function HeroFireLogoContainer() {
  const { animationComplete } = useHeroAnimation();

  return (
    <>
      {/* Desktop: Show looping logo after animation completes */}
      {animationComplete && (
        <div className="hidden lg:block">
          <PhoenixFireLogo show={animationComplete} />
        </div>
      )}

      {/* Mobile: Directly display static logo (no animation) */}
      <div className="lg:hidden w-full h-full">
        <PhoenixMobileLogo show={true} />
      </div>
    </>
  );
}
