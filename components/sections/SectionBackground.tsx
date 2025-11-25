import React from 'react';

interface SectionBackgroundProps {
  /** 背景图片路径 */
  imagePath?: string;
  /** 是否显示渐变叠加层 */
  showGradient?: boolean;
  /** 自定义渐变样式 */
  gradientClass?: string;
  /** 是否显示光晕效果 */
  showGlow?: boolean;
  /** 光晕效果大小 */
  glowSize?: {
    width: string;
    height: string;
  };
  /** 光晕颜色透明度 */
  glowOpacity?: string;
  /** 背景位置 - PC端 */
  backgroundPositionDesktop?: string;
  /** 背景位置 - 移动端 */
  backgroundPositionMobile?: string;
}

/**
 * Section 通用背景组件
 * 统一管理所有 section 的背景样式
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
      {/* Background Image - PC端 */}
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

      {/* Background Image - 移动端 */}
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
      
      {/* Glow Effect - 响应式尺寸 */}
      {showGlow && (
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#fc9e01]${glowOpacity} to-transparent blur-3xl`}
          style={{
            width: glowSize.width,
            height: glowSize.height,
            maxWidth: '100vw', // 移动端不超出屏幕
            maxHeight: '100vh'
          }}
        ></div>
      )}
    </>
  );
}
