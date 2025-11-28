'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LazyFrameSequencePlayer, { LazyFrameSequencePlayerRef } from './LazyFrameSequencePlayer';
import { getPreferredAnimationFormat } from '@/utils/browserDetect';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixFireLogoProps {
  show: boolean;
  startFrame?: number; // Which frame to start playback from
}

/**
 * Burning Phoenix Logo (seamless loop playback)
 * Full-screen display, covering entire screen, maintaining same position and size as animation
 *
 * Browser compatibility handling:
 * - Safari browser: Use WebP frame sequence (42MB, 228 frames) - with lazy loading optimization
 * - Other browsers: Use WebM video (smaller file size)
 *
 * WebP frame sequence version (lazy loading optimization):
 * - Folder: public/frames/last_webp_frames (228 frames, 30fps)
 * - Naming format: cy000.webp to cy227.webp
 * - Optimization: Converted from PNG (214MB) to WebP (42MB), saving 172MB (80%)
 * - Lazy loading: Load first 30 frames, load while playing, first frame time reduced from 5-12s to 0.8-2s
 * - Loop duration: 7.6 seconds, smooth animation effect
 */
export default function PhoenixFireLogo({ show, startFrame = 0 }: PhoenixFireLogoProps) {
  const playerRef = useRef<LazyFrameSequencePlayerRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationType, setAnimationType] = useState<'frames' | 'webm'>('frames');
  const [mounted, setMounted] = useState(false);

  // Detect browser type after client mount
  useEffect(() => {
    setAnimationType(getPreferredAnimationFormat());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (animationType === 'frames') {
      // Frame sequence animation control
      if (!playerRef.current) return;

      if (show) {
        playerRef.current.setCurrentFrame(startFrame);
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    } else {
      // WebM video control
      if (!videoRef.current) return;

      if (show) {
        // Manually load and play, avoid multiple requests from preload
        const video = videoRef.current;
        if (video.readyState === 0) {
          // Video not loaded, load first
          video.load();
        }
        video.currentTime = startFrame / 30; // 30fps
        video.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [show, startFrame, animationType, mounted]);

  // Prevent SSR/client inconsistency, wait for mount to complete
  if (!mounted) {
    return (
      <motion.div
        className="absolute top-0 left-0 w-full h-full lg:h-screen z-10 pointer-events-none flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      />
    );
  }

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full lg:h-screen z-10 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {animationType === 'frames' ? (
        // Safari or browsers that don't support WebM: Use lazy-loaded frame sequence
        <LazyFrameSequencePlayer
          ref={playerRef}
          frameFolder={VERSIONED_ASSETS.FRAMES_LAST}
          totalFrames={228}
          fps={30}
          loop={true}
          format="webp"
          startFrameNumber={0}
          frameNamePattern={(index, fmt) => `cy${String(index).padStart(3, '0')}.${fmt}`}
          batchSize={30}
          bufferAhead={40}
          bufferBehind={30}
        />
      ) : (
        // Other browsers: Use WebM video
        <video
          ref={videoRef}
          key="phoenix-fire-logo-video"
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={VERSIONED_ASSETS.VIDEO_LAST} type="video/webm" />
        </video>
      )}
    </motion.div>
  );
}
