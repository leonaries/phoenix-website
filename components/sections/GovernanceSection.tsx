import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';

interface GovernanceSectionProps {
  lang: string;
}

// Governance features data with translation keys
const governanceFeatures = [
  {
    id: "dao",
    icon: "/img/dao.png",
    gradient: "from-[#ffa700]/10 to-[#d03d0a]/10",
    iconBg: "bg-gradient-to-br from-[#ffa700]/20 to-[#d03d0a]/10"
  },
  {
    id: "fire",
    icon: "/img/fire.png", 
    gradient: "from-[#00d4ff]/10 to-[#0099cc]/10",
    iconBg: "bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/10"
  },
  {
    id: "badge",
    icon: "/img/badge-point.png",
    gradient: "from-[#9d4edd]/10 to-[#7209b7]/10",
    iconBg: "bg-gradient-to-br from-[#9d4edd]/20 to-[#7209b7]/10"
  }
];

// Community engagement data
const communityEngagement = [
  { id: "proposals", position: "top-left" },
  { id: "quests", position: "bottom-left" }, 
  { id: "incentives", position: "top-right" },
  { id: "cobuilding", position: "bottom-right" }
];

export default async function GovernanceSection({ lang }: GovernanceSectionProps) {
  const { t } = await initI18nServer(lang);
  
  return (
    <section id="governance" className="w-full relative overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#fc9e01]/20 to-[#d03d0a]/20 border border-[#fc9e01]/30 backdrop-blur-sm">
                <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#fc9e01] text-sm sm:text-base tracking-wide">
                  {t('governance.badge')}
                </span>
              </div>
              
              {/* Title */}
              <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight">
                {t('governance.title')}
              </h2>
              
              {/* Subtitle */}
              <p className="[font-family:'Manrope',Helvetica] font-light text-white/80 text-sm sm:text-base lg:text-lg text-center leading-relaxed max-w-3xl mx-auto">
                {t('governance.subtitle')}
              </p>
            </div>
          </div>

          {/* Governance Features Grid */}
          <div className="mb-20 sm:mb-24 lg:mb-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {governanceFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group relative bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-white/20 hover:bg-gradient-to-br hover:from-white/5 hover:to-white/5 transition-all duration-500 animate-fadeInUp`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon Container */}
                  <div className={`${feature.iconBg} rounded-2xl w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                      alt={t(`governance.features.${feature.id}.title`)}
                      src={feature.icon}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base sm:text-lg tracking-tight">
                      {t(`governance.features.${feature.id}.title`)}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm sm:text-base leading-relaxed">
                      {t(`governance.features.${feature.id}.description`)}
                    </p>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#fc9e01]/0 via-[#fc9e01]/5 to-[#d03d0a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Engagement Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="space-y-3 sm:space-y-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl text-center tracking-tight leading-tight">
                {t('governance.community.title')}
              </h3>
              <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-base sm:text-lg text-center leading-relaxed max-w-3xl mx-auto">
                {t('governance.community.subtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Community Engagement Layout - Compact Trapezoid */}
          <div className="hidden lg:block relative">
            <div className="max-w-6xl mx-auto">
              {/* Flex container for vertical alignment */}
              <div className="flex flex-col items-center gap-3">
                {/* Top Row - Cards 1 & 2 */}
                <div className="flex justify-center gap-3 w-full max-w-3xl">
                  {/* Card 1 - Proposals & Voting */}
                  <div className="flex-1 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-black/20 backdrop-blur-lg border border-white/15 rounded-2xl p-4 hover:bg-black/30 hover:border-[#fc9e01]/40 transition-all duration-500 group">
                      <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-1.5 tracking-tight">
                        {t('governance.community.engagement.proposals.title')}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-xs leading-relaxed">
                        {t('governance.community.engagement.proposals.description')}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 - Quests & Points */}
                  <div className="flex-1 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                    <div className="bg-black/20 backdrop-blur-lg border border-white/15 rounded-2xl p-4 hover:bg-black/30 hover:border-[#fc9e01]/40 transition-all duration-500 group">
                      <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-1.5 tracking-tight">
                        {t('governance.community.engagement.quests.title')}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-xs leading-relaxed">
                        {t('governance.community.engagement.quests.description')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center - Main Visual */}
                <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <div className="relative w-[280px]">
                    {/* Earth base image */}
                    <img
                      className="w-full h-auto object-contain"
                      alt={t('governance.community.imageAlt')}
                      src="/img/earth.png"
                    />
                    {/* Ring overlay - wider than earth, centered using transform */}
                    <img
                      className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[170%] h-auto object-contain animate-spin-slow"
                      alt="Earth Ring"
                      src="/img/earth-ring.png"
                      style={{ animationDuration: '20s' }}
                    />
                  </div>
                </div>

                {/* Bottom Row - Cards 3 & 4 */}
                <div className="flex justify-between gap-3 w-full">
                  {/* Card 3 - Incentives & Recognition */}
                  <div className="flex-1 max-w-xs animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
                    <div className="bg-black/20 backdrop-blur-lg border border-white/15 rounded-2xl p-4 hover:bg-black/30 hover:border-[#fc9e01]/40 transition-all duration-500 group">
                      <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-1.5 tracking-tight">
                        {t('governance.community.engagement.incentives.title')}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-xs leading-relaxed">
                        {t('governance.community.engagement.incentives.description')}
                      </p>
                    </div>
                  </div>

                  {/* Card 4 - Co-Building & Growth */}
                  <div className="flex-1 max-w-xs animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
                    <div className="bg-black/20 backdrop-blur-lg border border-white/15 rounded-2xl p-4 hover:bg-black/30 hover:border-[#fc9e01]/40 transition-all duration-500 group">
                      <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base mb-1.5 tracking-tight">
                        {t('governance.community.engagement.cobuilding.title')}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-xs leading-relaxed">
                        {t('governance.community.engagement.cobuilding.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Community Engagement Layout */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Central Image */}
              <div className="flex justify-center mb-12 sm:mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="relative w-full max-w-[350px] sm:max-w-[450px]">
                  {/* Earth base image */}
                  <img
                    className="w-full h-auto object-contain"
                    alt={t('governance.community.imageAlt')}
                    src="/img/earth.png"
                  />
                  {/* Ring overlay - wider than earth, centered using transform */}
                  <img
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[170%] h-auto object-contain animate-spin-slow"
                    alt="Earth Ring"
                    src="/img/earth-ring.png"
                    style={{ animationDuration: '20s' }}
                  />
                </div>
              </div>
              
              {/* Engagement Cards with Staggered Layout */}
              <div className="space-y-8 sm:space-y-12">
                {communityEngagement.map((item, index) => (
                  <div
                    key={item.id}
                    className={`relative animate-fadeInUp ${
                      index % 2 === 0 ? 'sm:pr-8 lg:pr-0' : 'sm:pl-8 lg:pl-0 sm:ml-auto'
                    }`}
                    style={{ animationDelay: `${0.5 + index * 0.15}s` }}
                  >
                    {/* Card Container */}
                    <div className={`max-w-sm ${index % 2 === 0 ? '' : 'sm:ml-auto'}`}>
                      <div className="bg-black/20 backdrop-blur-lg border border-white/15 rounded-3xl p-6 sm:p-8 hover:bg-black/30 hover:border-[#fc9e01]/40 transition-all duration-500 group">
                        {/* Content */}
                        <div className="space-y-2">
                          <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base sm:text-lg tracking-tight leading-tight">
                            {t(`governance.community.engagement.${item.id}.title`)}
                          </h4>
                          <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                            {t(`governance.community.engagement.${item.id}.description`)}
                          </p>
                        </div>

                        {/* Hover Indicator */}
                        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-[#fc9e01] to-[#d03d0a] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                      </div>
                    </div>

                    {/* Connection Line to Center (Hidden on very small screens) */}
                    <div className={`hidden sm:block absolute top-1/2 ${
                      index % 2 === 0 ? 'right-4' : 'left-4'
                    } w-8 h-0.5 bg-gradient-to-r ${
                      index % 2 === 0 ? 'from-transparent to-white/20' : 'from-white/20 to-transparent'
                    } -translate-y-1/2`}></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
