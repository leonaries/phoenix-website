'use client';

import React, { useEffect, useState, useRef } from 'react';
import { isMobile } from '@/utils/browserDetect';
import { LazyFrameSequencePlayer } from './index';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixMobileLogoProps {
  show: boolean;
}

/**
 * 移动端燃烧的凤凰 Logo（无缝循环播放）
 * - 所有移动端设备: 统一使用帧序列播放（解决移动端浏览器视频兼容性问题）
 * - 桌面端浏览器: 使用 WebM 视频（更小的文件大小）
 */
export default function PhoenixMobileLogo({ show }: PhoenixMobileLogoProps) {
  const [useFrames, setUseFrames] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 所有移动端设备统一使用帧序列（解决视频兼容性问题）
    const shouldUseFrames = isMobile();
    setUseFrames(shouldUseFrames);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[PhoenixMobileLogo] Mobile detected: ${shouldUseFrames}, UseFrames: ${shouldUseFrames}`);
    }
  }, []);

  const handleLoadingProgress = (progress: number, loadedCount: number) => {
    setLoadingProgress(progress);
    if (process.env.NODE_ENV === 'development') {
      console.log(`[PhoenixMobileLogo] Loading: ${progress}% (${loadedCount}/96 frames)`);
    }
  };

  const handleLoaded = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('[PhoenixMobileLogo] First batch loaded, starting playback');
    }
    // 首批帧加载完成后自动开始播放
    playerRef.current?.play();
  };

  // 所有移动端设备: 使用帧序列播放器（懒加载优化）
  if (useFrames) {
    return (
      <div className="w-full h-full flex items-center justify-center relative">
        <LazyFrameSequencePlayer
          ref={playerRef}
          frameFolder={VERSIONED_ASSETS.FRAMES_DAPP_MOBILE}
          totalFrames={96}
          fps={30}
          format="webp"
          startFrameNumber={0}
          frameNamePattern={(index, fmt) => `xh_${String(index).padStart(3, '0')}.${fmt}`}
          loop={true}
          onLoaded={handleLoaded}
          onLoadingProgress={handleLoadingProgress}
          batchSize={30}
          bufferAhead={40}
          bufferBehind={30}
          maxConcurrent={4}
        />

        {/* 开发模式：加载进度指示器 */}
        {process.env.NODE_ENV === 'development' && loadingProgress < 100 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded">
            Loading: {loadingProgress}%
          </div>
        )}
      </div>
    );
  }

  // 桌面端浏览器: 使用 WebM 视频（理论上移动端不会走到这里，因为都会被 useFrames 拦截）
  return (
    <div className="w-full h-full flex items-center justify-center">
      <video
        className="w-full h-auto"
        muted
        playsInline
        loop
        autoPlay
        poster="/img/fire.png"
      >
        <source src="/animations/dapp_last.webm" type="video/webm" />
      </video>
    </div>
  );
}
