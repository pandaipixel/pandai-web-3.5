'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations'

const steps = [
  {
    number: '01',
    icon: '📲',
    title: 'Download Pandai',
    description: 'Get the app from the App Store or Google Play — free to download, free to start.',
  },
  {
    number: '02',
    icon: '🎓',
    title: 'Pick your subjects',
    description: 'Select your year and subjects. Pandai aligns to the Malaysian curriculum automatically.',
  },
  {
    number: '03',
    icon: '🎯',
    title: 'Practice daily',
    description: 'Complete daily quizzes, join live classes, and track your mastery per topic.',
  },
  {
    number: '04',
    icon: '🏆',
    title: 'Score better',
    description: 'Watch your grades improve. Students who use Pandai daily see a 40% avg. grade lift.',
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-text-brand text-sm font-semibold mb-4">
            Simple to start
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            How Pandai works
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary max-w-2xl mx-auto">
            From download to better grades in four easy steps.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={i % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative flex flex-col"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-[calc(100%_-_1rem)] w-8 h-px bg-border-strong" />
              )}
              <div className="w-12 h-12 rounded-2xl bg-white border-2 border-border-default flex items-center justify-center text-2xl mb-4 shadow-sm">
                {step.icon}
              </div>
              <div className="text-xs font-bold text-text-tertiary tracking-widest mb-2">{step.number}</div>
              <h3 className="text-base font-semibold text-text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <Link
            href="https://app.pandai.org/app/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold text-base transition-all duration-200 shadow-brand"
          >
            Get Started Free
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
