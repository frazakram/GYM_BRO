'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-white text-2xl">Redirecting...</div>
    </div>
  )
}
