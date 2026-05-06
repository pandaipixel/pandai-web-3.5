'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerContainer, scaleIn, slideInLeft } from '@/lib/animations'

const features = [
  {
    icon: '🎥',
    color: 'bg-brand-blue/10 text-brand-blue',
    label: 'Online Tuition',
    description: 'Learn in fun, interactive classes with experienced tutors—group or 1-on-1.',
  },
  {
    icon: '⚔️',
    color: 'bg-brand-purple/10 text-brand-purple',
    label: 'Quiz Battle',
    description: 'Compete in real-time quiz games with friends across Malaysia.',
  },
  {
    icon: '📝',
    color: 'bg-brand-yellow/10 text-brand-yellow',
    label: 'Quick Notes',
    description: 'Understand tough topics with concise, enjoyable notes.',
  },
  {
    icon: '📋',
    color: 'bg-brand-orange/10 text-brand-orange',
    label: 'Topical Test & Exams',
    description: 'Practice by topic and prepare with full exam simulations.',
  },
  {
    icon: '🏆',
    color: 'bg-brand-green/10 text-brand-green',
    label: 'Student Leaderboard',
    description: 'See your rank and scores compared to other students.',
  },
  {
    icon: '📊',
    color: 'bg-brand-red/10 text-brand-red',
    label: 'Report Card',
    description: 'Track progress by subject and spot strengths & gaps.',
  },
  {
    icon: '🥇',
    color: 'bg-brand-indigo/10 text-brand-indigo',
    label: 'Academic Competitions',
    description: 'Gain access to various academic competition questions to improve your chances at scoring greater marks!',
  },
  {
    icon: '🤖',
    color: 'bg-brand-green/10 text-brand-green',
    label: 'Ask PBot',
    description: 'Experience the future of learning with Ask PBot, your AI study buddy.',
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
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
        >
          <motion.div variants={slideInLeft}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Everything a student needs, all in one app
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Pandai packs every tool a Malaysian student needs to excel — from live classes to AI-powered study helpers.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="flex justify-center lg:justify-end">
            <Image
              src="/images/feature-image.png"
              alt="Pandai features"
              width={480}
              height={360}
              className="w-full max-w-sm h-auto rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={scaleIn}
              className="group p-5 rounded-2xl border border-border-default bg-surface-primary hover:border-border-brand hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-2">{f.label}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
