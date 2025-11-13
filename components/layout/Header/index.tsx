import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import { navigationItems, DAPP_URL } from '@/data/siteData';
import { LanguageSelector } from './LanguageSelector';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  lang: string;
}

export default async function Header({ lang }: HeaderProps) {
  const i18n = await initI18nServer(lang);

  // 准备翻译数据给客户端组件
  const translations = {
    'nav.overview': i18n.t('nav.overview'),
    'nav.features': i18n.t('nav.features'),
    'nav.roadmap': i18n.t('nav.roadmap'),
    'nav.governance': i18n.t('nav.governance'),
    'nav.partners': i18n.t('nav.partners'),
    'buttons.launchApp': i18n.t('buttons.launchApp'),
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#081122]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 relative">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="w-[100px] h-[30px] lg:w-[120px] lg:h-[36px]"
              alt="Phoenix Logo"
              src="/img/frame-12.svg"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={`/${lang}${item.href}`}
                className="[font-family:'Montserrat',Helvetica] font-normal text-white text-sm lg:text-base tracking-[0] leading-[normal] hover:text-[#fc9e01] transition-colors duration-300 relative group"
              >
                {i18n.t(`nav.${item.label.toLowerCase()}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#ffa700] to-[#d03d0a] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Side - Language and Launch App */}
          <div className="flex items-center space-x-4">
            {/* Desktop Language Selector and Launch App Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSelector />
              <a href={DAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-[25px] bg-gradient-to-r from-[#ffa700] to-[#d03d0a] hover:shadow-[0_0_20px_rgba(255,167,0,0.4)] hover:scale-105 transition-all duration-300">
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm lg:text-base tracking-[0] leading-[normal] whitespace-nowrap">
                  {i18n.t('buttons.launchApp')}
                </span>
              </a>
            </div>

            {/* Mobile Menu */}
            <MobileMenu lang={lang} translations={translations} />
          </div>
        </div>
      </div>
    </header>
  );
}
