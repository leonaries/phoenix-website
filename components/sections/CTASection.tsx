import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import { DAPP_URL } from '@/data/siteData';
import SectionBackground from './SectionBackground';

interface CTASectionProps {
  lang: string;
}

// Social links data
const socialLinks = [
  { 
    id: "twitter", 
    icon: "/img/mask-group-7.png", 
    href: "https://x.com/Phnx_fi",
    hoverColor: "hover:bg-[#1da1f2]/20 hover:border-[#1da1f2]/50"
  },
  { 
    id: "telegram", 
    icon: "/img/mask-group-8.png", 
    href: "https://t.me/Phoenix_Protocol",
    hoverColor: "hover:bg-[#0088cc]/20 hover:border-[#0088cc]/50"
  },
  { 
    id: "discord", 
    icon: "/img/mask-group-9.png", 
    href: "https://discord.gg/pNr65uHs",
    hoverColor: "hover:bg-[#5865f2]/20 hover:border-[#5865f2]/50"
  }
];

// Phoenix workflow steps
const workflowSteps = [
  { id: "mint", color: "#ffa700" },
  { id: "borrow", color: "#00d4ff" },
  { id: "stake", color: "#d03d0a" },
  { id: "earn", color: "#06ffa5" }
];

export default async function CTASection({ lang }: CTASectionProps) {
  const { t } = await initI18nServer(lang);
  
  return (
    <section className="w-full relative overflow-hidden">
      <SectionBackground showGlow={false} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#081122] via-[#0f1b2e] to-[#081122]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(252,158,1,0.1)_0%,transparent_70%)]"></div>
      
      {/* Background Image with Blend Mode */}
      <div className="absolute inset-0 opacity-30">
        <img
          className="w-full h-full object-cover mix-blend-screen"
          alt={t('cta.backgroundAlt')}
          src="/img/rectangle-14.png"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA Section */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 animate-fadeInUp">
              
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#fc9e01]/20 to-[#d03d0a]/20 border border-[#fc9e01]/30 backdrop-blur-sm">
                <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#fc9e01] text-sm sm:text-base tracking-wide">
                  {t('cta.badge')}
                </span>
              </div>
              
              {/* Main Title */}
              <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight">
                {t('cta.title')}
              </h2>
              
              {/* Workflow Steps */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 lg:gap-12 mb-8">
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 sm:gap-4">
                    {/* Step */}
                    <div className="flex items-center gap-2 sm:gap-3 animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div 
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                        style={{ backgroundColor: step.color }}
                      ></div>
                      <span 
                        className="[font-family:'Manrope',Helvetica] font-semibold text-sm sm:text-base lg:text-lg tracking-wide"
                        style={{ color: step.color }}
                      >
                        {t(`cta.workflow.${step.id}`)}
                      </span>
                    </div>
                    
                    {/* Arrow (except for last item) */}
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden sm:block text-white/40 text-xl lg:text-2xl animate-fadeInUp" style={{ animationDelay: `${index * 0.1 + 0.05}s` }}>
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Subtitle */}
              <p className="[font-family:'Manrope',Helvetica] font-light text-white/80 text-base sm:text-lg text-center leading-relaxed max-w-3xl mx-auto">
                {t('cta.subtitle')}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <a href={DAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#ffa700] to-[#d03d0a] hover:shadow-[0_0_30px_rgba(255,167,0,0.4)] hover:scale-105 transition-all duration-300 group">
                  <span className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg tracking-wide">
                    {t('buttons.launchApp')}
                  </span>
                  <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                
                <a href="#features" className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border-2 border-white/20 text-white hover:border-[#fc9e01] hover:text-[#fc9e01] transition-all duration-300">
                  <span className="[font-family:'Manrope',Helvetica] font-semibold text-base tracking-wide">
                    {t('cta.exploreFeatures')}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Community Section */}
          <div className="border-t border-white/10 pt-16 sm:pt-20">
            <div className="text-center space-y-8 sm:space-y-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              
              {/* Community Title */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl sm:text-2xl lg:text-3xl tracking-tight">
                  {t('cta.community.title')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                  {t('cta.community.description')}
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center items-center gap-4 sm:gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 sm:p-4 rounded-xl bg-gradient-to-br from-[#1a2332]/80 to-[#081122]/80 border border-white/10 ${social.hoverColor} backdrop-blur-sm transition-all duration-300 hover:scale-110 animate-fadeInUp`}
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <img
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                      alt={t(`cta.social.${social.id}`)}
                      src={social.icon}
                    />
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#fc9e01]/0 via-[#fc9e01]/10 to-[#d03d0a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>


            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
