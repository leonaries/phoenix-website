'use client';

import React, { useEffect, useState, useRef } from 'react';
import { isMobile } from '@/utils/browserDetect';
import { LazyFrameSequencePlayer } from './index';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixMobileLogoProps {
  show: boolean;
}

/**
 * Mobile Phoenix Logo (seamless loop playback)
 * - All mobile devices: Unified frame sequence playback (solves mobile browser video compatibility issues)
 * - Desktop browsers: Use WebM video (smaller file size)
 */
export default function PhoenixMobileLogo({ show }: PhoenixMobileLogoProps) {
  const [useFrames, setUseFrames] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // All mobile devices uniformly use frame sequences (solves video compatibility issues)
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
    // Automatically start playback after first batch of frames is loaded
    playerRef.current?.play();
  };

  // All mobile devices: Use frame sequence player (lazy loading optimization)
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

        {/* Development mode: Loading progress indicator */}
        {process.env.NODE_ENV === 'development' && loadingProgress < 100 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded">
            Loading: {loadingProgress}%
          </div>
        )}
      </div>
    );
  }

  // Desktop browsers: Use WebM video (theoretically mobile devices won't reach here as they'll be intercepted by useFrames)
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
