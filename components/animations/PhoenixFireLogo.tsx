'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LazyFrameSequencePlayer, { LazyFrameSequencePlayerRef } from './LazyFrameSequencePlayer';
import { getPreferredAnimationFormat } from '@/utils/browserDetect';
import { VERSIONED_ASSETS } from '@/utils/assetVersion';

interface PhoenixFireLogoProps {
  show: boolean;
  startFrame?: number; // 从哪一帧开始播放
}

/**
 * 燃烧的凤凰 Logo（无缝循环播放）
 * 全屏显示，覆盖整个屏幕，保持与动画相同的位置和大小
 *
 * 浏览器兼容性处理：
 * - Safari浏览器：使用WebP帧序列（42MB，228帧）- 使用懒加载优化
 * - 其他浏览器：使用WebM视频（更小的文件大小）
 *
 * WebP帧序列版本（懒加载优化）：
 * - 文件夹：public/frames/last_webp_frames（228帧，30fps）
 * - 命名格式：cy000.webp 到 cy227.webp
 * - 优化：从PNG（214MB）转换为WebP（42MB），节省172MB（80%）
 * - 懒加载：首批加载30帧，边播放边加载，首帧时间从5-12s降至0.8-2s
 * - 循环时长：7.6秒，流畅的动画效果
 */
export default function PhoenixFireLogo({ show, startFrame = 0 }: PhoenixFireLogoProps) {
  const playerRef = useRef<LazyFrameSequencePlayerRef>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationType, setAnimationType] = useState<'frames' | 'webm'>('frames');
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后检测浏览器类型
  useEffect(() => {
    setAnimationType(getPreferredAnimationFormat());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (animationType === 'frames') {
      // 帧序列动画控制
      if (!playerRef.current) return;

      if (show) {
        playerRef.current.setCurrentFrame(startFrame);
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    } else {
      // WebM视频控制
      if (!videoRef.current) return;

      if (show) {
        // 手动加载并播放，避免预加载导致的多次请求
        const video = videoRef.current;
        if (video.readyState === 0) {
          // 视频未加载，先加载
          video.load();
        }
        video.currentTime = startFrame / 30; // 30fps
        video.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
    }
  }, [show, startFrame, animationType, mounted]);

  // 防止SSR/客户端不一致，等待挂载完成
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
        // Safari或不支持WebM的浏览器：使用懒加载帧序列
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
        // 其他浏览器：使用WebM视频
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
