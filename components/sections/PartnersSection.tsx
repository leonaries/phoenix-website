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
          
       
          {/* Partners Grid - Two Rows, Four Columns */}
          <div className="grid grid-cols-4 gap-5 mb-12 sm:mb-16 max-w-5xl mx-auto">
            {partnersData.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative bg-gradient-to-br from-[#152138] to-[#081122] border-2 border-[#223049] rounded-[100px] p-5 hover:border-[#fc9e01]/50 transition-all duration-500 animate-fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Partner Content - Horizontal Layout */}
                <div className="flex items-center gap-4">
                  {/* Partner Logo */}
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${partner.needsWhiteBg ? 'bg-white p-1' : ''}`}>
                    <img
                      className="w-8 h-8 object-contain"
                      alt={partner.name}
                      src={partner.icon}
                    />
                  </div>

                  {/* Partner Name */}
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-base tracking-tight whitespace-nowrap">
                    {partner.name}
                  </h3>
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
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#fc9e01]/0 via-[#fc9e01]/5 to-[#d03d0a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>


          
        </div>
      </div>
    </section>
  );
}
