import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';

interface FooterProps {
  lang: string;
}

// Footer navigation links
const footerLinks = [
  { key: "docs", href: "https://docs.phnx.finance" },
  { key: "github", href: "https://github.com/phnx-finance" },
  { key: "contracts", href: "https://github.com/phnx-finance" },
  { key: "audits", href: "https://github.com/phnx-finance" },
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" }
];

export default async function Footer({ lang }: FooterProps) {
  const { t } = await initI18nServer(lang);
  
  return (
    <footer className="w-full relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#081122] via-[#0f1b2e] to-[#1a2332]"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Single Row Footer */}
          <div className="flex flex-col items-center gap-6 animate-fadeInUp">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8"
                alt="Phoenix Logo"
                src="/img/logo_footer.png"
              />
              <span className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-lg tracking-tight">
                Phoenix
              </span>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              {footerLinks.map((item, index) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="[font-family:'Manrope',Helvetica] font-normal text-white/70 hover:text-[#fc9e01] transition-colors duration-300 text-sm"
                >
                  {t(`footer.links.${item.key}`)}
                </a>
              ))}
            </nav>
            
            {/* Copyright */}
            <p className="[font-family:'Manrope',Helvetica] font-normal text-white/50 text-xs text-center">
              © 2025 Phoenix. {t('footer.copyright')}
            </p>
            
          </div>
          
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#081122] to-transparent pointer-events-none"></div>
    </footer>
  );
}
