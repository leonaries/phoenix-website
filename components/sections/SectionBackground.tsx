import React from 'react';

interface SectionBackgroundProps {
  /** Background image path */
  imagePath?: string;
  /** Whether to show gradient overlay */
  showGradient?: boolean;
  /** Custom gradient style */
  gradientClass?: string;
  /** Whether to show glow effect */
  showGlow?: boolean;
  /** Glow effect size */
  glowSize?: {
    width: string;
    height: string;
  };
  /** Glow color opacity */
  glowOpacity?: string;
  /** Background position - Desktop */
  backgroundPositionDesktop?: string;
  /** Background position - Mobile */
  backgroundPositionMobile?: string;
}

/**
 * Common background component for sections
 * Manages all section background styles uniformly
 */
export default function SectionBackground({
  imagePath = '/img/sectionbg.png',
  showGradient = true,
  gradientClass = 'bg-gradient-to-b from-transparent via-[#081122]/50 to-transparent',
  showGlow = true,
  glowSize = { width: '800px', height: '800px' },
  glowOpacity = '/5',
  backgroundPositionDesktop = 'center',
  backgroundPositionMobile = 'center'
}: SectionBackgroundProps) {
  return (
    <>
      {/* Background Image - Desktop */}
      <div
        className="hidden lg:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: backgroundPositionDesktop,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      />

      {/* Background Image - Mobile */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: backgroundPositionMobile,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll'
        }}
      />
      
      {/* Gradient Overlay */}
      {showGradient && (
        <div className={`absolute inset-0 ${gradientClass}`}></div>
      )}
      
      {/* Glow Effect - Responsive size */}
      {showGlow && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#fc9e01]${glowOpacity} to-transparent blur-3xl`}
          style={{
            width: glowSize.width,
            height: glowSize.height,
            maxWidth: '100vw', // Don't exceed viewport width on mobile
            maxHeight: '100vh'
          }}
        ></div>
      )}
    </>
  );
}
