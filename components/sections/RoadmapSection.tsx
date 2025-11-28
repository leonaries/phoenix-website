import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';
import ReversedSectionBackground from './ReversedSectionBackground';
import Web3SectionAnimator from '@/components/animations/Web3SectionAnimator';

interface RoadmapSectionProps {
  lang: string;
}

// Roadmap phases data - Fixed SVG coordinates + Text positions (title and description positioned independently)
const roadmapPhases = [
  {
    id: "phase1",
    color: "#ffa700",
    svg: { cx: 250, cy: 318 }, // Bottom left node
    desktop: {
      // Title position (below the curve)
      title: {
        top: "85%",
        left: "19%",
      },
      // Description position (above the curve)
      description: {
        top: "37%",
        left: "16%",
      }
    }
  },
  {
    id: "phase2",
    color: "#00d4ff",
    svg: { cx: 600, cy: 186 }, // Middle node
    desktop: {
      // Title position (above the curve)
      title: {
        top: "27%",
        left: "44%",
      },
      // Description position (below the curve)
      description: {
        top: "56%",
        left: "47%",
      }
    }
  },
  {
    id: "phase3",
    color: "#d03d0a",
    svg: { cx: 940, cy: 137 }, // Top right node
    desktop: {
      // Title position (below the curve)
      title: {
        top: "42%",
        left: "73%",
      },
      // Description position (above the curve)
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
          showGradient={false}
        />

        {/* Section Header */}
        <div className="text-center pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4">
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
              
              {/* Fixed Timeline Dots - Fixed within SVG coordinate system */}
              {roadmapPhases.map((phase, index) => (
                <g key={`dot-${phase.id}`}>


                  {/* Outer background circle */}
                  <circle
                    cx={phase.svg.cx}
                    cy={phase.svg.cy}
                    r="16"
                    fill="rgba(255, 255, 255, 0.3)"
                    filter="url(#dropShadow)"
                  />

                  {/* Inner glowing core */}
                  <circle
                    cx={phase.svg.cx}
                    cy={phase.svg.cy}
                    r="6"
                    fill="rgba(255, 167, 0, 1)"
                    className="animate-pulse blur-sm"
                  />

                </g>
              ))}

              {/* Define filter effects */}
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

          {/* Phase title container - First loop */}
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

          {/* Phase description container - Second loop */}
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
              {/* Description - P tag with background styles */}
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
          {/* Vertical Timeline Line - Gradient from #FFA700 to transparent #D03D0A */}
          <div
            className="absolute left-8 sm:left-8 top-[20px] bottom-0 w-1"
            style={{
              background: 'linear-gradient(to bottom, #FFA700 0%, rgba(208, 61, 10, 0) 100%)'
            }}
          ></div>

          <div className="space-y-12 sm:space-y-16">
            {roadmapPhases.map((phase, index) => (
              <div
                key={phase.id}
                className={`relative animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Dot with Phase Info */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Timeline Dot - Yellow/Orange unified */}
                  <div className="relative flex-shrink-0">
                    {/* Outer glow circle */}
                    <div
                      className="absolute inset-0 rounded-full blur-lg animate-pulse"
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#ffa700',
                        opacity: 0.4,
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%'
                      }}
                    ></div>

                    {/* Outer white circle */}
                    <div
                      className="relative rounded-full flex items-center justify-center z-10"
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 0 20px rgba(255, 167, 0, 0.3)',
                        marginLeft: '6px'
                      }}
                    >
                      {/* Inner glowing core */}
                      <div
                        className="rounded-full animate-pulse"
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#ffa700',
                          boxShadow: '0 0 12px #ffa700'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Phase Label & Quarter - Next to circle */}
                  <div className="pt-1">
                    <span
                      className="[font-family:'Manrope',Helvetica] font-extrabold text-lg tracking-wide block"
                      style={{ color: '#ffa700' }}
                    >
                      {t(`roadmap.phases.${phase.id}.phase`)}
                    </span>
                    <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl block mt-1">
                      {t(`roadmap.phases.${phase.id}.quarter`)}
                    </span>
                  </div>
                </div>

                {/* Phase Card - PC style */}
                <div className="ml-12">
                  <div
                    className="backdrop-blur-sm p-5"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '24px'
                    }}
                  >
                    {/* Description */}
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-base leading-relaxed">
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
        backgroundPositionDesktop="center"
        backgroundPositionMobile="top"
        showGradient={false}
      />
      </Web3SectionAnimator>
    </section>
  );
}