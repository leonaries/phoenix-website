import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';
import SectionBackground from './SectionBackground';

interface VisionSectionProps {
  lang: string;
}

export default async function VisionSection({ lang }: VisionSectionProps) {
  const { t } = await initI18nServer(lang);
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 relative overflow-hidden">
      <SectionBackground showGradient={false} showGlow={false} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center space-y-4 sm:space-y-5">
          {/* Section title */}
          <div className="[font-family:'Manrope',Helvetica] font-bold text-sm sm:text-base lg:text-lg tracking-[0] leading-[normal] animate-fadeInUp">
            <span className="text-white opacity-60">|</span>
            <span className="text-[#fc9e01] mx-2 sm:mx-3 relative">
              {t('vision.badge')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#fc9e01] to-transparent opacity-50"></div>
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
            
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#081122]/20 pointer-events-none rounded-lg"></div>
          </div>

          {/* Optional: Add a subtle call-to-action or visual element */}
          <div className="pt-3 sm:pt-4 lg:pt-5 animate-fadeInUp animation-delay-600">
            <div className="w-12 sm:w-16 lg:w-20 h-0.5 bg-gradient-to-r from-transparent via-[#fc9e01] to-transparent mx-auto opacity-60"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
