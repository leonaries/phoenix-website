'use client';

import React, { useEffect, useState, useRef } from 'react';
import { isMobileSafari } from '@/utils/browserDetect';
import { LazyFrameSequencePlayer } from './index';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixMobileLogoProps {
  show: boolean;
}

/**
 * 移动端燃烧的凤凰 Logo（无缝循环播放）
 * - iOS Safari: 使用帧序列播放（WebP frames）配合懒加载
 * - 其他浏览器: 使用 WebM 视频（更小的文件大小）
 */
export default function PhoenixMobileLogo({ show }: PhoenixMobileLogoProps) {
  const [useSafariFrames, setUseSafariFrames] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 检测是否为 iOS Safari（仅在客户端执行）
    const shouldUseSafariFrames = isMobileSafari();
    setUseSafariFrames(shouldUseSafariFrames);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[PhoenixMobileLogo] iOS Safari detected: ${shouldUseSafariFrames}`);
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

  // iOS Safari: 使用帧序列播放器（懒加载优化）
  if (useSafariFrames) {
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

  // 其他移动浏览器: 使用 WebM 视频
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
        <source src="/animations/dapp_last.webm" type="video/webm" />
      </video>
    </div>
  );
}
