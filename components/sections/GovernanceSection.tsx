import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';

interface GovernanceSectionProps {
  lang: string;
}

export default async function GovernanceSection({ lang }: GovernanceSectionProps) {
  const { t } = await initI18nServer(lang);

  return (
    <section id="governance" className="w-full relative overflow-hidden">
      <SectionBackground
        glowSize={{ width: '600px', height: '300px' }}
        glowOpacity="/8"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight animate-fadeInUp">
              {t('governance.title')}
            </h2>
          </div>

          {/* Governance Flow Chart - Desktop */}
          <div className="hidden lg:block relative max-w-4xl mx-auto">
            <div className="relative h-[400px]">

              {/* Root Node - Governance */}
              <div className="absolute top-0 left-[41%] transform -translate-x-1/2 animate-fadeInUp">
                <div
                  className="backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(90deg, #081327 0%, #1D448D 100%)',
                    borderRadius: '8px'
                  }}
                >
                  <div className="px-8 py-4">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-lg tracking-tight" style={{ color: '#FC9E01' }}>
                      Governance
                    </h3>
                  </div>
                </div>
              </div>

              {/* Connection Lines - SVG */}
              <div className="absolute top-12 left-0 w-full h-full">
                <svg className="w-full h-full" viewBox="0 0 800 300">
                  {/* Vertical line down from root */}
                  <line
                    x1="400" y1="50"
                    x2="400" y2="120"
                    stroke="rgba(255,167,0,0.5)"
                    strokeWidth="2"
                  />

                  {/* Horizontal line across */}
                  <line
                    x1="150" y1="120"
                    x2="650" y2="120"
                    stroke="rgba(255,167,0,0.5)"
                    strokeWidth="2"
                  />

                  {/* Vertical lines down to features */}
                  <line
                    x1="200" y1="120"
                    x2="200" y2="180"
                    stroke="rgba(255,167,0,0.5)"
                    strokeWidth="2"
                  />
                  <line
                    x1="400" y1="120"
                    x2="400" y2="180"
                    stroke="rgba(255,167,0,0.5)"
                    strokeWidth="2"
                  />
                  <line
                    x1="600" y1="120"
                    x2="600" y2="180"
                    stroke="rgba(255,167,0,0.5)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Feature Nodes */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between items-end">
                {/* DAO */}
                <div className="w-64 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                      DAO
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                      Progressive DAO to gradually achieve decentralized decision-making
                    </p>
                  </div>
                </div>

                {/* $FIRE */}
                <div className="w-64 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                      $FIRE
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                      $FIRE governance token for rights and value capture
                    </p>
                  </div>
                </div>

                {/* Badge + point */}
                <div className="w-64 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                  <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                      Badge + point
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                      Badge + point-weighted voting to empower contributors with greater influence
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Layout - Simple Vertical Stack */}
          <div className="lg:hidden space-y-8">

            {/* Root Node - Governance */}
            <div className="text-center animate-fadeInUp">
              <div
                className="inline-block backdrop-blur-sm border border-white/20"
                style={{
                  background: 'linear-gradient(180deg, #081327 0%, #1D448D 100%)',
                  borderRadius: '8px'
                }}
              >
                <div className="px-8 py-4">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-lg tracking-tight" style={{ color: '#FC9E01' }}>
                    Governance
                  </h3>
                </div>
              </div>
            </div>

            {/* Feature Cards - Stacked */}
            <div className="space-y-6">
              <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    DAO
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    Progressive DAO to gradually achieve decentralized decision-making
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    $FIRE
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    $FIRE governance token for rights and value capture
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    Badge + point
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    Badge + point-weighted voting to empower contributors with greater influence
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
