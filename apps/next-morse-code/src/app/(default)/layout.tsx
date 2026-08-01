// src/app/layout.tsx
import { LayoutClient } from './layout-client'
import { ThemeProvider } from 'next-themes'
import { NAVIGATIONS } from '@/constants'
import { NavItem } from '@/types'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/app/globals.css' // Loads Inter, tailwind, and your UI styles

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
    /* Keep your data-theme target exactly intact for @repo/ui-react/style.css */
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <LayoutClient 
        navItems={navItems} 
        fontClasses={`${geistSans.variable} ${geistMono.variable}`}
      >
        {children}
      </LayoutClient>
    </ThemeProvider>
  )
}
