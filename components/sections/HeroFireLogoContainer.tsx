'use client';

import React from 'react';
import { PhoenixFireLogo, PhoenixMobileLogo } from '../animations';
import { useHeroAnimation } from './HeroAnimationWrapper';

/**
 * Hero 燃烧 Logo 容器
 * 桌面端：全屏覆盖，使用 total.webm 和 last.webm
 * 移动端：直接显示静态 logo（无飞入动画）
 */
export default function HeroFireLogoContainer() {
  const { animationComplete } = useHeroAnimation();

  return (
    <>
      {/* 桌面端：动画完成后显示循环 Logo */}
      {animationComplete && (
        <div className="hidden lg:block">
          <PhoenixFireLogo show={animationComplete} />
        </div>
      )}
      
      {/* 移动端：直接显示静态 Logo（无动画） */}
      <div className="lg:hidden w-full h-full">
        <PhoenixMobileLogo show={true} />
      </div>
    </>
  );
}
