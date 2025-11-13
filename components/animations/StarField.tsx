'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface StarFieldProps {
  className?: string;
}

const STAR_COLORS = [
  '#FFFFFF',   // 主要星星（白色）
  '#E6E6FA',   // 淡紫色星星
  '#B0E0E6',   // 淡蓝色星星
  '#FFE4B5'    // 暖黄色星星（少量）
];

const STAR_COUNT = {
  desktop: 120,    // 减少到120个，提升性能
  mobile: 60       // 移动端进一步减少
};

export default function StarField({ className }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // 检测是否为移动设备
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 初始化星星
  const initStars = (width: number, height: number) => {
    const starCount = isMobile ? STAR_COUNT.mobile : STAR_COUNT.desktop;
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5, // 0.5-2.5px
        opacity: Math.random() * 0.8 + 0.2, // 0.2-1.0
        speed: Math.random() * 0.02 + 0.005, // 缓慢移动
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.01, // 闪烁速度
        twinkleOffset: Math.random() * Math.PI * 2 // 闪烁相位偏移
      });
    }

    starsRef.current = stars;
  };

  // 更新星星状态
  const updateStars = (time: number, width: number, height: number) => {
    starsRef.current.forEach(star => {
      // 桌面端：缓慢移动，移动端：不移动
      if (!isMobile) {
        star.y -= star.speed;

        // 星星移出顶部时重新从底部出现
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      }

      // 闪烁效果（所有设备都启用）
      star.opacity = 0.3 + 0.7 * (Math.sin(time * star.twinkleSpeed + star.twinkleOffset) + 1) / 2;
    });
  };

  // 绘制星星
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    starsRef.current.forEach(star => {
      ctx.save();

      // 设置星星样式
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;

      // 创建星星光晕效果
      const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2);
      gradient.addColorStop(0, star.color);
      gradient.addColorStop(0.5, star.color + '80'); // 50% 透明
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;

      // 绘制星星
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  };

  // 动画循环
  const animate = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    updateStars(time * 0.001, canvas.width, canvas.height); // 转换为秒
    drawStars(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Canvas 设置和启动动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置高分辨率 Canvas
    const setupCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';

      ctx.scale(dpr, dpr);

      // 初始化星星
      initStars(rect.width, rect.height);
    };

    setupCanvas();

    // 启动动画
    animationRef.current = requestAnimationFrame(animate);

    // 响应窗口大小变化
    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize);

    // 页面可见性检测（性能优化）
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 清理函数
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isMobile]); // isMobile 变化时重新初始化

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 1, // 在背景装饰元素之下
        width: '100%',
        height: '100%'
      }}
    />
  );
}