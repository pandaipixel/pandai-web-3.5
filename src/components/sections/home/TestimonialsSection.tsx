'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { usePandaiCount } from '@/lib/usePandaiCount'
import { testimonialsSection } from '@/content/home'

// ── Stars — supports half-star (for fractional ratings) ──
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const full = i < Math.floor(rating)
        const half = !full && i === Math.floor(rating) && rating % 1 >= 0.5
        const id = `sh-${size}-${i}-${rating}`
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            {half && (
              <defs>
                <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#F5A623" />
                  <stop offset="50%" stopColor="#D1D5DB" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
              fill={full ? '#F5A623' : half ? `url(#${id})` : '#D1D5DB'}
            />
          </svg>
        )
      })}
    </div>
  )
}


export default function TestimonialsSection() {
  const count = usePandaiCount()
  const { headingPrefix, headingMid, headingSuffix, cards, storeRatings } = testimonialsSection

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto relative">

        {/* ── Floating mascot — left edge, outside the overflow-hidden frame ── */}
        <motion.img
          src="https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/ad44940d-1c50-4b50-0a5b-33ea6f0f3600/1024px"
          alt=""
          className="absolute z-10 hidden sm:block pointer-events-none"
          style={{ left: -16, top: '28%', width: 92 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── Outer frame: rounded box with background image + border ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            backgroundImage:
              'url(https://imagedelivery.net/zy4C5mYDeC8QYHozzOk2nQ/7f059ac0-95c3-4213-59e9-c5cbf1160e00/1024px)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2px solid #99ebce',
            padding: '36px 32px 28px',
          }}
        >

          {/* ── Heading ── */}
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl lg:text-[2rem] font-bold leading-snug"
              style={{ color: '#1a1a1a' }}
            >
              {headingPrefix}{' '}
              <span style={{ color: '#00cc85' }}>{count.users.toLocaleString()}</span>
              <br />
              {headingMid}
              <br />
              <span style={{ color: '#00cc85' }}>{count.questions.toLocaleString()}</span>{' '}
              {headingSuffix}
            </h2>
          </div>

          {/* ── 2×2 testimonial card grid ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
          >
            {cards.map((card) => (
              <motion.div
                key={card.name}
                variants={fadeInUp}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{ border: '1.5px solid #99ebce' }}
              >
                {/* ── Top section: mint bg, avatar + name/role ── */}
                <div
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ backgroundColor: '#e8faf0' }}
                >
                  {/* Large avatar with green ring + mint fill */}
                  <div
                    className="relative shrink-0 rounded-full overflow-hidden"
                    style={{
                      width: 72,
                      height: 72,
                      backgroundColor: '#ccf5e7',
                      border: '3px solid #00cc85',
                    }}
                  >
                    <Image
                      src={card.avatar}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>
                  {/* Name + role */}
                  <div>
                    <p className="font-extrabold text-xl leading-tight" style={{ color: '#00cc85' }}>
                      {card.name}
                    </p>
                    <p className="font-bold text-base mt-0.5" style={{ color: '#374151' }}>
                      {card.role}
                    </p>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div style={{ height: '1.5px', backgroundColor: '#99ebce' }} />

                {/* ── Bottom section: white bg, quote + stars ── */}
                <div className="flex flex-col flex-1 gap-4 px-5 py-4 bg-white">
                  <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
                    {card.quote}
                  </p>
                  <Stars rating={card.rating} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Store ratings row — pill chips ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          >
            {storeRatings.map((item) => (
              <motion.div
                key={item.platform}
                variants={fadeInUp}
                className="flex overflow-hidden"
                style={{ border: '1.5px solid #99ebce', borderRadius: '9999px' }}
              >
                {/* Left half — mint green, icon */}
                <div
                  className="flex items-center justify-center px-4 shrink-0"
                  style={{
                    backgroundColor: '#e8faf0',
                    borderRight: '1.5px solid #99ebce',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon} alt={item.platform} width={40} height={40} />
                </div>

                {/* Right half — white, score + stars + label + chevron */}
                <div className="flex items-center gap-3 flex-1 px-4 py-3 bg-white">
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-bold leading-none" style={{ color: '#1a1a1a' }}>
                        {item.score}
                      </span>
                      <Stars rating={item.score} size={18} />
                    </div>
                    <span className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                      {item.platform}
                    </span>
                  </div>

                  {/* Filled green chevron */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#00cc85' }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
