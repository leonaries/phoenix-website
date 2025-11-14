'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import FrameSequencePlayer, { FrameSequencePlayerRef } from './FrameSequencePlayer';

interface PhoenixFireLogoProps {
  show: boolean;
  startFrame?: number; // 从哪一帧开始播放
}

/**
 * 燃烧的凤凰 Logo（无缝循环播放）
 * 全屏显示，覆盖整个屏幕，保持与动画相同的位置和大小
 * 使用专门设计的首尾相接循环序列帧
 * 文件夹：public/frames/last_webp_frames_webp（228帧，30fps，WebP优化版）
 * 命名格式：cy000.webp 到 cy227.webp
 * 优化：从PNG（214MB）转换为WebP（42MB），节省172MB（80%）
 * 循环时长：7.6秒，流畅的动画效果
 */
export default function PhoenixFireLogo({ show, startFrame = 0 }: PhoenixFireLogoProps) {
  const playerRef = useRef<FrameSequencePlayerRef>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    if (show) {
      // 设置起始帧并开始播放
      playerRef.current.setCurrentFrame(startFrame);
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [show, startFrame]);

  // 始终渲染播放器（隐藏状态），确保提前加载
  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full lg:h-screen z-10 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <FrameSequencePlayer
        ref={playerRef}
        frameFolder="/frames/last_webp_frames_webp"
        totalFrames={228}
        fps={30}
        loop={true}
        format="webp"
        startFrameNumber={0}
        frameNamePattern={(index, fmt) => `cy${String(index).padStart(3, '0')}.${fmt}`}
      />
    </motion.div>
  );
}
