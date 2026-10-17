import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PRYSM',
  description: 'PRYSM — Mirror Try demo store',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
