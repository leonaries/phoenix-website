'use client';

import Script from 'next/script';

interface YandexMetrikaProps {
  counterId?: string;
}

/**
 * Yandex.Metrika 分析组件
 *
 * 功能:
 * - 页面浏览追踪
 * - 用户行为分析 (点击热图、webvisor)
 * - 电商数据追踪
 * - 链接追踪
 *
 * 使用方式:
 * <YandexMetrika counterId="105534931" />
 */
export default function YandexMetrika({ counterId = '105534931' }: YandexMetrikaProps) {
  // 仅在生产环境启用
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    console.log('[YandexMetrika] Disabled in development mode');
    return null;
  }

  return (
    <>
      {/* Yandex.Metrika 主脚本 */}
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

            ym(${counterId}, 'init', {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer"
            });
          `,
        }}
      />

      {/* Noscript 降级方案 */}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${counterId}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
