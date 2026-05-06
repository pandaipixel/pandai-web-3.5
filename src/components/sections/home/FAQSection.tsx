'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const faqs = [
  {
    question: 'Is Pandai free to use?',
    answer: 'Yes! Pandai has a free tier that gives access to thousands of practice questions and basic features. Premium plans unlock live tuition, unlimited flashcards, and detailed analytics.',
  },
  {
    question: 'Which school levels does Pandai support?',
    answer: 'Pandai covers Primary (Year 1–6 / KSSR), Lower Secondary (Form 1–3 / KSSM PT3), and Upper Secondary (Form 4–5 / KSSM SPM). All content is aligned to the Malaysian national curriculum.',
  },
  {
    question: 'How is Pandai different from other apps?',
    answer: 'Pandai is built specifically for Malaysian students — every question, note, and video is curriculum-aligned. The game-based format keeps students motivated, and live tuition means real teacher interaction, not just passive video watching.',
  },
  {
    question: 'Can parents track their child\'s progress?',
    answer: 'Yes. The Parent Dashboard gives real-time visibility into topics mastered, time spent studying, quiz scores, and upcoming tests. You\'ll know exactly where your child needs support.',
  },
  {
    question: 'Are the live tuition classes recorded?',
    answer: 'Yes. All live classes are recorded and available for replay within 48 hours, so students who miss a session can still catch up.',
  },
  {
    question: 'What devices does Pandai work on?',
    answer: 'Pandai is available on iOS and Android via the app, and also accessible on desktop through the web browser at app.pandai.org.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-default last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-text-primary group-hover:text-brand-green transition-colors">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-tertiary group-hover:text-brand-green text-xl shrink-0 transition-colors"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-text-secondary leading-relaxed pb-5">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <motion.span variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-text-brand text-sm font-semibold mb-4">
            Got questions?
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently asked questions
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary">
            Everything you need to know about Pandai.
          </motion.p>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="bg-surface-primary rounded-2xl border border-border-default px-6"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
