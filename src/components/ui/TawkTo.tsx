'use client'

import { useEffect } from 'react'

export default function TawkTo() {
  useEffect(() => {
    // Prevent double-loading on hot reload
    if (document.querySelector('script[src*="tawk.to"]')) return

    const s1 = document.createElement('script')
    const s0 = document.getElementsByTagName('script')[0]
    s1.async = true
    s1.src = 'https://embed.tawk.to/5d8c1e756c1dde20ed037f6c/default'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')
    s0.parentNode?.insertBefore(s1, s0)
  }, [])

  return null
}
