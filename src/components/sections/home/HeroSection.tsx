'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerContainer, slideInRight } from '@/lib/animations'

const badges = [
  {
    label: 'MOE Curriculum',
    sub: 'Supported',
    color: '#e8a020',
  },
  {
    label: 'Personalized Learning',
    sub: 'Certified',
    color: '#e8a020',
  },
  {
    label: 'Education Alliance Finland',
    sub: 'Certified',
    color: '#e8a020',
  },
]

function CertBadge({ label, sub, color }: { label: string; sub: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center relative"
        style={{ border: `3px solid ${color}` }}
      >
        {/* Laurel wreath simulation */}
        <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" fill="none">
          <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
        </svg>
        <span className="text-xs font-bold text-center leading-tight px-1" style={{ color, fontSize: '0.45rem' }}>
          {label}
        </span>
      </div>
      <span className="text-xs font-semibold text-text-secondary text-center leading-tight">{sub}</span>
    </div>
  )
}

export default function HeroSection() {
  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 lg:pt-32 lg:pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Headline + badges */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              style={{ color: '#00cc85' }}
            >
              Malaysia&apos;s<br />
              #1 Online<br />
              Learning App
            </motion.h1>

            {/* Certification badges */}
            <motion.div variants={fadeInUp} className="flex items-start gap-4 sm:gap-6">
              {badges.map((b) => (
                <CertBadge key={b.label} {...b} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Hero illustration */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <Image
              src="/images/hero-student.png"
              alt="Pandai student learning"
              width={800}
              height={800}
              className="w-full max-w-sm lg:max-w-lg h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Tagline card */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden px-8 py-8 lg:px-12 lg:py-10"
            style={{ backgroundColor: '#cbffcc' }}
          >
            {/* Green left bookmark */}
            <div
              className="absolute left-0 top-4 bottom-4 w-1.5 rounded-r-full"
              style={{ backgroundColor: '#00cc85' }}
            />
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary leading-relaxed pl-4">
              Pandai is Malaysia&apos;s online learning platform for students aged 7–17. It combines live tuition, quiz battles, quick notes, topical tests and exams, student leaderboards, detailed report cards, and academic-competition practice to help students learn effectively, track progress, and improve grades — all from home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
