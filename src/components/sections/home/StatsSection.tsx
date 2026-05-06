'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

type Stat = {
  target: number
  decimal?: boolean
  label: string
  sub: string
  suffix?: string
}

const stats: Stat[] = [
  {
    target: 878501,
    label: 'Malaysian Students',
    sub: 'actively learning on Pandai',
  },
  {
    target: 322682777,
    label: 'Questions Completed',
    sub: 'since January 2020',
  },
  {
    target: 4.7,
    decimal: true,
    suffix: '★',
    label: 'Play Store Rating',
    sub: 'by students & parents',
  },
  {
    target: 4.8,
    decimal: true,
    suffix: '★',
    label: 'TrustPilot Score',
    sub: 'trusted by families',
  },
]

function formatInteger(n: number): string {
  return Math.round(n).toLocaleString('en-MY')
}

function CountUp({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * stat.target)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, stat.target])

  const display = stat.decimal
    ? count.toFixed(1)
    : formatInteger(count)

  return (
    <span ref={ref}>
      {display}
      {stat.suffix && <span className="text-brand-green ml-0.5">{stat.suffix}</span>}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface-secondary border-y border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center text-sm text-text-tertiary mb-10"
        >
          Pandai helped <strong className="text-text-primary">878,501</strong> Malaysian students practise and complete{' '}
          <strong className="text-text-primary">322,682,777</strong> questions since January 2020
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-1 tabular-nums">
                <CountUp stat={stat} />
              </div>
              <div className="text-sm font-semibold text-text-primary mb-1">{stat.label}</div>
              <div className="text-xs text-text-tertiary">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
