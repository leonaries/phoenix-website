'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FrameSequencePlayer, { FrameSequencePlayerRef } from './FrameSequencePlayer';

interface PhoenixCompleteAnimationProps {
  onComplete?: () => void;
}

/**
 * 凤凰完整动画
 *
 * 使用 WebP 序列帧（火焰 + Logo 已合成）
 * 文件夹：public/frames/total_webp_frames_webp（135帧，30fps，WebP优化版）
 * 命名格式：1_6000.webp 到 1_6134.webp
 * 优化：从PNG（196MB）转换为WebP（34MB），节省162MB（83%）
 */
export default function PhoenixCompleteAnimation({ onComplete }: PhoenixCompleteAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const playerRef = useRef<FrameSequencePlayerRef>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 动画加载完成
  const handleAnimationLoaded = () => {
    setIsLoaded(true);
    // 自动播放
    if (playerRef.current) {
      playerRef.current.play();
    }
  };

  // 监听动画时间更新，在最后一帧时触发
  const handleTimeUpdate = (currentFrame: number, totalFrames: number) => {
    if (isLooping) return;

    // 当播放到最后3帧时（接近最后一帧），通知 Logo 开始播放
    if (totalFrames - currentFrame <= 3) {
      setIsLooping(true);
      onComplete?.(); // 通知完成（Hero Logo 立即开始播放）
    }
  };

  // 动画播放完成时，直接开始淡出（不再循环）
  const handleAnimationEnded = () => {
    setIsLooping(true);
    onComplete?.();
  };

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
      }
    };
  }, []);

  if (!mounted) return null;

  // 循环一段时间后淡出，让 Hero Logo 接管
  if (!isPlaying) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-full lg:h-screen z-50 pointer-events-none">
      {/* 加载提示（动画加载时显示） */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#081122] flex items-center justify-center">
          <div className="text-center">
            <div className="text-[#fc9e01] text-2xl font-bold mb-4">Loading...</div>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a]"
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 黑色背景（动画开始时淡出） */}
      <motion.div
        className="absolute inset-0 bg-[#081122]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* 序列帧动画（全屏播放 + 循环最后1秒后淡出） */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLooping ? 0 : 1 }}
        transition={{
          duration: 1.5,
          delay: isLooping ? 1.5 : 0 // 循环1.5秒（约1-2次）后开始淡出
        }}
        onAnimationComplete={() => {
          if (isLooping) {
            setIsPlaying(false);
          }
        }}
      >
        <FrameSequencePlayer
          ref={playerRef}
          frameFolder="/frames/total_webp_frames_webp"
          totalFrames={135}
          fps={30}
          format="webp"
          startFrameNumber={6000}
          frameNamePattern={(index, fmt) => `1_${index}.${fmt}`}
          onLoaded={handleAnimationLoaded}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAnimationEnded}
        />
      </motion.div>

      {/* 调试信息（开发时可见） */}
      {process.env.NODE_ENV === 'development' && playerRef.current && (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-sm font-mono z-[60]">
          Status: {isLoaded ? (isLooping ? 'Looping Last 1s' : isPlaying ? 'Playing' : 'Complete') : 'Loading'}
          <br />
          Frame: {playerRef.current.getCurrentFrame()} / 135
        </div>
      )}
    </div>
  );
}
