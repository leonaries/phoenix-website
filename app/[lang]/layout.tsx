import { ReactNode } from 'react'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import { YandexMetrika } from '@/components/Analytics'

type Props = {
  children: ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params

  // RTL languages
  const rtlLanguages = ['ar']
  const isRTL = rtlLanguages.includes(lang)
  const dir = isRTL ? 'rtl' : 'ltr'

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body className="phoenix-bg" suppressHydrationWarning>
        {/* Yandex.Metrika analytics */}
        <YandexMetrika counterId="105534931" />

        {/* Service Worker registration (production only) */}
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
