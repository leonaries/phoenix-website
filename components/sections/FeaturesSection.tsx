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

        {/* Features Grid - New Layout */}
        <div className="hidden lg:block">
          <div className="flex gap-6 max-w-[1400px] mx-auto">
            {/* Left Column - Mint and Stake */}
            <div className="flex flex-col gap-6" style={{ width: '530px' }}>
              {/* Mint Card */}
              <div className={`relative group animate-fadeInUp`}>
                <div className="relative backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                     style={{
                       width: '530px',
                       height: '384px',
                       borderRadius: '24px',
                       background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                     }}>

                  {/* Gradient Border */}
                  <div className="absolute inset-0 p-[2px]"
                       style={{
                         borderRadius: '24px',
                         background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                       }}>
                    <div className="w-full h-full"
                         style={{
                           borderRadius: '22px',
                           background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                         }}>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[0].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                       style={{ borderRadius: '22px' }}></div>

                  {/* Background Number */}
                  <div className="absolute bottom-4 left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                       style={{ fontSize: '8rem' }}>
                    {featuresData[0].id}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pt-3 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-2">
                      <img
                        className="w-16 h-16 object-contain"
                        alt={`${t(`features.${featuresData[0].key}.title`)} icon`}
                        src={featuresData[0].icon}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl tracking-tight leading-tight">
                        {t(`features.${featuresData[0].key}.title`)}
                      </h3>
                      <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-xl leading-tight">
                        {t(`features.${featuresData[0].key}.subtitle`)}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-base leading-relaxed">
                        {t(`features.${featuresData[0].key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stake Card */}
              <div className={`relative group animate-fadeInUp`} style={{ animationDelay: '0.1s' }}>
                <div className="relative backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                     style={{
                       width: '530px',
                       height: '324px',
                       borderRadius: '24px',
                       background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                     }}>

                  {/* Gradient Border */}
                  <div className="absolute inset-0 p-[2px]"
                       style={{
                         borderRadius: '24px',
                         background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                       }}>
                    <div className="w-full h-full"
                         style={{
                           borderRadius: '22px',
                           background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                         }}>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[2].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                       style={{ borderRadius: '22px' }}></div>

                  {/* Background Number */}
                  <div className="absolute bottom-4 left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                       style={{ fontSize: '8rem' }}>
                    {featuresData[2].id}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pt-3 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-2">
                      <img
                        className="w-16 h-16 object-contain"
                        alt={`${t(`features.${featuresData[2].key}.title`)} icon`}
                        src={featuresData[2].icon}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-1.5">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl tracking-tight leading-tight">
                        {t(`features.${featuresData[2].key}.title`)}
                      </h3>
                      <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-xl leading-tight">
                        {t(`features.${featuresData[2].key}.subtitle`)}
                      </h4>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-base leading-relaxed pt-2">
                        {t(`features.${featuresData[2].key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Borrow, Quest, Community */}
            <div className="flex flex-col gap-6" style={{ width: '804px' }}>
              {/* Borrow Card (Top) */}
              <div className={`relative group animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
                <div className="relative backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                     style={{
                       width: '804px',
                       height: '299px',
                       borderRadius: '24px',
                       background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                     }}>

                  {/* Gradient Border */}
                  <div className="absolute inset-0 p-[2px]"
                       style={{
                         borderRadius: '24px',
                         background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                       }}>
                    <div className="w-full h-full"
                         style={{
                           borderRadius: '22px',
                           background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                         }}>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[1].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                       style={{ borderRadius: '22px' }}></div>

                  {/* Background Number */}
                  <div className="absolute bottom-4 left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                       style={{ fontSize: '8rem' }}>
                    {featuresData[1].id}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 pt-3 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-2">
                      <img
                        className="w-16 h-16 object-contain"
                        alt={`${t(`features.${featuresData[1].key}.title`)} icon`}
                        src={featuresData[1].icon}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-4">
                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-4xl tracking-tight leading-tight">
                          {t(`features.${featuresData[1].key}.title`)}
                        </h3>
                        <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-xl leading-tight">
                          {t(`features.${featuresData[1].key}.subtitle`)}
                        </h4>
                      </div>
                      <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-base leading-relaxed max-w-2xl">
                        {t(`features.${featuresData[1].key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row - Quest and Community */}
              <div className="flex gap-6">
                {/* Quest Card */}
                <div className={`relative group animate-fadeInUp`} style={{ animationDelay: '0.3s' }}>
                  <div className="relative backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                       style={{
                         width: '327px',
                         height: '408px',
                         borderRadius: '24px',
                         background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                       }}>

                    {/* Gradient Border */}
                    <div className="absolute inset-0 p-[2px]"
                         style={{
                           borderRadius: '24px',
                           background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                         }}>
                      <div className="w-full h-full"
                           style={{
                             borderRadius: '22px',
                             background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                           }}>
                      </div>
                    </div>

                    {/* Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[3].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                         style={{ borderRadius: '22px' }}></div>

                    {/* Background Number */}
                    <div className="absolute bottom-4 left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                         style={{ fontSize: '8rem' }}>
                      {featuresData[3].id}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 pt-3 h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-2">
                        <img
                          className="w-16 h-16 object-contain"
                          alt={`${t(`features.${featuresData[3].key}.title`)} icon`}
                          src={featuresData[3].icon}
                        />
                      </div>

                      {/* Text Content */}
                      <div className="space-y-4 flex-1">
                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl tracking-tight leading-tight">
                          {t(`features.${featuresData[3].key}.title`)}
                        </h3>
                        <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-lg leading-tight">
                          {t(`features.${featuresData[3].key}.subtitle`)}
                        </h4>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-sm leading-relaxed">
                          {t(`features.${featuresData[3].key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Card */}
                <div className={`relative group animate-fadeInUp`} style={{ animationDelay: '0.4s' }}>
                  <div className="relative backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                       style={{
                         width: '451px',
                         height: '408px',
                         borderRadius: '24px',
                         background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                       }}>

                    {/* Gradient Border */}
                    <div className="absolute inset-0 p-[2px]"
                         style={{
                           borderRadius: '24px',
                           background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                         }}>
                      <div className="w-full h-full"
                           style={{
                             borderRadius: '22px',
                             background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                           }}>
                      </div>
                    </div>

                    {/* Background Pattern */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${featuresData[4].gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                         style={{ borderRadius: '22px' }}></div>

                    {/* Background Number */}
                    <div className="absolute bottom-4 left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                         style={{ fontSize: '8rem' }}>
                      {featuresData[4].id}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 pt-3 h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-2">
                        <img
                          className="w-16 h-16 object-contain"
                          alt={`${t(`features.${featuresData[4].key}.title`)} icon`}
                          src={featuresData[4].icon}
                        />
                      </div>

                      {/* Text Content */}
                      <div className="space-y-4 flex-1">
                        <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-3xl tracking-tight leading-tight">
                          {t(`features.${featuresData[4].key}.title`)}
                        </h3>
                        <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-lg leading-tight">
                          {t(`features.${featuresData[4].key}.subtitle`)}
                        </h4>
                        <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-sm leading-relaxed">
                          {t(`features.${featuresData[4].key}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Keep original grid layout */}
        <div className="block lg:hidden">
          <div className="space-y-4 sm:space-y-5">
            {featuresData.map((feature, index) => (
              <div
                key={feature.id}
                className={`relative group animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Feature Card */}
                <div className="relative h-full p-6 sm:p-8 rounded-3xl backdrop-blur-sm transition-all duration-300 ease-out overflow-hidden"
                     style={{
                       background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                     }}>

                  {/* Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl p-[2px]"
                       style={{
                         background: 'linear-gradient(120.31deg, rgba(255, 255, 255, 0.2) 0%, #131D30 100%)'
                       }}>
                    <div className="w-full h-full rounded-3xl"
                         style={{
                           background: 'linear-gradient(120.31deg, #1B2436 0.19%, #081122 99.81%)'
                         }}>
                    </div>
                  </div>

                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                  {/* Background Number */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 [font-family:'Manrope',Helvetica] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10"
                       style={{ fontSize: '6rem' }}>
                    {feature.id}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 mb-4 sm:mb-8">
                    <img
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      alt={`${t(`features.${feature.key}.title`)} icon`}
                      src={feature.icon}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-2xl sm:text-3xl tracking-tight leading-tight">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <h4 className="[font-family:'Manrope',Helvetica] font-semibold text-white/90 text-base sm:text-lg leading-tight">
                        {t(`features.${feature.key}.subtitle`)}
                      </h4>
                    </div>

                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-sm sm:text-base leading-relaxed">
                      {t(`features.${feature.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
