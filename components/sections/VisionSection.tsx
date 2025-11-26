import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import Web3SectionAnimator from '@/components/animations/Web3SectionAnimator';

interface VisionSectionProps {
  lang: string;
}

export default async function VisionSection({ lang }: VisionSectionProps) {
  const { t } = await initI18nServer(lang);
  return (
    <section id="vision" className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 relative overflow-hidden">
      <Web3SectionAnimator animationType="matrix" className="w-full">
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-4 sm:space-y-5">
          {/* Section title */}
          <div className="[font-family:'Manrope',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-[normal] animate-fadeInUp">
            <span className="text-white opacity-60">|</span>
            <span className="text-[#fc9e01] mx-2 sm:mx-3 relative">
              {t('vision.badge')}
            </span>
            <span className="text-white opacity-60">|</span>
          </div>

          {/* Main heading */}
          <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            {t('vision.title')}
          </h2>

          {/* Description */}
          <div className="relative max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
            <p className="[font-family:'Manrope',Helvetica] font-light text-white/90 text-base sm:text-lg text-center tracking-wide leading-relaxed px-4 sm:px-6 lg:px-0">
              {t('vision.description')}
            </p>
            
            Subtle gradient overlay for depth
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#081122]/20 pointer-events-none rounded-lg"></div>
          </div>

        
        </div>
      </div>
      </Web3SectionAnimator>
    </section>
  );
}
