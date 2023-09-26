import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from '@/providers/createStore-modal-provider';

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'e-commerce--admin site',
  description: 'admin dashboard for e-commerce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <ModalProvider/>
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
