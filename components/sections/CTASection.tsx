import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import { DAPP_URL } from '@/data/siteData';
import Web3SectionAnimator from '@/components/animations/Web3SectionAnimator';

interface CTASectionProps {
  lang: string;
}

// Social links data
const socialLinks = [
  {
    id: "twitter",
    icon: "/img/mask-group-7.png",
    href: "https://x.com/Phnx_fi"
  },
  {
    id: "telegram",
    icon: "/img/mask-group-8.png",
    href: "https://discord.gg/pNr65uHs"
  },
  {
    id: "discord",
    icon: "/img/mask-group-9.png",
    href: "https://t.me/Phoenix_Protocol"
  }
];


export default async function CTASection({ lang }: CTASectionProps) {
  const { t } = await initI18nServer(lang);

  return (
    <section id="CTASection" className="w-full relative overflow-hidden">
      <Web3SectionAnimator animationType="neon" className="w-full">
            
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA Section - Orange Card Design */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
         
            <div className="max-w-4xl mx-auto">
              {/* Orange Card Container */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#B85C38] via-[#8B4513] to-[#6D2C0A] p-8 sm:p-12 lg:p-16 shadow-2xl">

                {/* Card Background Image */}
                <div className="absolute inset-0">
                  <img
                    className="w-full h-full object-cover"
                    alt="Card Background"
                    src="/img/rectangle-14.png"
                  />
                </div>


                {/* Card Content */}
                <div className="relative z-10 space-y-6 sm:space-y-8">
                  {/* Card Title */}
                  <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight">
                    {t('cta.title')}
                  </h2>

                  {/* Card Workflow Steps */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white/90 text-base sm:text-lg">
                      {t('cta.workflow.mint')}
                    </span>
                    <span className="text-white/70 text-lg">→</span>
                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white/90 text-base sm:text-lg">
                      {t('cta.workflow.borrow')}
                    </span>
                    <span className="text-white/70 text-lg">→</span>
                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white/90 text-base sm:text-lg">
                      {t('cta.workflow.stake')}
                    </span>
                    <span className="text-white/70 text-lg">→</span>
                    <span className="[font-family:'Manrope',Helvetica] font-medium text-white/90 text-base sm:text-lg">
                      {t('cta.workflow.earn')}
                    </span>
                  </div>

                  {/* Card CTA Button */}
                  <div className="flex justify-center pt-4">
                    <a href={DAPP_URL} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-[#ffa700] bg-transparent text-[#ffa700] hover:bg-[#ffa700] hover:text-white transition-all duration-300 group">
                      <span className="[font-family:'Manrope',Helvetica] font-semibold text-lg tracking-wide">
                        {t('buttons.launchApp')}
                      </span>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Section - Simplified Design */}
          <div>
            <div className="text-center space-y-8 sm:space-y-10 max-w-4xl mx-auto">

              {/* Community Title */}
              <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                {t('cta.community.title')}
              </h3>

              {/* Social Links - Simplified Design */}
              <div className="flex justify-center items-center gap-6 sm:gap-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#1a2332]/60 to-[#081122]/80 border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  >
                    <img
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                      alt={t(`cta.social.${social.id}`)}
                      src={social.icon}
                    />
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
      </Web3SectionAnimator>
    </section>
  );
}
