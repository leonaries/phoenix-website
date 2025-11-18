import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';
import ReversedSectionBackground from './ReversedSectionBackground';
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
      <SectionBackground 
        glowSize={{ width: '800px', height: '400px' }}
        glowOpacity="/8"
      />
      
      {/* Section Header */}
      <div className="text-center pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 animate-fadeInUp">
          {/* Title */}
          <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-left tracking-tight leading-tight translate-y-12">
            {t('roadmap.title')}
          </h2>
          
        </div>
      </div>

      {/* Desktop/Tablet Roadmap with Original Curve */}
      <div className="hidden lg:block relative pb-16 xl:pb-24">
        <div className="relative h-[500px] xl:h-[600px] max-w-[1920px] mx-auto px-4">
          {/* SVG Container with Fixed Nodes */}
          <div className="absolute inset-0 flex items-center justify-center">
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
                zIndex: 10
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

      {/* Mobile Roadmap - Vertical Timeline */}
      <div className="lg:hidden px-4 sm:px-6 pb-16">
        <div className="relative max-w-2xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ffa700] via-[#00d4ff] to-[#d03d0a] rounded-full"></div>
          
          <div className="space-y-12">
            {roadmapPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative animate-fadeInUp pl-20`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 top-8 transform -translate-x-1/2 z-20">
                  <div className={`w-6 h-6 rounded-full border-2 border-white`} style={{ backgroundColor: phase.color }}>
                    <div className="absolute inset-0 rounded-full animate-pulse" style={{ backgroundColor: phase.color, opacity: 0.3 }}></div>
                  </div>
                </div>

                {/* Phase Card */}
                <div className="bg-[#1a2332]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  {/* Content */}
                  <div className="space-y-3">
                    {/* Phase & Quarter */}
                    <div className="flex items-center justify-between">
                      <span className="[font-family:'Manrope',Helvetica] font-extrabold text-lg tracking-wide" style={{ color: phase.color }}>
                        {t(`roadmap.phases.${phase.id}.phase`)}
                      </span>
                      <span className="[font-family:'Manrope',Helvetica] font-bold text-white/80 text-sm">
                        {t(`roadmap.phases.${phase.id}.quarter`)}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-xl tracking-tight leading-tight">
                      {t(`roadmap.phases.${phase.id}.title`)}
                    </h3>
                    
                    {/* Description */}
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-sm leading-relaxed">
                      {t(`roadmap.phases.${phase.id}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReversedSectionBackground
        glowSize={{ width: '800px', height: '400px' }}
        glowOpacity="/8"
      />
    </section>
  );
}