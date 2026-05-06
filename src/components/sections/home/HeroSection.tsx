'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fadeInUp, staggerContainer, slideInRight } from '@/lib/animations'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-brand-indigo">
      {/* Grid background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero-illustration.svg"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-inverse leading-tight mb-6"
            >
              This is how you get better grades
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/80 leading-relaxed mb-10 max-w-lg"
            >
              Pandai is an online learning app that helps students improve their grades through engaging quizzes, tests, exams, notes, videos, and much more.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://app.pandai.org/app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/60 hover:border-white text-text-inverse font-semibold text-base transition-all duration-200 hover:bg-white/10"
              >
                Sign In
              </Link>
              <Link
                href="https://app.pandai.org/app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base transition-all duration-200 shadow-brand"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: App Mockup */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm lg:max-w-md">
              <Image
                src="/images/app-mockup.png"
                alt="Pandai app on mobile"
                width={747}
                height={1024}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
