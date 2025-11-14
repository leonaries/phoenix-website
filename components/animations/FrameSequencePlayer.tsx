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
  frameNamePattern?: (index: number, format: string) => string; // 自定义帧命名函数
  startFrameNumber?: number; // 起始帧编号
  onLoaded?: () => void;
  onTimeUpdate?: (currentFrame: number, totalFrames: number) => void;
  onEnded?: () => void;
}

/**
 * 序列帧播放器
 * 使用 Canvas 渲染 PNG/WebP 序列帧动画
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

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
      getCurrentFrame: () => currentFrame,
      setCurrentFrame: (frame: number) => {
        setCurrentFrame(Math.max(0, Math.min(frame, totalFrames - 1)));
      },
    }));

    // 预加载所有帧
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

      // 默认命名模式：frame_0001.webp
      const defaultNamePattern = (index: number, fmt: string) => {
        const frameNumber = String(index).padStart(4, '0');
        return `frame_${frameNumber}.${fmt}`;
      };

      const getFrameName = frameNamePattern || defaultNamePattern;

      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const frameIndex = startFrameNumber + i;
        img.src = `${frameFolder}/${getFrameName(frameIndex, format)}`;
        img.onload = checkAllLoaded;
        img.onerror = () => {
          console.error(`Failed to load frame: ${img.src}`);
          checkAllLoaded();
        };
        frames.push(img);
      }

      return () => {
        // 清理
        frames.forEach((img) => {
          img.onload = null;
          img.onerror = null;
        });
      };
    }, [frameFolder, totalFrames, format, frameNamePattern, startFrameNumber, onLoaded]);

    // 渲染当前帧到 Canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !isLoaded || framesRef.current.length === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const currentImage = framesRef.current[currentFrame];
      if (!currentImage || !currentImage.complete) return;

      // 设置 Canvas 尺寸为图片原始尺寸
      canvas.width = currentImage.naturalWidth;
      canvas.height = currentImage.naturalHeight;

      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制当前帧
      ctx.drawImage(currentImage, 0, 0);

      // 触发时间更新回调
      onTimeUpdate?.(currentFrame, totalFrames);
    }, [currentFrame, isLoaded, totalFrames, onTimeUpdate]);

    // 动画循环
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
