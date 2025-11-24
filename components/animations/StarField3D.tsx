'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getWorkerRecommendation } from '@/utils/worker-support';
import type { ParticleConfig, ParticleUpdateMessage, ParticleUpdateResponse } from '@/workers/particle-worker';

interface StarField3DProps {
  className?: string;
}

// 粒子系统配置
const PARTICLE_CONFIG = {
  count: {
    desktop: 100000,    // 增加粒子数量，像满天星辰
    mobile: 20000      // 移动端：适度优化
  },
  spread: 100,        // X/Y 轴分布范围
  depth: 200,         // Z 轴深度范围
  speed: {
    base: 0.001,      // 基础速度（减半）
    variation: 0.025  // 速度随机变化（减半）
  },
  size: {
    near: 3.0,        // 近距离粒子大小
    far: 0.5,         // 远距离粒子大小
    attenuation: 50   // 距离衰减系数
  },
  colors: [
    0xffffff,         // 白色
    0xe6e6fa,         // 淡紫色
    0xb0e0e6,         // 淡蓝色
    0xffe4b5          // 暖黄色
  ]
};

export default function StarField3D({ className }: StarField3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const particlesRef = useRef<THREE.Points>();
  const animationRef = useRef<number>();
  const workerRef = useRef<Worker | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [useWorker, setUseWorker] = useState(false);

  // 双缓冲区用于 Worker 通信（避免竞态条件）
  const positionsBufferARef = useRef<Float32Array | null>(null);
  const positionsBufferBRef = useRef<Float32Array | null>(null);
  const velocitiesBufferRef = useRef<Float32Array | null>(null);
  const activeBufferRef = useRef<'A' | 'B'>('A');
  const isUpdatingRef = useRef(false);

  // 检测移动设备和 Worker 支持
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 检测 Worker 支持
    const workerSupport = getWorkerRecommendation();
    setUseWorker(workerSupport.useWorker);
    console.log('Worker support:', workerSupport.reason);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 创建火焰色的小星星纹理
  const createStarTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const centerX = 16;
    const centerY = 16;

    // 创建橙黄色火焰般的光晕
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    glow.addColorStop(0, 'rgba(255, 220, 150, 1)');      // 明亮的橙黄色核心
    glow.addColorStop(0.2, 'rgba(255, 180, 100, 0.8)');  // 橙色
    glow.addColorStop(0.4, 'rgba(255, 140, 60, 0.4)');   // 深橙色
    glow.addColorStop(0.7, 'rgba(255, 100, 40, 0.1)');   // 火焰边缘
    glow.addColorStop(1, 'rgba(255, 80, 20, 0)');        // 淡出

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  };

  // 创建简化版粒子系统
  const createParticles = () => {
    try {
      const particleCount = isMobile ? PARTICLE_CONFIG.count.mobile : PARTICLE_CONFIG.count.desktop;
      console.log('Creating particles:', particleCount);

      // 创建几何体
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // 位置：在 3D 空间中随机分布
        positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;     // x
        positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2; // y
        positions[i3 + 2] = -Math.random() * PARTICLE_CONFIG.depth;             // z (负值，在相机前方)

        // 速度：Z 轴向前飞（向屏幕方向）
        velocities[i3] = (Math.random() - 0.5) * 0.02;     // x 轻微漂移
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02; // y 轻微漂移
        velocities[i3 + 2] = PARTICLE_CONFIG.speed.base + Math.random() * PARTICLE_CONFIG.speed.variation; // z 向前（正速度）
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.userData = { velocities };

      // 如果使用 Worker，初始化双缓冲区
      if (useWorker) {
        positionsBufferARef.current = new Float32Array(positions);
        positionsBufferBRef.current = new Float32Array(particleCount * 3);
        velocitiesBufferRef.current = new Float32Array(velocities);
        console.log('Double buffering initialized for Worker');
      }

      // 创建火焰般的星星纹理
      const texture = createStarTexture();

      // 使用带纹理的点材质，创建星星
      const material = new THREE.PointsMaterial({
        color: 0xffffff,        // 白色
        size: 0.1,              // 极小的粒子
        map: texture,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const points = new THREE.Points(geometry, material);
      console.log('Particles created successfully');
      return points;
    } catch (error) {
      console.error('Error creating particles:', error);
      return null;
    }
  };

  // 初始化 WebWorker
  const initWorker = () => {
    if (!useWorker || typeof Worker === 'undefined') {
      console.log('Worker disabled or not supported');
      return null;
    }

    try {
      // 使用 Next.js 15 的 Worker 支持
      const worker = new Worker(new URL('@/workers/particle-worker.ts', import.meta.url));

      worker.onmessage = (e: MessageEvent<ParticleUpdateResponse>) => {
        if (e.data.type === 'updated' && particlesRef.current) {
          const geometry = particlesRef.current.geometry as THREE.BufferGeometry;
          const currentPositions = geometry.attributes.position.array as Float32Array;

          // 复制更新后的位置数据
          currentPositions.set(e.data.positions);
          geometry.attributes.position.needsUpdate = true;

          // 标记更新完成
          isUpdatingRef.current = false;

          // 切换活动缓冲区
          activeBufferRef.current = activeBufferRef.current === 'A' ? 'B' : 'A';
        }
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error);
        setUseWorker(false); // 降级到主线程
      };

      console.log('WebWorker initialized successfully');
      return worker;
    } catch (error) {
      console.error('Error initializing Worker:', error);
      return null;
    }
  };

  // 初始化 Three.js 场景
  const initThreeJS = () => {
    if (!mountRef.current) {
      console.error('Mount ref not available');
      return null;
    }

    try {
      const mount = mountRef.current;
      const rect = mount.getBoundingClientRect();
      console.log('Initializing Three.js with size:', rect.width, 'x', rect.height);

      // 创建场景
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 创建相机
      const camera = new THREE.PerspectiveCamera(
        75,                          // FOV
        rect.width / rect.height,    // 宽高比
        0.1,                         // 近裁剪面
        1000                         // 远裁剪面
      );
      camera.position.set(0, 0, 0);
      cameraRef.current = camera;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile
      });
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // 透明背景
      rendererRef.current = renderer;

      // 创建粒子系统
      const particles = createParticles();
      if (particles) {
        scene.add(particles);
        particlesRef.current = particles;
        console.log('Particles added to scene');
      } else {
        console.error('Failed to create particles');
        return null;
      }

      // 挂载到 DOM
      mount.appendChild(renderer.domElement);
      console.log('Three.js initialized successfully');

      return { scene, camera, renderer, particles };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      return null;
    }
  };

  // 动画循环 - Worker 模式
  const animateWithWorker = () => {
    if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !workerRef.current) {
      return;
    }

    try {
      // 如果上一帧还在更新中，跳过本帧
      if (!isUpdatingRef.current) {
        const particles = particlesRef.current;
        const geometry = particles.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;
        const velocities = geometry.userData.velocities as Float32Array;

        // 获取当前活动缓冲区
        const activeBuffer = activeBufferRef.current === 'A' ? positionsBufferARef.current : positionsBufferBRef.current;

        if (activeBuffer && velocitiesBufferRef.current) {
          // 复制当前位置和速度到缓冲区
          activeBuffer.set(positions);
          velocitiesBufferRef.current.set(velocities);

          // 构建 Worker 消息
          const config: ParticleConfig = {
            spread: PARTICLE_CONFIG.spread,
            depth: PARTICLE_CONFIG.depth,
            speedBase: PARTICLE_CONFIG.speed.base,
            speedVariation: PARTICLE_CONFIG.speed.variation
          };

          const message: ParticleUpdateMessage = {
            type: 'update',
            positions: activeBuffer,
            velocities: velocitiesBufferRef.current,
            count: positions.length / 3,
            config
          };

          // 标记正在更新
          isUpdatingRef.current = true;

          // 发送到 Worker（使用 Transferable Objects）
          workerRef.current.postMessage(message, [
            activeBuffer.buffer,
            velocitiesBufferRef.current.buffer
          ]);
        }
      }

      // 渲染当前帧
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      animationRef.current = requestAnimationFrame(animateWithWorker);
    } catch (error) {
      console.error('Error in Worker animation loop:', error);
    }
  };

  // 动画循环 - 主线程模式（降级方案）
  const animateMainThread = () => {
    if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) {
      return;
    }

    try {
      const particles = particlesRef.current;
      const geometry = particles.geometry as THREE.BufferGeometry;
      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.userData.velocities as Float32Array;

      const particleCount = positions.length / 3;

      // 更新每个粒子（主线程）
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // 更新位置
        positions[i3] += velocities[i3];         // x
        positions[i3 + 1] += velocities[i3 + 1]; // y
        positions[i3 + 2] += velocities[i3 + 2]; // z

        // 粒子超出观察者后，重置到远处
        if (positions[i3 + 2] > 10) {
          positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;
          positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;
          positions[i3 + 2] = -PARTICLE_CONFIG.depth;

          // 重新设置速度
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 2] = PARTICLE_CONFIG.speed.base + Math.random() * PARTICLE_CONFIG.speed.variation;
        }
      }

      // 通知 Three.js 属性已更新
      geometry.attributes.position.needsUpdate = true;

      // 渲染
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      animationRef.current = requestAnimationFrame(animateMainThread);
    } catch (error) {
      console.error('Error in main thread animation loop:', error);
    }
  };

  // 统一的动画启动函数
  const startAnimation = () => {
    if (useWorker && workerRef.current) {
      console.log('Starting animation with WebWorker');
      animationRef.current = requestAnimationFrame(animateWithWorker);
    } else {
      console.log('Starting animation on main thread');
      animationRef.current = requestAnimationFrame(animateMainThread);
    }
  };

  // 响应式处理
  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    cameraRef.current.aspect = rect.width / rect.height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(rect.width, rect.height);
  };

  // 页面可见性处理
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else if (isInitialized) {
      startAnimation();
    }
  };

  // 主效果
  useEffect(() => {
    console.log('StarField3D useEffect triggered, isMobile:', isMobile, 'useWorker:', useWorker);

    // 初始化 Worker（如果启用）
    if (useWorker) {
      const worker = initWorker();
      if (worker) {
        workerRef.current = worker;
      } else {
        setUseWorker(false); // 降级到主线程
      }
    }

    const threeJS = initThreeJS();
    if (!threeJS) {
      console.error('Failed to initialize Three.js');
      return;
    }

    setIsInitialized(true);

    // 启动动画
    startAnimation();

    // 添加事件监听
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 清理函数
    return () => {
      console.log('StarField3D cleanup');
      setIsInitialized(false);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // 终止 Worker
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
        console.log('WebWorker terminated');
      }

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // 清理 Three.js 资源
      if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [isMobile, useWorker]);

  console.log('StarField3D render, isInitialized:', isInitialized);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none ${className || ''}`}
      style={{
        zIndex: 1
      }}
    />
  );
}