import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import HeroAnimationWrapper from './HeroAnimationWrapper';
import ServerHeroSectionClient from './ServerHeroSectionClient';
import HeroFireLogoContainer from './HeroFireLogoContainer';
import { StarField3D } from '@/components/animations';
import { DAPP_URL } from '@/data/siteData';

interface ServerHeroSectionProps {
  lang: string;
}

export default async function ServerHeroSection({ lang }: ServerHeroSectionProps) {
  const i18n = await initI18nServer(lang);

  return (
    <section className="w-full px-8 py-24 lg:py-32 relative overflow-hidden">
      {/* 3D 星空粒子效果 - 限制在Hero Section内 */}
      <StarField3D />

      <HeroAnimationWrapper>
      {/* 燃烧 Logo - 桌面端全屏居中（仅桌面端显示，动画完成后） */}
      <div className="hidden lg:block">
        <HeroFireLogoContainer />
      </div>

      {/* 页面内容 - 1.5秒后淡入 */}
      <ServerHeroSectionClient>
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#ffa700]/20 to-[#d03d0a]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#fc9e01]/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* 移动端：垂直布局 (文字在上，Logo在下) */}
        <div className="flex flex-col lg:hidden space-y-8">
          {/* 移动端：文字内容 */}
          <div className="space-y-4 sm:space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ffa700]/20 to-[#d03d0a]/20 border border-[#ffa700]/30">
              <span className="text-[#fc9e01] text-xs font-medium">{i18n.t('hero.badge')}</span>
            </div>

            {/* Main headline */}
            <h1 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-3xl sm:text-4xl tracking-[-0.02em] leading-[1.1]">
              <span className="block">{i18n.t('hero.title.holdTo')}</span>
              <span className="bg-gradient-to-r from-[#ffa700] to-[#d03d0a] bg-clip-text text-transparent">
                {i18n.t('hero.title.earn')}
              </span>
              <span className="block text-2xl sm:text-3xl mt-1 text-white/90">
                {i18n.t('hero.title.makeDeFiStable')}
              </span>
            </h1>

            {/* Description */}
            <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm sm:text-base tracking-[-0.01em] leading-relaxed max-w-xl">
              {i18n.t('hero.description').split('Phoenix').map((part, index, array) =>
                index === array.length - 1 ? part : (
                  <React.Fragment key={index}>
                    {part}<span className="text-[#fc9e01] font-medium">Phoenix</span>
                  </React.Fragment>
                )
              )}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6">
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-[#fc9e01]">$10B+</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.targetTVL')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-[#fc9e01]">15%+</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.stableYield')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold text-[#fc9e01]">Multi</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.multiChain')}</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#features" className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a] hover:shadow-[0_0_30px_rgba(255,167,0,0.4)] transition-all duration-300 hover:scale-105">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  {i18n.t('buttons.exploreFeatures')}
                </span>
                <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <a href={DAPP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#ffa700] bg-transparent hover:bg-gradient-to-r hover:from-[#ffa700] hover:to-[#d03d0a] hover:border-transparent transition-all duration-300 hover:scale-105">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-[#fc9e01] group-hover:text-white text-base tracking-[0] leading-[normal] whitespace-nowrap transition-colors duration-300">
                  {i18n.t('buttons.launchApp')}
                </span>
                <svg className="w-4 h-4 text-[#fc9e01] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* 移动端：Logo 区域（简单垂直排列） */}
          <div className="relative w-full h-[400px] sm:h-[500px]">
            <HeroFireLogoContainer />
          </div>
        </div>

        {/* 桌面端：紧凑布局 */}
        <div className="hidden lg:block lg:max-w-3xl">
          {/* Content */}
          <div className="space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ffa700]/20 to-[#d03d0a]/20 border border-[#ffa700]/30">
              <span className="text-[#fc9e01] text-xs font-medium">{i18n.t('hero.badge')}</span>
            </div>

            {/* Main headline */}
            <h1 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-3xl lg:text-4xl xl:text-5xl tracking-[-0.02em] leading-[1.1]">
              <span className="block">{i18n.t('hero.title.holdTo')}</span>
              <span className="bg-gradient-to-r from-[#ffa700] to-[#d03d0a] bg-clip-text text-transparent">
                {i18n.t('hero.title.earn')}
              </span>
              <span className="block text-2xl lg:text-3xl xl:text-4xl mt-1 text-white/90">
                {i18n.t('hero.title.makeDeFiStable')}
              </span>
            </h1>

            {/* Description */}
            <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm lg:text-base tracking-[-0.01em] leading-relaxed max-w-2xl">
              {i18n.t('hero.description').split('Phoenix').map((part, index, array) =>
                index === array.length - 1 ? part : (
                  <React.Fragment key={index}>
                    {part}<span className="text-[#fc9e01] font-medium">Phoenix</span>
                  </React.Fragment>
                )
              )}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 py-4">
              <div className="text-center">
                <div className="text-lg lg:text-xl font-bold text-[#fc9e01]">$10B+</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.targetTVL')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-xl font-bold text-[#fc9e01]">15%+</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.stableYield')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg lg:text-xl font-bold text-[#fc9e01]">Multi</div>
                <div className="text-xs text-white/60">{i18n.t('hero.stats.multiChain')}</div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a href="#features" className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a] hover:shadow-[0_0_30px_rgba(255,167,0,0.4)] transition-all duration-300 hover:scale-105">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  {i18n.t('buttons.exploreFeatures')}
                </span>
                <svg className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <a href={DAPP_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#ffa700] bg-transparent hover:bg-gradient-to-r hover:from-[#ffa700] hover:to-[#d03d0a] hover:border-transparent transition-all duration-300 hover:scale-105">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-[#fc9e01] group-hover:text-white text-base tracking-[0] leading-[normal] whitespace-nowrap transition-colors duration-300">
                  {i18n.t('buttons.launchApp')}
                </span>
                <svg className="w-4 h-4 text-[#fc9e01] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </ServerHeroSectionClient>
      </HeroAnimationWrapper>
    </section>
  );
}
