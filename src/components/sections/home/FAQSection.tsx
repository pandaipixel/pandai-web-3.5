'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const faqs = [
  {
    question: 'What is Pandai and who is it for?',
    answer: 'Pandai is Malaysia\'s #1 online learning app, designed for school students from Year 1 to Form 5. It helps students improve their grades through engaging quizzes, live tuition, quick notes, exam simulations, and AI-powered tools — all aligned to the Malaysian national curriculum (KSSR & KSSM).',
  },
  {
    question: 'How does Pandai help students prepare for exams?',
    answer: 'Pandai offers topical tests, full exam simulations, past year papers, and detailed report cards that identify strengths and gaps. Live Tuition classes with experienced tutors provide real-time guidance, while Quick Notes and Ask PBot help students master topics faster.',
  },
  {
    question: 'What plans are available and what\'s included?',
    answer: 'Pandai offers a free plan with access to core features including quizzes, quick notes, and the student leaderboard. Premium plans unlock unlimited Live Tuition sessions, full exam simulations, Ask PBot (AI study buddy), and detailed progress analytics for parents.',
  },
  {
    question: 'Is Pandai aligned with Malaysia\'s curriculum and languages?',
    answer: 'Yes. All content on Pandai — questions, notes, videos, and exams — is fully aligned with KSSR (Year 1–6) and KSSM (Form 1–5). Content is available in Bahasa Malaysia and English, covering all major subjects from Mathematics to Science and Languages.',
  },
  {
    question: 'Which devices can I use, and how do I start?',
    answer: 'Pandai is available on iOS (App Store), Android (Google Play), and Huawei devices (AppGallery). You can also access it via web browser at app.pandai.org. Simply sign up for free, select your year and subjects, and start learning immediately.',
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
          className="text-text-tertiary group-hover:text-brand-green text-xl shrink-0 transition-colors leading-none"
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Frequently asked questions
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary">
            Everything you need to know about Pandai.
          </motion.p>
        </motion.div>

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
