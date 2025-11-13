import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phoenix - The On-Chain Bank Rising from the Ashes',
  description: 'From Stability to Infinity, Phoenix Turns Assets into Yield',
  icons: {
    icon: [
      { url: '/img/logo_footer.png', sizes: 'any' },
      { url: '/img/logo_footer.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/logo_footer.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/img/logo_footer.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/img/logo_footer.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Phoenix - The On-Chain Bank Rising from the Ashes',
    description: 'From Stability to Infinity, Phoenix Turns Assets into Yield',
    url: 'https://phnx.finance',
    siteName: 'Phoenix Finance',
    images: [
      {
        url: '/img/logo_footer.png',
        width: 1200,
        height: 630,
        alt: 'Phoenix Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix - The On-Chain Bank Rising from the Ashes',
    description: 'From Stability to Infinity, Phoenix Turns Assets into Yield',
    images: ['/img/logo_footer.png'],
    creator: '@Phnx_fi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 根 layout 不能返回 html/body，让子 layout 处理
  return <>{children}</>
}
