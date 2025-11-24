'use client';

import React from 'react';

interface PhoenixMobileLogoProps {
  show: boolean;
}

/**
 * 移动端燃烧的凤凰 Logo（无缝循环播放）
 * 使用 MP4 格式以获得最佳移动端兼容性
 */
export default function PhoenixMobileLogo({ show }: PhoenixMobileLogoProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        className="w-full h-auto"
        muted
        playsInline
        loop
        autoPlay
        poster="/img/fire.png"
        style={{ maxHeight: '100%' }}
      >
        <source src="/animations/dapplast.webm" type="video/webm" />
      </video>
    </div>
  );
}
