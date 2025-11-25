import React from 'react';
import { initI18nServer } from '@/lib/i18nserver';

interface GovernanceSectionProps {
  lang: string;
}

export default async function GovernanceSection({ lang }: GovernanceSectionProps) {
  const { t } = await initI18nServer(lang);

  return (
    <section id="governance" className="w-full relative overflow-hidden">

      {/* Content Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-10">
            <h2 className="[font-family:'Manrope',Helvetica] font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight animate-fadeInUp">
              {t('governance.title')}
            </h2>
          </div>

          {/* Governance Flow Chart - Desktop */}
          <div className="hidden lg:block relative max-w-6xl mx-auto">
            <div className="relative h-[400px]">

              {/* Root Node - Governance */}
              <div className="absolute top-0 left-[42%] transform -translate-x-1/2 animate-fadeInUp">
                <div
                  className="backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(90deg, #081327 0%, #1D448D 100%)',
                    borderRadius: '8px',
                    width: '206px'
                  }}
                >
                  <div className="px-8 py-4">
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-lg tracking-tight text-center" style={{ color: '#FC9E01' }}>
                      {t('governance.features.dao.rootNode', 'Governance')}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Connection Lines - 使用div和渐变边框 */}
              <div className="absolute top-12 left-0 w-full h-full">
                {/* 垂直线：从 Governance 向下 */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '15px',
                    width: '2px',
                    height: '70px',
                    background: 'linear-gradient(180deg, #38404D 0%, #38404D 100%)'
                  }}
                />

                {/* 水平圆角长方形 - 中间横线（使用伪元素实现渐变边框，底部渐变到透明） */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2"
                  style={{
                    top: '70px',
                    width: '1007px',
                    height: '184px',
                    borderRadius: '24px',
                    background: `
                      linear-gradient(#071222, #071222) padding-box,
                      linear-gradient(180deg, #38404D 0%, rgba(130, 149, 179, 0) 100%) border-box
                    `,
                    border: '2px solid transparent'
                  }}
                />


              </div>

              {/* Feature Nodes */}
              <div className="absolute bottom-0 left-0 w-full flex justify-between items-end">
                {/* DAO */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.2s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.dao.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.dao.description')}
                    </p>
                  </div>
                </div>

                {/* $FIRE */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.4s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.fire.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.fire.description')}
                    </p>
                  </div>
                </div>

                {/* Badge + point */}
                <div className="animate-fadeInUp" style={{animationDelay: '0.6s', width: '420px', height: '219px'}}>
                  <div
                    className="backdrop-blur-sm p-6 h-full"
                    style={{
                      background: `
                        linear-gradient(90deg, #081122 0%, #1C283F 100%) padding-box,
                        linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(153, 153, 153, 0) 100%) border-box
                      `,
                      border: '2px solid transparent',
                      borderRadius: '28px'
                    }}
                  >
                    <h3 className="[font-family:'Manrope',Helvetica] font-bold text-4xl mb-3 tracking-tight" style={{
                      background: 'linear-gradient(90deg, #FFFFFF 0%, #FF8000 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {t('governance.features.badge.title')}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-lg leading-tight">
                      {t('governance.features.badge.description')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Layout - Simple Vertical Stack */}
          <div className="lg:hidden space-y-8">

            {/* Root Node - Governance */}
            <div className="text-center animate-fadeInUp">
              <div
                className="inline-block backdrop-blur-sm border border-white/20"
                style={{
                  background: 'linear-gradient(180deg, #081327 0%, #1D448D 100%)',
                  borderRadius: '8px'
                }}
              >
                <div className="px-8 py-4">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-lg tracking-tight" style={{ color: '#FC9E01' }}>
                    {t('governance.features.dao.rootNode', 'Governance')}
                  </h3>
                </div>
              </div>
            </div>

            {/* Feature Cards - Stacked */}
            <div className="space-y-6">
              <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.dao.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.dao.description')}
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.fire.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.fire.description')}
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                  <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-lg mb-3 tracking-tight">
                    {t('governance.features.badge.title')}
                  </h3>
                  <p className="[font-family:'Manrope',Helvetica] font-normal text-white/80 text-sm leading-relaxed">
                    {t('governance.features.badge.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Community Earth Section */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">

          {/* Section Title */}
          <div className="text-center">
            <h2 className="[font-family:'Manrope',Helvetica] font-normal text-white text-xl sm:text-2xl lg:text-4xl tracking-tight leading-relaxed max-w-2xl mx-auto">
              {t('governance.community.title', 'Phoenix puts community at its core, empowering members to engage through:')}
            </h2>
          </div>

          {/* Earth Community Visualization - Desktop */}
          <div className="hidden lg:block relative w-full max-w-7xl mx-auto overflow-hidden mt-20" style={{ height: '800px' }}>

            {/* 中心容器 - 有实际尺寸,包含所有元素 */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[30%]">

              {/* 1. Earth 地球 - 最底层 z-10 */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[40%] z-10">
                <img
                  src="/img/earth.png"
                  alt="Earth"
                  width={1200}
                  height={1200}
                  className="rounded-full"
                  style={{ width: '1200px', height: '1200px', maxWidth: 'none' }}
                />
              </div>

              {/* 2. Earth Ring 红光 - 盖在地球上 z-20 */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[55%] z-50">
                <img
                  src="/img/earth-ring.png"
                  alt="Phoenix Ring"
                  width={1280}
                  height={1280}
                  className="animate-pulse"
                  style={{ width: '1400px', height: '500px', maxWidth: 'none', animationDuration: '3s' }}
                />
              </div>

              {/* 3. Circle Group 弧线和圆点 - 在上方 z-30 */}
              <div className="absolute left-1/2 top-0 transform -translate-x-[53%] -translate-y-[65%] z-30">
                <img
                  src="/img/circle_group.png"
                  alt="Circle Group"
                  width={1600}
                  height={400}
                  style={{ width: '1600px', height: '400px', maxWidth: 'none' }}
                />
              </div>

              {/* 4. Vector Logo 凤凰标志 - 最顶层 z-40 */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-[160%] z-40">
                <img
                  src="/img/vector.svg"
                  alt="Phoenix Logo"
                  width={240}
                  height={240}
                  style={{ width: '240px', height: '240px', maxWidth: 'none' ,backgroundColor:'#071222' }}
                />
              </div>

            </div>

            {/* Text Labels - positioned near white dots */}

            {/* Top Left - Proposals & Voting */}
            <div className="absolute left-[20%] top-[8%] z-20">
              <div className="text-center max-w-[250px]">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-2 leading-tight">
                  {t('governance.community.proposals.title', 'Proposals & Voting')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-sm leading-relaxed">
                  {t('governance.community.proposals.description', 'Submit and vote to shape the ecosystem')}
                </p>
              </div>
            </div>

            {/* Top Right - Incentives & Recognition */}
            <div className="absolute right-[20%] top-[8%] z-20">
              <div className="text-center max-w-[250px]">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-2 leading-tight">
                  {t('governance.community.incentives.title', 'Incentives & Recognition')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-sm leading-relaxed">
                  {t('governance.community.incentives.description', 'Badges, leaderboards, and rewards for contributors')}
                </p>
              </div>
            </div>

            {/* Bottom Left - Quests & Points */}
            <div className="absolute left-[0%] top-[23%] z-20">
              <div className="text-center max-w-[250px]">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-2 leading-tight">
                  {t('governance.community.quests.title', 'Quests & Points')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-sm leading-relaxed">
                  {t('governance.community.quests.description', 'Earn points from activities, redeemable for Phoenix tokens')}
                </p>
              </div>
            </div>

            {/* Bottom Right - Co-Building & Growth */}
            <div className="absolute right-[0%] top-[23%] z-20">
              <div className="text-center max-w-[250px]">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-2 leading-tight">
                  {t('governance.community.cobuilding.title', 'Co-Building & Growth')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-sm leading-relaxed">
                  {t('governance.community.cobuilding.description', 'Events and partnerships expand Phoenix globally')}
                </p>
              </div>
            </div>

          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-12">
            {/* Central Earth with Phoenix Logo */}
            <div className="flex justify-center relative">
              {/* Phoenix Logo Above Earth */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-16 z-20">
                <img
                  src="/img/vector.svg"
                  alt="Phoenix Logo"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div>

              <div className="relative w-[280px] h-[280px]">
                <img
                  src="/img/earth-ring.png"
                  alt="Phoenix Ring"
                  width={280}
                  height={280}
                  className="absolute inset-0 animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]">
                  <img
                    src="/img/earth.png"
                    alt="Earth"
                    width={200}
                    height={200}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-3">
                  {t('governance.community.proposals.title', 'Proposals & Voting')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-base">
                  {t('governance.community.proposals.description', 'Submit and vote to shape the ecosystem')}
                </p>
              </div>

              <div className="text-center">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-3">
                  {t('governance.community.incentives.title', 'Incentives & Recognition')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-base">
                  {t('governance.community.incentives.description', 'Badges, leaderboards, and rewards for contributors')}
                </p>
              </div>

              <div className="text-center">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-3">
                  {t('governance.community.quests.title', 'Quests & Points')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-base">
                  {t('governance.community.quests.description', 'Earn points from activities, redeemable for Phoenix tokens')}
                </p>
              </div>

              <div className="text-center">
                <h3 className="[font-family:'Manrope',Helvetica] font-bold text-white text-xl mb-3">
                  {t('governance.community.cobuilding.title', 'Co-Building & Growth')}
                </h3>
                <p className="[font-family:'Manrope',Helvetica] font-normal text-white/70 text-base">
                  {t('governance.community.cobuilding.description', 'Events and partnerships expand Phoenix globally')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
