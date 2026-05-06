'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { hero } from '@/content/home'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-[30px]">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-4 items-center">

          {/* ── LEFT: Headline + Trust badges ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left w-full"
          >
            {/* Headline — font sizes: mobile 41px / tablet 50px / desktop 60px */}
            {/* Edit lines: content/home.ts → hero.headlineLines */}
            <motion.h1
              variants={fadeInUp}
              className="font-extrabold leading-[1.05] tracking-tight text-[41px] md:text-[50px] lg:text-[60px]"
              style={{ color: '#00cc85' }}
            >
              {hero.headlineLines.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>

            {/* Trust badges — swap images: content/home.ts → hero.trustBadges */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center lg:justify-start gap-3 mt-8 flex-wrap"
            >
              {hero.trustBadges.map((badge) => (
                <Image
                  key={badge.alt}
                  src={badge.src}
                  alt={badge.alt}
                  width={80}
                  height={80}
                  className="object-contain w-[70px] md:w-[80px] lg:w-[90px] h-auto"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Student visual ── */}
          {/* Swap image: content/home.ts → hero.visual.student */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center w-full"
          >
            <Image
              src={hero.visual.student}
              alt="Pandai student"
              width={600}
              height={469}
              className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-full object-contain"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
