'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerContainer, slideInRight } from '@/lib/animations'

const badges = [
  { src: '/images/badge-moe.png', alt: 'MOE Curriculum Supported' },
  { src: '/images/badge-personalized.png', alt: 'Personalized Learning Certified' },
  { src: '/images/badge-finland.png', alt: 'Education Alliance Finland Certified' },
]

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
                <Image key={b.alt} src={b.src} alt={b.alt} width={128} height={126} className="w-16 h-auto sm:w-20" />
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
              width={1024}
              height={802}
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
            className="relative rounded-2xl py-8 pr-8 lg:py-10 lg:pr-12"
            style={{
              backgroundColor: '#cbffcc',
              border: '1.5px solid #86efac',
              paddingLeft: '3.5rem',
            }}
          >
            {/* Bookmark ribbon — absolute at top-left, matching reference */}
            <div className="absolute top-0 left-6">
              <svg width="22" height="68" viewBox="0 0 22 68" fill="none" aria-hidden="true">
                <path d="M0 0 H22 V68 L11 56 L0 68 Z" fill="#22c55e" />
              </svg>
            </div>
            <p className="text-base sm:text-lg lg:text-xl font-semibold text-text-primary leading-relaxed">
              Pandai is Malaysia&apos;s online learning platform for students aged 7–17. It combines live tuition, quiz battles, quick notes, topical tests and exams, student leaderboards, detailed report cards, and academic-competition practice to help students learn effectively, track progress, and improve grades — all from home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
