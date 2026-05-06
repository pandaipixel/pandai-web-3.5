'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const testimonials = [
  {
    quote: 'My daughter went from Cs to straight As in one semester. Pandai made studying feel like a game — she actually looks forward to it now.',
    name: 'Puan Rashidah',
    role: 'Parent, Selangor',
    avatar: 'PR',
    rating: 5,
  },
  {
    quote: 'I used Pandai to prepare for SPM and scored 9As. The past year papers and live tuition sessions were game changers.',
    name: 'Hafiz Azri',
    role: 'SPM Student, Johor',
    avatar: 'HA',
    rating: 5,
  },
  {
    quote: 'As a teacher, I recommend Pandai to all my students. The curriculum alignment is spot on and the explanations are clear.',
    name: 'Cikgu Norzahra',
    role: 'Science Teacher, KL',
    avatar: 'CN',
    rating: 5,
  },
  {
    quote: 'My son is in Form 3 and his BM and Math have improved so much. The flashcards really help him memorise vocab.',
    name: 'Encik Farouk',
    role: 'Parent, Penang',
    avatar: 'EF',
    rating: 5,
  },
  {
    quote: 'I love the daily quizzes. They keep me consistent and I can see my improvement week by week on the dashboard.',
    name: 'Aina Syahirah',
    role: 'PT3 Student, Kedah',
    avatar: 'AS',
    rating: 5,
  },
  {
    quote: 'The app is really user-friendly. My kid can use it independently without needing my help every five minutes.',
    name: 'Puan Suraya',
    role: 'Parent, Sabah',
    avatar: 'PS',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brand-yellow text-sm">★</span>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-surface-primary overflow-hidden">
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
            Real results
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            What families are saying
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-text-secondary max-w-2xl mx-auto">
            Over 1 million Malaysian students have used Pandai to improve their grades.
          </motion.p>
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="p-6 rounded-2xl border border-border-default bg-surface-secondary hover:shadow-lg transition-shadow duration-200"
            >
              <StarRating count={t.rating} />
              <p className="text-sm text-text-secondary leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center text-xs font-bold text-text-brand shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                  <p className="text-xs text-text-tertiary">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
