'use client';

import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

export interface FrameSequencePlayerRef {
  play: () => void;
  pause: () => void;
  getCurrentFrame: () => number;
  setCurrentFrame: (frame: number) => void;
}

interface FrameSequencePlayerProps {
  frameFolder: string;
  totalFrames: number;
  fps?: number;
  loop?: boolean;
  format?: 'png' | 'webp';
  frameNamePattern?: (index: number, format: string) => string; // Custom frame naming function
  startFrameNumber?: number; // Starting frame number
  onLoaded?: () => void;
  onTimeUpdate?: (currentFrame: number, totalFrames: number) => void;
  onEnded?: () => void;
}

/**
 * Frame sequence player
 * Uses Canvas to render PNG/WebP frame sequence animations
 */
const FrameSequencePlayer = forwardRef<FrameSequencePlayerRef, FrameSequencePlayerProps>(
  (
    {
      frameFolder,
      totalFrames,
      fps = 30,
      loop = false,
      format = 'webp',
      frameNamePattern,
      startFrameNumber = 1,
      onLoaded,
      onTimeUpdate,
      onEnded,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const framesRef = useRef<HTMLImageElement[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const lastFrameTimeRef = useRef<number>(0);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      getCurrentFrame: () => currentFrame,
      setCurrentFrame: (frame: number) => {
        setCurrentFrame(Math.max(0, Math.min(frame, totalFrames - 1)));
      },
    }));

    // Preload all frames
    useEffect(() => {
      const frames: HTMLImageElement[] = [];
      let loadedCount = 0;

      const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          framesRef.current = frames;
          setIsLoaded(true);
          onLoaded?.();
        }
      };

      // Default naming pattern: frame_0001.webp
      const defaultNamePattern = (index: number, fmt: string) => {
        const frameNumber = String(index).padStart(4, '0');
        return `frame_${frameNumber}.${fmt}`;
      };

      const getFrameName = frameNamePattern || defaultNamePattern;

      // Separate path and version parameter from frameFolder
      // If frameFolder is "/frames/total_webp_frames?v=1.0.0"
      // Need to append version parameter to each image file
      const [basePath, versionParam] = frameFolder.split('?');
      const versionSuffix = versionParam ? `?${versionParam}` : '';

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const frameIndex = startFrameNumber + i;
        const frameName = getFrameName(frameIndex, format);
        // Append version parameter to filename, not to folder path
        img.src = `${basePath}/${frameName}${versionSuffix}`;
        img.onload = checkAllLoaded;
        img.onerror = () => {
          console.error(`Failed to load frame: ${img.src}`);
          checkAllLoaded();
        };
        frames.push(img);
      }

      return () => {
        // Cleanup
        frames.forEach((img) => {
          img.onload = null;
          img.onerror = null;
        });
      };
    }, [frameFolder, totalFrames, format, frameNamePattern, startFrameNumber, onLoaded]);

    // Render current frame to Canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isLoaded || framesRef.current.length === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentImage = framesRef.current[currentFrame];
      if (!currentImage || !currentImage.complete) return;

      // Set Canvas size to image original size
      canvas.width = currentImage.naturalWidth;
      canvas.height = currentImage.naturalHeight;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw current frame
      ctx.drawImage(currentImage, 0, 0);

      // Trigger time update callback
      onTimeUpdate?.(currentFrame, totalFrames);
    }, [currentFrame, isLoaded, totalFrames, onTimeUpdate]);

    // Animation loop
    useEffect(() => {
      if (!isPlaying || !isLoaded) return;

      const frameInterval = 1000 / fps;

      const animate = (timestamp: number) => {
        if (!lastFrameTimeRef.current) {
          lastFrameTimeRef.current = timestamp;
        }

        const elapsed = timestamp - lastFrameTimeRef.current;

        if (elapsed >= frameInterval) {
          setCurrentFrame((prev) => {
            const nextFrame = prev + 1;

            if (nextFrame >= totalFrames) {
              if (loop) {
                return 0;
              } else {
                setIsPlaying(false);
                onEnded?.();
                return prev;
              }
            }

            return nextFrame;
          });

          lastFrameTimeRef.current = timestamp;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationFrameRef.current !== null) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isPlaying, isLoaded, fps, loop, totalFrames, onEnded]);

    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ imageRendering: 'auto' }}
      />
    );
  }
);

FrameSequencePlayer.displayName = 'FrameSequencePlayer';

export default FrameSequencePlayer;
