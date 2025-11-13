'use client';
import React, { useState } from 'react';
import { navigationItems, DAPP_URL } from '@/data/siteData';
import { LanguageSelector } from './LanguageSelector';
import { MenuIcon, CloseIcon } from '@/components/ui/Icons';

interface MobileMenuProps {
  lang: string;
  translations: {
    [key: string]: string;
  };
}

export function MobileMenu({ lang, translations }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center space-x-3">
        <LanguageSelector />
        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#fc9e01] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
          aria-expanded={isOpen}
          aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        >
          {isOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#081122] border-b border-white/10 transition-all duration-300 ease-in-out shadow-lg ${
          isOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible -translate-y-2'
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {/* Mobile Navigation Links */}
          <nav className="space-y-3">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={`/${lang}${item.href}`}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-white hover:text-[#fc9e01] hover:bg-white/5 transition-colors duration-200 [font-family:'Montserrat',Helvetica] font-normal text-base"
              >
                {translations[`nav.${item.label.toLowerCase()}`] || item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Launch App Button */}
          <div className="pt-4 border-t border-white/10">
            <a
              href={DAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-[25px] bg-gradient-to-r from-[#ffa700] to-[#d03d0a] hover:shadow-[0_0_20px_rgba(255,167,0,0.4)] hover:scale-105 transition-all duration-300"
            >
              <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-base tracking-[0] leading-[normal] whitespace-nowrap">
                {translations['buttons.launchApp'] || 'Launch App'}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
