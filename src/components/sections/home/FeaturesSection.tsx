'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const features = [
  {
    icon: '🎮',
    color: 'bg-brand-purple/10',
    label: 'Game-based Learning',
    description: 'Quizzes designed like games keep students engaged and motivated to keep going.',
  },
  {
    icon: '🎥',
    color: 'bg-brand-blue/10',
    label: 'Live Tuition',
    description: 'Join live classes with certified teachers from the comfort of home.',
  },
  {
    icon: '🃏',
    color: 'bg-brand-yellow/10',
    label: 'Smart Flashcards',
    description: 'Spaced repetition flashcards help lock in knowledge before exams.',
  },
  {
    icon: '🤖',
    color: 'bg-brand-green/10',
    label: 'AI Study Tools',
    description: 'Personalised practice paths powered by AI adapt to each student\'s gaps.',
  },
  {
    icon: '📝',
    color: 'bg-brand-orange/10',
    label: 'Past Year Papers',
    description: 'Full archive of SPM, PT3, and UPSR past papers with worked solutions.',
  },
  {
    icon: '📊',
    color: 'bg-brand-red/10',
    label: 'Progress Tracking',
    description: 'Parents and students get clear dashboards showing mastery per topic.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-primary">
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
            Everything in one app
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Tools that actually work
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary max-w-2xl mx-auto">
            Every feature is built around how Malaysian students actually study — curriculum-aligned, exam-focused, and genuinely fun.
          </motion.p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={scaleIn}
              className="group p-6 rounded-2xl border border-border-default bg-surface-primary hover:border-border-brand hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-text-primary mb-2">{f.label}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
