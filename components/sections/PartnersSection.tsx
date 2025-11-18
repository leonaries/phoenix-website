import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';

interface PartnersSectionProps {
  lang: string;
}

// Partners data with enhanced information
const partnersData = [
  { 
    id: "listadao", 
    name: "Listadao", 
    icon: "/img/mask-group-3.png", 
    category: "defi",
    description: "Decentralized listing protocol"
  },
  { 
    id: "uniswap", 
    name: "Uniswap", 
    icon: "/img/image-7.png", 
    category: "defi",
    description: "Leading DEX protocol",
    needsWhiteBg: true
  },
  { 
    id: "pancakeswap", 
    name: "PancakeSwap", 
    icon: "/img/mask-group.png", 
    category: "defi",
    description: "BSC's premier DEX"
  },
  { 
    id: "layerzero", 
    name: "LayerZero", 
    icon: "/img/mask-group-1.png", 
    category: "infrastructure",
    description: "Omnichain interoperability"
  },
  { 
    id: "base", 
    name: "Base", 
    icon: "/img/mask-group-5.png", 
    category: "blockchain",
    description: "Coinbase L2 solution"
  },
  { 
    id: "bnb", 
    name: "BNB Chain", 
    icon: "/img/mask-group-6.png", 
    category: "blockchain",
    description: "High-performance blockchain"
  },
  { 
    id: "chainlink", 
    name: "Chainlink", 
    icon: "/img/mask-group-2.png", 
    category: "infrastructure",
    description: "Decentralized oracle network"
  },
  { 
    id: "arbitrum", 
    name: "Arbitrum", 
    icon: "/img/mask-group-4.png", 
    category: "blockchain",
    description: "Ethereum L2 scaling"
  }
];

export default async function PartnersSection({ lang }: PartnersSectionProps) {
  const { t } = await initI18nServer(lang);
  
  return (
    <section id="partners" className="w-full relative overflow-hidden">
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="space-y-4 sm:space-y-6 animate-fadeInUp">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#fc9e01]/20 to-[#d03d0a]/20 border border-[#fc9e01]/30 backdrop-blur-sm">
                <span className="[font-family:'Manrope',Helvetica] font-semibold text-[#fc9e01] text-sm sm:text-base tracking-wide">
                  {t('partners.badge')}
                </span>
              </div>
              
              {/* Title */}
              <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl text-center tracking-tight leading-tight">
                {t('partners.title')}
              </h2>
              
              {/* Subtitle */}
              <p className="[font-family:'Manrope',Helvetica] font-light text-white/80 text-base sm:text-lg text-center leading-relaxed max-w-3xl mx-auto">
                {t('partners.subtitle')}
              </p>
            </div>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {partnersData.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative bg-gradient-to-br from-[#1a2332]/80 to-[#081122]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-[#fc9e01]/50 hover:bg-gradient-to-br hover:from-[#fc9e01]/5 hover:to-[#d03d0a]/5 transition-all duration-500 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Partner Logo */}
                <div className="flex justify-center mb-4">
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${partner.needsWhiteBg ? 'bg-white p-1' : ''}`}>
                    <img
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                      alt={partner.name}
                      src={partner.icon}
                    />
                  </div>
                </div>
                
                {/* Partner Info */}
                <div className="text-center space-y-2">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-sm sm:text-base tracking-tight">
                    {partner.name}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/60 text-xs sm:text-sm leading-relaxed">
                    {t(`partners.descriptions.${partner.id}`)}
                  </p>
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    partner.category === 'defi' ? 'bg-[#ffa700]/20 text-[#ffa700]' :
                    partner.category === 'blockchain' ? 'bg-[#00d4ff]/20 text-[#00d4ff]' :
                    'bg-[#d03d0a]/20 text-[#d03d0a]'
                  }`}>
                    {t(`partners.categories.${partner.category}`)}
                  </span>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#fc9e01]/0 via-[#fc9e01]/5 to-[#d03d0a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>


          
        </div>
      </div>
    </section>
  );
}
