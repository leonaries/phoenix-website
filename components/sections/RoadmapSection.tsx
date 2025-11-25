import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';
import ReversedSectionBackground from './ReversedSectionBackground';
import Web3SectionAnimator from '@/components/animations/Web3SectionAnimator';

interface RoadmapSectionProps {
  lang: string;
}

// Roadmap phases data - SVG固定坐标 + 文字位置（标题和描述独立定位）
const roadmapPhases = [
  {
    id: "phase1",
    color: "#ffa700",
    svg: { cx: 250, cy: 318 }, // 左下角节点
    desktop: {
      // 标题位置（在曲线下方）
      title: {
        top: "85%",
        left: "19%",
      },
      // 描述位置（在曲线上方）
      description: {
        top: "37%",
        left: "16%",
      }
    }
  },
  {
    id: "phase2",
    color: "#00d4ff",
    svg: { cx: 600, cy: 186 }, // 中间节点
    desktop: {
      // 标题位置（在曲线上方）
      title: {
        top: "27%",
        left: "44%",
      },
      // 描述位置（在曲线下方）
      description: {
        top: "56%",
        left: "47%",
      }
    }
  },
  {
    id: "phase3",
    color: "#d03d0a",
    svg: { cx: 940, cy: 137 }, // 右上角节点
    desktop: {
      // 标题位置（在曲线下方）
      title: {
        top: "42%",
        left: "73%",
      },
      // 描述位置（在曲线上方）
      description: {
        top: "2%",
        left: "54%",
      }
    }
  },
];

export default async function RoadmapSection({ lang }: RoadmapSectionProps) {
  const { t } = await initI18nServer(lang);

  return (
    <section id="roadmap" className="w-full relative overflow-hidden">
      <Web3SectionAnimator animationType="hologram" className="w-full">
        <SectionBackground
          glowSize={{ width: '800px', height: '400px' }}
          glowOpacity="/8"
          backgroundPositionDesktop="center"
          backgroundPositionMobile="top"
        />

        {/* Section Header */}
        <div className="text-center pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4">
            {/* Title */}
            <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl lg:text-left tracking-tight leading-tight lg:translate-y-12">
              {t('roadmap.title')}
            </h2>

          </div>
      </div>

      {/* Desktop/Tablet Roadmap with Original Curve */}
      <div className="hidden lg:block relative pb-16 xl:pb-24">
        <div className="relative h-[500px] xl:h-[600px] max-w-[1920px] mx-auto px-4">
          {/* SVG Container with Fixed Nodes */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <svg
              className="w-full h-auto max-w-full"
              viewBox="0 0 1200 400"
              preserveAspectRatio="xMidYMid meet"
              style={{ maxHeight: '100%' }}
            >
              {/* Background SVG Curve */}
              <image 
                href="/img/vector-1-1.svg" 
                x="0" 
                y="0" 
                width="1200" 
                height="400"
                preserveAspectRatio="xMidYMid meet"
              />
              
              {/* Fixed Timeline Dots - 固定在SVG坐标系内 */}
              {roadmapPhases.map((phase, index) => (
                <g key={`dot-${phase.id}`}>
                 

                  {/* 外层背景圆 */}
                  <circle
                    cx={phase.svg.cx}
                    cy={phase.svg.cy}
                    r="16"
                    fill="rgba(255, 255, 255, 0.3)"
                    filter="url(#dropShadow)"
                  />

                  {/* 内层发光核心 */}
                  <circle
                    cx={phase.svg.cx}
                    cy={phase.svg.cy}
                    r="6"
                    fill="rgba(255, 167, 0, 1)"
                    className="animate-pulse blur-sm"
                  />

                </g>
              ))}

              {/* 定义滤镜效果 */}
              <defs>
                <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feOffset dx="0" dy="2" result="offset"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* Phase 标题容器 - 第一组循环 */}
          {roadmapPhases.map((phase, index) => (
            <div
              key={`title-${phase.id}`}
              className="absolute animate-fadeInUp"
              style={{
                top: phase.desktop.title.top,
                left: phase.desktop.title.left,
                animationDelay: `${index * 0.2}s`,
                zIndex: 30
              }}
            >
              <div className="text-center">
                <h3 className="[font-family:'Manrope',Helvetica] font-extrabold text-sm xl:text-base text-orange-400 drop-shadow-lg">
                  {t(`roadmap.phases.${phase.id}.phase`)}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-bold text-xl xl:text-2xl text-white drop-shadow-lg">
                  {t(`roadmap.phases.${phase.id}.quarter`)}
                </p>
              </div>
            </div>
          ))}

          {/* Phase 描述容器 - 第二组循环 */}
          {roadmapPhases.map((phase, index) => (
            <div
              key={`description-${phase.id}`}
              className="absolute animate-fadeInUp"
              style={{
                top: phase.desktop.description.top,
                left: phase.desktop.description.left,
                animationDelay: `${index * 0.2 + 0.1}s`,
                zIndex: 10
              }}
            >
              {/* Description - 带背景样式的P标签 */}
              <p
                className="[font-family:'Manrope',Helvetica] font-normal text-white/90 text-xs xl:text-sm leading-relaxed text-left p-6 backdrop-blur-sm"
                style={{
                  width: '466px',
                  borderRadius: '28px',
                  background: 'linear-gradient(270deg, #081122 0%, #101B32 100%)'
                }}
              >
                {t(`roadmap.phases.${phase.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Roadmap - Vertical Timeline with Grid Background */}
      <div className="lg:hidden relative pb-16">
        {/* Mobile Grid Background - Similar to PC */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="mobile-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mobile-grid)" />
          </svg>
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
          {/* Vertical Timeline Line - Thicker and with gradient */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ffa700] via-[#00d4ff] to-[#d03d0a] opacity-60"></div>

          <div className="space-y-16 sm:space-y-20">
            {roadmapPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative animate-fadeInUp pl-16 sm:pl-20`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot - Larger with glow effect like PC */}
                <div className="absolute left-3 sm:left-5 top-6 transform -translate-x-1/2 z-20">
                  {/* Outer glow circle */}
                  <div
                    className="absolute inset-0 rounded-full blur-md animate-pulse"
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: phase.color,
                      opacity: 0.4,
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%'
                    }}
                  ></div>

                  {/* Outer white circle */}
                  <div
                    className="relative rounded-full flex items-center justify-center"
                    style={{
                      width: '28px',
                      height: '28px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Inner glowing core */}
                    <div
                      className="rounded-full animate-pulse"
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: phase.color,
                        boxShadow: `0 0 10px ${phase.color}`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Phase Card - Enhanced design */}
                <div
                  className="relative overflow-hidden backdrop-blur-sm"
                  style={{
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(27, 36, 54, 0.85) 0%, rgba(8, 17, 34, 0.85) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  {/* Colored accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{
                      background: `linear-gradient(90deg, ${phase.color} 0%, transparent 100%)`
                    }}
                  ></div>

                  <div className="p-5 sm:p-6">
                    {/* Content */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Phase Label & Quarter */}
                      <div className="flex items-baseline gap-3">
                        <span
                          className="[font-family:'Manrope',Helvetica] font-extrabold text-base sm:text-lg tracking-wide"
                          style={{ color: phase.color }}
                        >
                          {t(`roadmap.phases.${phase.id}.phase`)}
                        </span>
                        <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl sm:text-2xl">
                          {t(`roadmap.phases.${phase.id}.quarter`)}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm sm:text-base leading-relaxed">
                        {t(`roadmap.phases.${phase.id}.description`)}
                      </p>
                    </div>
                  </div>

                  {/* Bottom glow effect */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at bottom, ${phase.color}15 0%, transparent 70%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReversedSectionBackground
        glowSize={{ width: '800px', height: '400px' }}
        glowOpacity="/8"
        backgroundPositionDesktop="center"
        backgroundPositionMobile="top"
      />
      </Web3SectionAnimator>
    </section>
  );
}