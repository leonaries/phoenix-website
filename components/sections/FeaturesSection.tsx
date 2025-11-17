import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';

interface FeaturesSectionProps {
  lang: string;
}
// Feature data with translation keys
const featuresData = [
  {
    id: "01",
    key: "mint",
    icon: "/img/colors_07_1.png",
    gradient: "from-[#ffa700]/20 to-[#ff8c00]/20",
    hoverGradient: "from-[#ffa700]/30 to-[#ff8c00]/30",
    iconBg: "bg-gradient-to-br from-[#ffa700]/20 to-[#ff8c00]/10",
  },
  {
    id: "02", 
    key: "borrow",
    icon: "/img/colors_03_1.png",
    gradient: "from-[#00d4ff]/20 to-[#0099cc]/20",
    hoverGradient: "from-[#00d4ff]/30 to-[#0099cc]/30",
    iconBg: "bg-gradient-to-br from-[#00d4ff]/20 to-[#0099cc]/10",
  },
  {
    id: "03",
    key: "stake",
    icon: "/img/colors_09_1.png",
    gradient: "from-[#d03d0a]/20 to-[#ff4500]/20",
    hoverGradient: "from-[#d03d0a]/30 to-[#ff4500]/30",
    iconBg: "bg-gradient-to-br from-[#d03d0a]/20 to-[#ff4500]/10",
  },
  {
    id: "04",
    key: "quest",
    icon: "/img/colors_24_1.png",
    gradient: "from-[#9d4edd]/20 to-[#7209b7]/20",
    hoverGradient: "from-[#9d4edd]/30 to-[#7209b7]/30",
    iconBg: "bg-gradient-to-br from-[#9d4edd]/20 to-[#7209b7]/10",
  },
  {
    id: "05",
    key: "community",
    icon: "/img/colors_13_1.png",
    gradient: "from-[#06ffa5]/20 to-[#00cc83]/20",
    hoverGradient: "from-[#06ffa5]/30 to-[#00cc83]/30",
    iconBg: "bg-gradient-to-br from-[#06ffa5]/20 to-[#00cc83]/10",
  },
];



export default async function FeaturesSection({ lang }: FeaturesSectionProps) {
  const { t } = await initI18nServer(lang);
  
  return (
    <section id="features" className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 relative overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12 space-y-3 sm:space-y-4 animate-fadeInUp">
          {/* Title */}
          <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight max-w-3xl mx-auto">
            {t('features.title')}
          </h2>
        </div>

        {/* Features Grid - Mobile: 1 column, Tablet: 2 columns, Desktop: Custom 2-row layout */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {/* First Row - 2 cards (Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {featuresData.slice(0, 2).map((feature, index) => (
              <div
                key={feature.id}
                className={`relative group animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Feature Card */}
                <div className={`relative h-full p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1a2332]/80 to-[#0f1419]/80 border border-white/10 backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/30 hover:shadow-2xl hover:shadow-[#fc9e01]/10 hover:-translate-y-2 overflow-hidden`}>
                  
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Background Number - Left Bottom */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 [font-family:'Manrope',Helvetica] font-black text-4xl sm:text-5xl lg:text-6xl leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10">
                    {feature.id}
                  </div>

                  {/* Icon Container */}
                  <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-4 sm:mb-5 rounded-xl ${feature.iconBg} border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <img
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
                      alt={`${t(`features.${feature.key}.title`)} icon`}
                      src={feature.icon}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-2 sm:space-y-3">
                    {/* Title */}
                    <h3 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-base sm:text-lg tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#fc9e01]">
                      {t(`features.${feature.key}.title`)}
                    </h3>
                    
                    {/* Subtitle */}
                    <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white/90 text-sm sm:text-base leading-relaxed">
                      {t(`features.${feature.key}.subtitle`)}
                    </h4>
                    
                    {/* Description */}
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fc9e01]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 3 cards (Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {featuresData.slice(2, 5).map((feature, index) => (
              <div
                key={feature.id}
                className={`relative group animate-fadeInUp`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                {/* Feature Card */}
                <div className={`relative h-full p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1a2332]/80 to-[#0f1419]/80 border border-white/10 backdrop-blur-xl transition-all duration-500 ease-out hover:border-white/30 hover:shadow-2xl hover:shadow-[#fc9e01]/10 hover:-translate-y-2 overflow-hidden`}>
                
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Background Number - Left Bottom */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 [font-family:'Manrope',Helvetica] font-black text-4xl sm:text-5xl lg:text-6xl leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10">
                  {feature.id}
                </div>

                {/* Icon Container */}
                <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-4 sm:mb-5 rounded-xl ${feature.iconBg} border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <img
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 object-contain"
                    alt={`${t(`features.${feature.key}.title`)} icon`}
                    src={feature.icon}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-2 sm:space-y-3">
                  {/* Title */}
                  <h3 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-base sm:text-lg tracking-tight leading-tight transition-colors duration-300 group-hover:text-[#fc9e01]">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  
                  {/* Subtitle */}
                  <h4 className="[font-family:'Manrope',Helvetica] font-bold text-white/90 text-sm sm:text-base leading-relaxed">
                    {t(`features.${feature.key}.subtitle`)}
                  </h4>
                  
                  {/* Description */}
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-xs sm:text-sm leading-relaxed transition-colors duration-300 group-hover:text-white/85">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fc9e01]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
