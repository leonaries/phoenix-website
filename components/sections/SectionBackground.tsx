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
  glowOpacity = '/5'
}: SectionBackgroundProps) {
  return (
    <>
      {/* Background Image - 统一尺寸 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: 'center',
          backgroundSize: '100% auto', // 宽度100%，高度自动，保持统一
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll' // 移动端性能优化
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
