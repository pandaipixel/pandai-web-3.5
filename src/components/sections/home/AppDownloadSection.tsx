'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { fadeInUp, slideInRight, staggerContainer } from '@/lib/animations'

const platforms = [
  {
    href: 'https://play.google.com/store/apps/details?id=org.pandai.app',
    icon: '▶',
    pretext: 'Get Pandai On',
    name: 'Google Play',
    rating: '4.7★',
  },
  {
    href: 'https://apps.apple.com/my/app/pandai-online-learning/id1493305978',
    icon: '',
    pretext: 'Download on the',
    name: 'App Store',
    rating: '4.7★',
  },
  {
    href: 'https://appgallery.huawei.com/#/app/C102218259',
    icon: '◈',
    pretext: 'Explore Now',
    name: 'App Gallery',
    rating: '4.8★',
  },
  {
    href: 'https://app.pandai.org',
    icon: '🌐',
    pretext: 'Sign In Now On',
    name: 'Web pandai.org',
    rating: null,
  },
]

export default function AppDownloadSection() {
  return (
    <section className="py-20 lg:py-28 bg-brand-indigo overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'url(/images/bg-pattern.svg)', backgroundRepeat: 'repeat', backgroundSize: '427px 427px' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-inverse mb-4">
              Download App Now!<br />Available on All Platforms
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/75 leading-relaxed mb-10">
              Get instant access to thousands of questions, live classes, and your personalised study plan — free to start.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3">
              {platforms.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-150"
                >
                  <span className="text-2xl shrink-0">{p.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-white/60 leading-none mb-0.5">{p.pretext}</p>
                    <p className="text-sm font-semibold text-text-inverse truncate">{p.name}</p>
                    {p.rating && <p className="text-xs text-brand-yellow">{p.rating}</p>}
                  </div>
                </Link>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Mockup */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex justify-center lg:justify-end"
          >
            <Image
              src="/images/app-mockup.png"
              alt="Pandai app"
              width={747}
              height={1024}
              className="w-full max-w-xs h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
