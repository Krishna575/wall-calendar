import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wall Calendar',
  description: 'A beautiful interactive wall calendar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  )
}