import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GymBro AI - AI-Powered Gym Routine Generator',
  description: 'Generate personalized weekly workout plans with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900">
        {children}
      </body>
    </html>
  )
}
