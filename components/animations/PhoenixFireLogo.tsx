'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PhoenixFireLogoProps {
  show: boolean;
  startTime?: number; // 从哪一帧开始播放（秒）
}

/**
 * 燃烧的凤凰 Logo（无缝循环播放）
 * 全屏显示，覆盖整个屏幕，保持与动画相同的位置和大小
 * 使用专门设计的首尾相接循环视频 last.webm
 */
export default function PhoenixFireLogo({ show, startTime = 0 }: PhoenixFireLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 提前加载视频，准备在指定时间播放
    const handleLoadedData = () => {
      if (show) {
        video.currentTime = startTime;
        video.play().catch(err => {
          console.log('Play interrupted:', err);
        });
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    
    // 如果已经加载完成且需要显示，立即播放
    if (video.readyState >= 2 && show) {
      video.currentTime = startTime;
      video.play().catch(err => {
        console.log('Play interrupted:', err);
      });
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.pause();
    };
  }, [show, startTime]);

  // 始终渲染视频元素（隐藏状态），确保提前加载

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full lg:h-screen z-10 pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        muted
        playsInline
        loop
        preload="auto"
      >
        <source src="/animations/last.webm" type="video/webm" />
      </video>
    </motion.div>
  );
}
