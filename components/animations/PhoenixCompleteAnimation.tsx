'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LazyFrameSequencePlayer, { LazyFrameSequencePlayerRef } from './LazyFrameSequencePlayer';
import { getPreferredAnimationFormat } from '@/utils/browserDetect';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixCompleteAnimationProps {
  onComplete?: () => void;
}

/**
 * Phoenix Complete Animation
 *
 * Browser compatibility handling:
 * - Safari browser: Use WebP frame sequence (34MB, 135 frames) - with lazy loading optimization
 * - Other browsers: Use WebM video (smaller file size)
 *
 * WebP frame sequence version (lazy loading optimization):
 * - Folder: public/frames/total_webp_frames (135 frames, 30fps, WebP optimized version)
 * - Naming format: 1_6000.webp to 1_6134.webp
 * - Optimization: Converted from PNG (196MB) to WebP (34MB), saving 162MB (83%)
 * - Lazy loading: Load first 30 frames, load while playing, first frame time reduced from 3-8s to 0.5-1.5s
 */
export default function PhoenixCompleteAnimation({ onComplete }: PhoenixCompleteAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [animationType, setAnimationType] = useState<'frames' | 'webm'>('frames');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const playerRef = useRef<LazyFrameSequencePlayerRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setAnimationType(getPreferredAnimationFormat());
    setMounted(true);
  }, []);

  // Animation loaded
  const handleAnimationLoaded = () => {
    setIsLoaded(true);
    // Autoplay
    if (animationType === 'frames' && playerRef.current) {
      playerRef.current.play();
    } else if (animationType === 'webm' && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // WebM video loaded event
  const handleVideoLoaded = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // Load video immediately after mounting (WebM mode only)
  useEffect(() => {
    if (!mounted || animationType !== 'webm' || !videoRef.current) return;

    // Manually trigger video loading
    const video = videoRef.current;
    if (video.readyState === 0) {
      video.load();
    }
  }, [mounted, animationType]);

  // WebM video time update event
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || isLooping || animationType !== 'webm') return;

    const { currentTime, duration } = videoRef.current;
    // Trigger complete event when playing near the end
    if (duration - currentTime <= 0.1) {
      setIsLooping(true);
      onComplete?.();
    }
  };

  // WebM video ended event
  const handleVideoEnded = () => {
    setIsLooping(true);
    onComplete?.();
  };

  // Listen for animation time updates, trigger at last frame
  const handleTimeUpdate = (currentFrame: number, totalFrames: number) => {
    if (isLooping) return;

    // When playing reaches last 3 frames (close to last frame), notify Logo to start playing
    if (totalFrames - currentFrame <= 3) {
      setIsLooping(true);
      onComplete?.(); // Notify complete (Hero Logo starts playing immediately)
    }
  };

  // When animation completes, start fade out directly (no more looping)
  const handleAnimationEnded = () => {
    setIsLooping(true);
    onComplete?.();
  };

  // Loading progress update
  const handleLoadingProgress = (progress: number, loadedCount: number) => {
    setLoadingProgress(progress);
    console.log(`[PhoenixCompleteAnimation] Loading progress: ${progress}% (${loadedCount} frames)`);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
      }
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  if (!mounted) return null;

  // Fade out after looping for a while, let Hero Logo take over
  if (!isPlaying) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full lg:h-screen z-50 pointer-events-none">
      {/* Loading indicator (displayed during animation loading) */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#081122] flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#fc9e01] text-2xl font-bold mb-4">
              Loading... {animationType === 'frames' && `${loadingProgress}%`}
            </div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              {animationType === 'frames' ? (
                // Frame sequence: Display actual loading progress
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                // WebM video: Display animated progress bar
                <motion.div
                  className="h-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a]"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Black background (fades out when animation starts) */}
      <motion.div
        className="absolute inset-0 bg-[#081122]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Frame sequence animation or WebM video (fullscreen playback + fade out after looping last 1 second) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLooping ? 0 : 1 }}
        transition={{
          duration: 1.5,
          delay: isLooping ? 1.5 : 0 // Fade out after looping for 1.5 seconds (about 1-2 times)
        }}
        onAnimationComplete={() => {
          if (isLooping) {
            setIsPlaying(false);
          }
        }}
      >
        {animationType === 'frames' ? (
          // Safari or browsers that don't support WebM: Use lazy-loaded frame sequence
          <LazyFrameSequencePlayer
            ref={playerRef}
            frameFolder={VERSIONED_ASSETS.FRAMES_TOTAL}
            totalFrames={135}
            fps={30}
            format="webp"
            startFrameNumber={6000}
            frameNamePattern={(index, fmt) => `1_${index}.${fmt}`}
            onLoaded={handleAnimationLoaded}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAnimationEnded}
            onLoadingProgress={handleLoadingProgress}
            batchSize={30}
            bufferAhead={30}
            bufferBehind={20}
          />
        ) : (
          // Other browsers: Use WebM video
          <video
            ref={videoRef}
            key="phoenix-complete-animation-video"
            className="w-full h-full object-cover"
            muted
            playsInline
            preload="none"
            onLoadedData={handleVideoLoaded}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src={VERSIONED_ASSETS.VIDEO_TOTAL} type="video/webm" />
          </video>
        )}
      </motion.div>

      {/* Debug information (visible in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-sm font-mono z-[60]">
          Type: {animationType}
          <br />
          Status: {isLoaded ? (isLooping ? 'Looping Last 1s' : isPlaying ? 'Playing' : 'Complete') : 'Loading'}
          <br />
          {animationType === 'frames' && playerRef.current && (
            <>
              Frame: {playerRef.current.getCurrentFrame()} / 135
              <br />
              Loaded: {playerRef.current.getLoadedFramesCount()} frames ({playerRef.current.getLoadingProgress()}%)
            </>
          )}
          {animationType === 'webm' && videoRef.current && (
            <>Time: {videoRef.current.currentTime.toFixed(1)}s / {videoRef.current.duration?.toFixed(1)}s</>
          )}
        </div>
      )}
    </div>
  );
}
