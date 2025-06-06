import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lyvora-Marco APP',
  description: 'Created with Lisa',
  generator: '~Lisa-dev~',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
