import React from 'react';

interface ReversedSectionBackgroundProps {
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
  /** 翻转方向 */
  flipDirection?: 'horizontal' | 'vertical' | 'both' | 'none';
}

/**
 * 反方向网格背景组件
 * 基于 SectionBackground，添加了网格翻转功能
 * 用于创建与其他区域相反方向的网格背景效果
 */
export default function ReversedSectionBackground({
  imagePath = '/img/sectionbg.png',
  showGradient = true,
  gradientClass = 'bg-gradient-to-b from-transparent via-[#081122]/50 to-transparent',
  showGlow = true,
  glowSize = { width: '800px', height: '800px' },
  glowOpacity = '/5',
  flipDirection = 'horizontal'
}: ReversedSectionBackgroundProps) {

  // 根据翻转方向生成CSS transform
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
      {/* Background Image - 带翻转效果 */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${imagePath}')`,
          backgroundPosition: 'center',
          backgroundSize: '100% auto',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          transform: getTransform(),
          // 确保翻转后仍然覆盖整个区域
          transformOrigin: 'center'
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
            maxWidth: '100vw',
            maxHeight: '100vh'
          }}
        ></div>
      )}
    </>
  );
}