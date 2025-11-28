import React from 'react';

interface ReversedSectionBackgroundProps {
  /** Background image path */
  imagePath?: string;
  /** Whether to show gradient overlay */
  showGradient?: boolean;
  /** Custom gradient class */
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
  /** Flip direction */
  flipDirection?: 'horizontal' | 'vertical' | 'both' | 'none';
  /** Background position - Desktop */
  backgroundPositionDesktop?: string;
  /** Background position - Mobile */
  backgroundPositionMobile?: string;
}

/**
 * Reversed grid background component
 * Based on SectionBackground, adds grid flipping functionality
 * Used to create grid background effects in opposite direction from other sections
 */
export default function ReversedSectionBackground({
  imagePath = '/img/sectionbg.png',
  showGradient = true,
  gradientClass = 'bg-gradient-to-b from-transparent via-[#081122]/50 to-transparent',
  showGlow = true,
  glowSize = { width: '800px', height: '800px' },
  glowOpacity = '/5',
  flipDirection = 'horizontal',
  backgroundPositionDesktop = 'center',
  backgroundPositionMobile = 'center'
}: ReversedSectionBackgroundProps) {

  // Generate CSS transform based on flip direction
  const getTransform = () => {
    switch (flipDirection) {
      case 'horizontal':
        return 'rotateX(180deg)';
      case 'vertical':
        return 'scaleY(-1)';
      case 'both':
        return 'scale(-1, -1)';
      case 'none':
      default:
        return 'none';
    }
  };

  return (
    <>
      {/* Background Image - Desktop with flip effect */}
      <div
        className="hidden lg:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: backgroundPositionDesktop,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          transform: getTransform(),
          transformOrigin: 'center'
        }}
      />

      {/* Background Image - Mobile with flip effect */}
      <div
        className="lg:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: backgroundPositionMobile,
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          transform: getTransform(),
          transformOrigin: 'center'
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
            maxWidth: '100vw',
            maxHeight: '100vh'
          }}
        ></div>
      )}
    </>
  );
}