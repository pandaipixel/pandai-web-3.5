'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations'

export default function AppDownloadSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-inverse overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/20 text-brand-green-light text-sm font-semibold mb-6">
              Free to download
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-inverse mb-4">
              Start learning<br />on any device
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-text-tertiary leading-relaxed mb-8">
              Download the Pandai app and get instant access to thousands of questions, live classes, and your personalised study plan.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              {/* App Store */}
              <Link
                href="https://apps.apple.com/my/app/pandai-online-learning/id1493305978"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-text-primary hover:bg-surface-secondary transition-colors duration-150"
              >
                <span className="text-3xl">🍎</span>
                <div>
                  <p className="text-xs text-text-secondary">Download on the</p>
                  <p className="text-base font-bold">App Store</p>
                </div>
              </Link>

              {/* Google Play */}
              <Link
                href="https://play.google.com/store/apps/details?id=org.pandai.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-text-primary hover:bg-surface-secondary transition-colors duration-150"
              >
                <span className="text-3xl">▶️</span>
                <div>
                  <p className="text-xs text-text-secondary">Get it on</p>
                  <p className="text-base font-bold">Google Play</p>
                </div>
              </Link>
            </motion.div>

            {/* Store ratings */}
            <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-inverse">4.8</p>
                <p className="text-xs text-text-tertiary">App Store</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-text-inverse">4.7</p>
                <p className="text-xs text-text-tertiary">Google Play</p>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-text-inverse">1M+</p>
                <p className="text-xs text-text-tertiary">Downloads</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: App mockup placeholder */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex justify-center"
          >
            {/* PLACEHOLDER — Replace with actual app screenshot mockup */}
            <div className="w-64 h-[480px] rounded-[2.5rem] bg-gradient-to-b from-brand-green/30 to-brand-blue/30 border-4 border-white/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-3">📱</div>
                <p className="text-text-tertiary text-sm font-medium">App Mockup</p>
                <p className="text-xs text-text-tertiary/70 mt-1">Replace with screenshot</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
