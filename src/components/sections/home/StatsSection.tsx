'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const stats = [
  { value: 1000000, suffix: '+', label: 'Students', description: 'Across Malaysia' },
  { value: 50, suffix: '+', label: 'Subjects', description: 'KSSR & KSSM aligned' },
  { value: 500000, suffix: '+', label: 'Questions', description: 'In our question bank' },
  { value: 98, suffix: '%', label: 'Satisfaction', description: 'From parents & students' },
]

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(0) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}

function CountUp({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref}>{formatNumber(count)}</span>
}

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface-secondary border-y border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold text-text-primary mb-1">
                <CountUp target={stat.value} />
                <span className="text-brand-green">{stat.suffix}</span>
              </div>
              <div className="text-base font-semibold text-text-primary mb-1">{stat.label}</div>
              <div className="text-sm text-text-tertiary">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
