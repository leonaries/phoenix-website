import React, { Suspense } from "react";
import { initI18nServer } from '@/lib/i18nserver';
import ServerHeroSection from '@/components/sections/ServerHeroSection';
import VisionSection from '@/components/sections/VisionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import GovernanceSection from '@/components/sections/GovernanceSection';
import PartnersSection from '@/components/sections/PartnersSection';
import CTASection from '@/components/sections/CTASection';
import { Header, Footer } from "@/components";

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  
  // 初始化 i18n 实例
  const i18n = await initI18nServer(lang);
  
  return (
    <div
      className="phoenix-bg w-full min-h-screen relative"
      style={{ backgroundColor: '#081122' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 现有背景装饰元素 */}
        <img
          className="absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1463px] h-[1463px] opacity-20"
          alt="Ellipse"
          src="/img/ellipse-7.svg"
        />
        <img
          className="absolute top-[2800px] left-0 w-full h-[892px] object-cover opacity-30"
          alt="Background"
          src="/img/bg3-1.png"
        />
        <img
          className="absolute top-[2700px] left-0 w-full h-[892px] object-cover opacity-30"
          alt="Background"
          src="/img/bg3-2.png"
        />
      </div>

      {/* Main content flow */}
      <div className="relative z-10">
        <Suspense fallback={<div className="h-20 bg-gray-800 animate-pulse" />}>
          <Header lang={lang} />
        </Suspense>
        
        <main className="w-full max-w-[1920px] mx-auto pt-16 lg:pt-20">
          <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black animate-pulse" />}>
            <ServerHeroSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <VisionSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <FeaturesSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <RoadmapSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <GovernanceSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <PartnersSection lang={lang} />
          </Suspense>
          <Suspense fallback={<div className="py-20 bg-gray-900 animate-pulse" />}>
            <CTASection lang={lang} />
          </Suspense>
        </main>
        
        <Suspense fallback={<div className="h-32 bg-gray-800 animate-pulse" />}>
          <Footer lang={lang} />
        </Suspense>
      </div>
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'zh' },
    { lang: 'ja' },
    { lang: 'ko' },
  ];
}
