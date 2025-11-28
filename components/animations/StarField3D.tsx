'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getWorkerRecommendation } from '@/utils/worker-support';
import type { ParticleConfig, ParticleUpdateMessage, ParticleUpdateResponse } from '@/workers/particle-worker';

interface StarField3DProps {
  className?: string;
}

// Particle system configuration
const PARTICLE_CONFIG = {
  count: {
    desktop: 100000,    // Increased particle count, like starry sky
    mobile: 20000      // Mobile: Moderate optimization
  },
  spread: 100,        // X/Y axis distribution range
  depth: 200,         // Z axis depth range
  speed: {
    base: 0.001,      // Base speed (halved)
    variation: 0.025  // Speed variation (halved)
  },
  size: {
    near: 3.0,        // Near distance particle size
    far: 0.5,         // Far distance particle size
    attenuation: 50   // Distance attenuation coefficient
  },
  colors: [
    0xffffff,         // White
    0xe6e6fa,         // Lavender
    0xb0e0e6,         // Powder blue
    0xffe4b5          // Moccasin (warm yellow)
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

  // Double buffering for Worker communication (avoid race conditions)
  const positionsBufferARef = useRef<Float32Array | null>(null);
  const positionsBufferBRef = useRef<Float32Array | null>(null);
  const velocitiesBufferRef = useRef<Float32Array | null>(null);
  const activeBufferRef = useRef<'A' | 'B'>('A');
  const isUpdatingRef = useRef(false);

  // Detect mobile device and Worker support
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Detect Worker support
    const workerSupport = getWorkerRecommendation();

    // Temporarily disable Worker to test main thread mode
    const forceMainThread = false; // Debug switch
    const shouldUseWorker = workerSupport.useWorker && !forceMainThread;

    setUseWorker(shouldUseWorker);
    console.log('Worker support:', workerSupport.reason, 'Using Worker:', shouldUseWorker);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create fire-colored star texture
  const createStarTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const centerX = 16;
    const centerY = 16;

    // Create orange-yellow flame-like glow
    const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 16);
    glow.addColorStop(0, 'rgba(255, 220, 150, 1)');      // Bright orange-yellow core
    glow.addColorStop(0.2, 'rgba(255, 180, 100, 0.8)');  // Orange
    glow.addColorStop(0.4, 'rgba(255, 140, 60, 0.4)');   // Deep orange
    glow.addColorStop(0.7, 'rgba(255, 100, 40, 0.1)');   // Flame edge
    glow.addColorStop(1, 'rgba(255, 80, 20, 0)');        // Fade out

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
  };

  // Create simplified particle system
  const createParticles = () => {
    try {
      const particleCount = isMobile ? PARTICLE_CONFIG.count.mobile : PARTICLE_CONFIG.count.desktop;
      console.log('Creating particles:', particleCount);

      // Create geometry
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Position: Randomly distributed in 3D space
        positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;     // x
        positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2; // y
        positions[i3 + 2] = -Math.random() * PARTICLE_CONFIG.depth;             // z (negative value, in front of camera)

        // Velocity: Z-axis flying forward (towards screen)
        velocities[i3] = (Math.random() - 0.5) * 0.02;     // x slight drift
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.02; // y slight drift
        velocities[i3 + 2] = PARTICLE_CONFIG.speed.base + Math.random() * PARTICLE_CONFIG.speed.variation; // z forward (positive velocity)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.userData = { velocities };

      // If using Worker, initialize double buffering
      if (useWorker) {
        positionsBufferARef.current = new Float32Array(positions);
        positionsBufferBRef.current = new Float32Array(particleCount * 3);
        velocitiesBufferRef.current = new Float32Array(velocities);
        console.log('Double buffering initialized for Worker');
      }

      // Create flame-like star texture
      const texture = createStarTexture();

      // Use textured point material to create stars
      const material = new THREE.PointsMaterial({
        color: 0xffffff,        // White
        size: 0.1,              // Extremely small particles
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

  // Initialize WebWorker
  const initWorker = () => {
    if (!useWorker || typeof Worker === 'undefined') {
      console.log('Worker disabled or not supported');
      return null;
    }

    try {
      // Use Next.js 15 Worker support
      const worker = new Worker(new URL('@/workers/particle-worker.ts', import.meta.url));

      worker.onmessage = (e: MessageEvent<ParticleUpdateResponse>) => {
        if (e.data.type === 'updated' && particlesRef.current) {
          const geometry = particlesRef.current.geometry as THREE.BufferGeometry;
          const currentPositions = geometry.attributes.position.array as Float32Array;

          // Copy updated position data
          currentPositions.set(e.data.positions);
          geometry.attributes.position.needsUpdate = true;

          // Mark update complete
          isUpdatingRef.current = false;

          // Switch active buffer
          activeBufferRef.current = activeBufferRef.current === 'A' ? 'B' : 'A';
        }
      };

      worker.onerror = (error) => {
        console.error('Worker error:', error);
        console.log('Falling back to main thread animation');
        setUseWorker(false); // Fallback to main thread

        // Restart main thread animation
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animateMainThread);
        }, 100);
      };

      console.log('WebWorker initialized successfully');
      return worker;
    } catch (error) {
      console.error('Error initializing Worker:', error);
      return null;
    }
  };

  // Initialize Three.js scene
  const initThreeJS = () => {
    if (!mountRef.current) {
      console.error('Mount ref not available');
      return null;
    }

    try {
      const mount = mountRef.current;
      const rect = mount.getBoundingClientRect();
      console.log('Initializing Three.js with size:', rect.width, 'x', rect.height);

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,                          // FOV
        rect.width / rect.height,    // Aspect ratio
        0.1,                         // Near clipping plane
        1000                         // Far clipping plane
      );
      camera.position.set(0, 0, 0);
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile
      });
      renderer.setSize(rect.width, rect.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); // Transparent background
      rendererRef.current = renderer;

      // Create particle system
      const particles = createParticles();
      if (particles) {
        scene.add(particles);
        particlesRef.current = particles;
        console.log('Particles added to scene');
      } else {
        console.error('Failed to create particles');
        return null;
      }

      // Mount to DOM
      mount.appendChild(renderer.domElement);
      console.log('Three.js initialized successfully');

      return { scene, camera, renderer, particles };
    } catch (error) {
      console.error('Error initializing Three.js:', error);
      return null;
    }
  };

  // Animation loop - Worker mode
  const animateWithWorker = () => {
    if (!particlesRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current || !workerRef.current) {
      return;
    }

    try {
      // If previous frame is still updating, skip this frame
      if (!isUpdatingRef.current) {
        const particles = particlesRef.current;
        const geometry = particles.geometry as THREE.BufferGeometry;
        const positions = geometry.attributes.position.array as Float32Array;
        const velocities = geometry.userData.velocities as Float32Array;

        // Get current active buffer
        const activeBuffer = activeBufferRef.current === 'A' ? positionsBufferARef.current : positionsBufferBRef.current;

        if (activeBuffer && velocitiesBufferRef.current) {
          // Copy current positions and velocities to buffer
          activeBuffer.set(positions);
          velocitiesBufferRef.current.set(velocities);

          // Build Worker message
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

          // Mark as updating
          isUpdatingRef.current = true;

          // Send to Worker (not using Transferable Objects)
          workerRef.current.postMessage(message);
        }
      }

      // Render current frame
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      animationRef.current = requestAnimationFrame(animateWithWorker);
    } catch (error) {
      console.error('Error in Worker animation loop:', error);
    }
  };

  // Animation loop - Main thread mode (fallback solution)
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

      // Update each particle (main thread)
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Update position
        positions[i3] += velocities[i3];         // x
        positions[i3 + 1] += velocities[i3 + 1]; // y
        positions[i3 + 2] += velocities[i3 + 2]; // z

        // Reset particle to far distance when it passes the viewer
        if (positions[i3 + 2] > 10) {
          positions[i3] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;
          positions[i3 + 1] = (Math.random() - 0.5) * PARTICLE_CONFIG.spread * 2;
          positions[i3 + 2] = -PARTICLE_CONFIG.depth;

          // Reset velocity
          velocities[i3] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
          velocities[i3 + 2] = PARTICLE_CONFIG.speed.base + Math.random() * PARTICLE_CONFIG.speed.variation;
        }
      }

      // Notify Three.js that attributes have been updated
      geometry.attributes.position.needsUpdate = true;

      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current);

      animationRef.current = requestAnimationFrame(animateMainThread);
    } catch (error) {
      console.error('Error in main thread animation loop:', error);
    }
  };

  // Unified animation start function
  const startAnimation = () => {
    if (useWorker && workerRef.current) {
      console.log('Starting animation with WebWorker');
      animationRef.current = requestAnimationFrame(animateWithWorker);
    } else {
      console.log('Starting animation on main thread');
      animationRef.current = requestAnimationFrame(animateMainThread);
    }
  };

  // Responsive handling
  const handleResize = () => {
    if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

    const rect = mountRef.current.getBoundingClientRect();
    cameraRef.current.aspect = rect.width / rect.height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(rect.width, rect.height);
  };

  // Page visibility handling
  const handleVisibilityChange = () => {
    if (document.hidden) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    } else if (isInitialized) {
      startAnimation();
    }
  };

  // Main effect
  useEffect(() => {
    console.log('StarField3D useEffect triggered, isMobile:', isMobile, 'useWorker:', useWorker);

    // Add a small delay to ensure DOM is fully ready
    const initTimer = setTimeout(() => {
      // Initialize Worker (if enabled)
      if (useWorker) {
        const worker = initWorker();
        if (worker) {
          workerRef.current = worker;
        } else {
          setUseWorker(false); // Fallback to main thread
        }
      }

      const threeJS = initThreeJS();
      if (!threeJS) {
        console.error('Failed to initialize Three.js');
        return;
      }

      setIsInitialized(true);

      // Start animation
      startAnimation();
    }, 100); // 100ms delay to ensure DOM is ready

    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      console.log('StarField3D cleanup');

      // Clear initialization timer
      clearTimeout(initTimer);

      setIsInitialized(false);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }

      // Terminate Worker
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
        console.log('WebWorker terminated');
      }

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Clean up Three.js resources
      if (mountRef.current && rendererRef.current && mountRef.current.contains(rendererRef.current.domElement)) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
        particlesRef.current = undefined;
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = undefined;
      }

      // Clean up scene and camera references
      sceneRef.current = undefined;
      cameraRef.current = undefined;
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