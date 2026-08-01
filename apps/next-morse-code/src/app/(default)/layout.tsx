import { LayoutClient } from './layout-client'
import { NAVIGATIONS } from '@/constants'
import { NavItem } from '@/types'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const navItems = NAVIGATIONS as unknown as NavItem[]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning={true}>
        <LayoutClient navItems={navItems}>{children}</LayoutClient>
      </body>
    </html>
  )
}
