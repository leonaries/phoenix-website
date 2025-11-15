'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FrameSequencePlayer, { FrameSequencePlayerRef } from './FrameSequencePlayer';
import { getPreferredAnimationFormat } from '@/utils/browserDetect';

interface PhoenixCompleteAnimationProps {
  onComplete?: () => void;
}

/**
 * 凤凰完整动画
 *
 * 浏览器兼容性处理：
 * - Safari浏览器：使用WebP帧序列（34MB，135帧）
 * - 其他浏览器：使用WebM视频（更小的文件大小）
 *
 * WebP帧序列版本：
 * - 文件夹：public/frames/total_webp_frames_webp（135帧，30fps，WebP优化版）
 * - 命名格式：1_6000.webp 到 1_6134.webp
 * - 优化：从PNG（196MB）转换为WebP（34MB），节省162MB（83%）
 */
export default function PhoenixCompleteAnimation({ onComplete }: PhoenixCompleteAnimationProps) {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [animationType, setAnimationType] = useState<'frames' | 'webm'>('frames');
  const playerRef = useRef<FrameSequencePlayerRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setAnimationType(getPreferredAnimationFormat());
    setMounted(true);
  }, []);

  // 动画加载完成
  const handleAnimationLoaded = () => {
    setIsLoaded(true);
    // 自动播放
    if (animationType === 'frames' && playerRef.current) {
      playerRef.current.play();
    } else if (animationType === 'webm' && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // WebM视频加载完成事件
  const handleVideoLoaded = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  // 视频挂载后立即加载（仅WebM模式）
  useEffect(() => {
    if (!mounted || animationType !== 'webm' || !videoRef.current) return;

    // 手动触发视频加载
    const video = videoRef.current;
    if (video.readyState === 0) {
      video.load();
    }
  }, [mounted, animationType]);

  // WebM视频时间更新事件
  const handleVideoTimeUpdate = () => {
    if (!videoRef.current || isLooping || animationType !== 'webm') return;

    const { currentTime, duration } = videoRef.current;
    // 当播放到接近结尾时触发完成事件
    if (duration - currentTime <= 0.1) {
      setIsLooping(true);
      onComplete?.();
    }
  };

  // WebM视频播放结束事件
  const handleVideoEnded = () => {
    setIsLooping(true);
    onComplete?.();
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
      if (videoRef.current) {
        videoRef.current.pause();
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

      {/* 序列帧动画或WebM视频（全屏播放 + 循环最后1秒后淡出） */}
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
        {animationType === 'frames' ? (
          // Safari或不支持WebM的浏览器：使用帧序列
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
        ) : (
          // 其他浏览器：使用WebM视频
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
            <source src="/animations/total.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      {/* 调试信息（开发时可见） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded text-sm font-mono z-[60]">
          Type: {animationType}
          <br />
          Status: {isLoaded ? (isLooping ? 'Looping Last 1s' : isPlaying ? 'Playing' : 'Complete') : 'Loading'}
          <br />
          {animationType === 'frames' && playerRef.current && (
            <>Frame: {playerRef.current.getCurrentFrame()} / 135</>
          )}
          {animationType === 'webm' && videoRef.current && (
            <>Time: {videoRef.current.currentTime.toFixed(1)}s / {videoRef.current.duration?.toFixed(1)}s</>
          )}
        </div>
      )}
    </div>
  );
}
