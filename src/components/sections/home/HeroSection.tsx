'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-surface-primary via-surface-secondary to-surface-primary">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-text-brand text-sm font-semibold mb-6">
                🏆 Malaysia&apos;s #1 Learning App
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
            >
              Score{' '}
              <span className="text-brand-green">better grades</span>{' '}
              with Pandai
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              Game-like quizzes, live tuition, flashcards, and AI-powered study tools — everything your child needs to excel in school.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://app.pandai.org/app/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base transition-all duration-200 shadow-brand hover:shadow-xl"
              >
                Start Learning Free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-border-strong hover:border-brand-green text-text-primary hover:text-brand-green font-semibold text-base transition-all duration-200"
              >
                See How It Works
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <div
                    key={letter}
                    className="w-9 h-9 rounded-full bg-brand-green/20 border-2 border-white flex items-center justify-center text-xs font-bold text-text-brand"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-text-secondary">
                <span className="font-bold text-text-primary">1,000,000+</span>{' '}
                students already learning
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Hero Visual */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center"
          >
            {/* PLACEHOLDER — Replace with actual hero image/mockup */}
            <div className="w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-text-secondary font-medium">Hero Visual</p>
                <p className="text-xs text-text-tertiary mt-1">Replace with app mockup</p>
              </div>
            </div>

            {/* Floating badge — App Store rating */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-yellow/20 flex items-center justify-center text-lg">⭐</div>
              <div>
                <p className="text-xs font-bold text-text-primary">4.8 Rating</p>
                <p className="text-xs text-text-tertiary">App Store</p>
              </div>
            </motion.div>

            {/* Floating badge — grade lift */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center text-lg">🎯</div>
              <div>
                <p className="text-xs font-bold text-text-primary">Score Improved</p>
                <p className="text-xs text-text-tertiary">+40% avg. grade lift</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
