import { ReactNode } from 'react'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

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
        {/* Service Worker 注册（仅生产环境） */}
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  )
}
