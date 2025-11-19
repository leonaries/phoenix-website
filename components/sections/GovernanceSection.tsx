import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';

interface GovernanceSectionProps {
  lang: string;
}

export default async function GovernanceSection({ lang }: GovernanceSectionProps) {
  const { t } = await initI18nServer(lang);

  return (
    <section id="governance" className="w-full relative overflow-hidden">

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-10">
            <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight animate-fadeInUp">
              {t('governance.title')}
            </h2>
          </div>

          {/* Governance Flow Chart - Desktop */}
          <div className="hidden lg:block relative max-w-6xl mx-auto">
            <div className="relative h-[400px]">

              {/* Root Node - Governance */}
              <div className="absolute top-0 left-[42%] transform -translate-x-1/2 animate-fadeInUp">
                <div
                  className="backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(90deg, #081327 0%, #1D448D 100%)',
                    borderRadius: '8px',
                    width: '206px'
                  }}
                >
                  <div className="px-8 py-4">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-lg tracking-tight text-center" style={{ color: '#FC9E01' }}>
                      {t('governance.features.dao.rootNode', 'Governance')}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Connection Lines - 使用div和渐变边框 */}
              <div className="absolute top-12 left-0 w-full h-full">
                {/* 垂直线：从 Governance 向下 */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '15px',
                    width: '2px',
                    height: '70px',
                    background: 'linear-gradient(180deg, #38404D 0%, #38404D 100%)'
                  }}
                />

                {/* 水平圆角长方形 - 中间横线（使用伪元素实现渐变边框，底部渐变到透明） */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '70px',
                    width: '1007px',
                    height: '184px',
                    borderRadius: '24px',
                    background: `
                      linear-gradient(#071222, #071222) padding-box,
                      linear-gradient(180deg, #38404D 0%, rgba(130, 149, 179, 0) 100%) border-box
                    `,
                    border: '2px solid transparent'
                  }}
                />

          
              </div>

              {/* Feature Nodes */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between items-end">
                {/* DAO */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.2s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.dao.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.dao.description')}
                    </p>
                  </div>
                </div>

                {/* $FIRE */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.4s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.fire.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.fire.description')}
                    </p>
                  </div>
                </div>

                {/* Badge + point */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.6s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.badge.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.badge.description')}
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
                    {t('governance.features.dao.rootNode', 'Governance')}
                  </h3>
                </div>
              </div>
            </div>

            {/* Feature Cards - Stacked */}
            <div className="space-y-6">
              <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.dao.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.dao.description')}
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.fire.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.fire.description')}
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.badge.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.badge.description')}
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
