'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations'

const testimonials = [
  {
    quote: 'Saya menggunakan pandai untuk mengulangkaji dan membuat latihan, saya juga suka mencabar diri saya di Pandai untuk mendapatkan skor tertinggi',
    name: 'Ezran',
    role: 'Primary Student',
    initials: 'EZ',
    rating: 5,
  },
  {
    quote: 'Saya menggunakan pandai untuk mengulangkaji pelajaran di rumah. Pandai memberi peluang kepada pelajar untuk belajar dari kesilapan. Terima kasih pandai!',
    name: 'Hafizah',
    role: 'Primary Student',
    initials: 'HF',
    rating: 5,
  },
  {
    quote: 'Saya suka menghadiri kelas Live Tuition Pandai! Para tutor yang mengajar dalam kelas semuanya menarik dan sangat membantu. Saya senang faham dan hadam apa yang mereka ajarkan.',
    name: 'Irfan',
    role: 'Secondary Student',
    initials: 'IR',
    rating: 5,
  },
  {
    quote: 'Saya menggunakan semua fungsi yg terdapat dalam PANDAI untuk membantu saya dalam persediaan SPM. Selepas menggunakan Pandai keputusan peperiksaan saya sangat cemerlang dan bertambah baik!',
    name: 'Ain',
    role: 'Secondary Student',
    initials: 'AN',
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
    <section
      className="py-20 lg:py-28 bg-surface-inverse overflow-hidden relative"
      style={{ backgroundImage: 'url(/images/testimonial-bg.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-surface-inverse/85" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-inverse mb-4">
            What other Students, Parents, &amp; Teachers say after using Pandai?
          </motion.h2>
        </motion.div>

        {/* Testimonial grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={scaleIn}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-200"
            >
              <StarRating count={t.rating} />
              <p className="text-sm text-white/90 leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-inverse">{t.name}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
