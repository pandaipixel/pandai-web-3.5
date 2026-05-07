"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { testimonials } from "@/content/parents";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { parentsTranslations } from "@/content/translations/parents";

function StarIcon() {
  return (
    <svg viewBox="0 0 18 17" width="18" height="17" role="presentation" aria-hidden="true">
      <path
        d="M 14.209 17.478 L 9.416 15.059 L 4.601 17.433 C 4.278 17.593 3.892 17.56 3.601 17.347 C 3.31 17.134 3.162 16.777 3.218 16.42 L 4.039 11.11 L 0.27 7.263 C 0.017 7.004 -0.071 6.626 0.043 6.282 C 0.156 5.939 0.452 5.687 0.81 5.631 L 6.109 4.765 L 8.618 0.018 C 8.978 -0.68 9.979 -0.669 10.339 0.018 L 12.791 4.788 L 18.09 5.699 C 18.866 5.834 19.17 6.779 18.619 7.33 L 14.839 11.144 L 15.604 16.454 C 15.716 17.23 14.906 17.804 14.209 17.455 Z"
        fill="rgb(255, 208, 0)"
      />
    </svg>
  );
}

export default function TestimonialSection() {
  const t = useT(parentsTranslations);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  const activeItem = testimonials.items[activeIndex];

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-[50px] w-full py-8 sm:py-[50px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center"
          style={{ gap: "30px" }}
        >
          {/* Heading */}
          <motion.h2
            variants={fadeInUp}
            className="font-bold text-[28px] sm:text-[36px] md:text-[42px] text-center"
            style={{ lineHeight: "1.1em" }}
          >
            <span style={{ color: "#434955" }}>{t("testimonials.heading.parents")}</span>
            <span style={{ color: "rgb(255, 207, 48)" }}>{t("testimonials.heading.word")}</span>
          </motion.h2>

          {/* Two-column layout: card left, avatar selector right */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col lg:flex-row w-full items-stretch justify-center"
            style={{ gap: "20px" }}
          >
            {/* Left: Testimonial card */}
            <div
              className="w-full max-w-[393px] overflow-hidden"
              style={{
                border: "1px solid rgb(252, 213, 83)",
                borderRadius: "20px",
              }}
            >
              {/* Card header — pale yellow */}
              <div
                className="flex items-center gap-[20px]"
                style={{
                  backgroundColor: "rgb(251, 240, 202)",
                  padding: "24px 30px",
                }}
              >
                {/* Main avatar */}
                <div
                  className="flex-none rounded-full overflow-hidden"
                  style={{
                    width: "90px",
                    height: "90px",
                    border: "1.5px solid rgb(252, 213, 83)",
                    backgroundColor: "rgb(140, 235, 139)",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id + "-avatar"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full"
                    >
                      <Image
                        src={activeItem.avatar}
                        alt={activeItem.name}
                        width={90}
                        height={90}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Name + role */}
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeItem.id + "-name"}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-[18px]"
                      style={{ color: "rgb(255, 207, 48)" }}
                    >
                      {activeItem.name}
                    </motion.span>
                  </AnimatePresence>
                  <span className="font-bold text-[14px]" style={{ color: "#434955" }}>
                    {t("testimonials.role")}
                  </span>
                </div>
              </div>

              {/* Card body — quote + stars */}
              <div
                className="flex flex-col"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  padding: "24px 30px",
                  gap: "16px",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeItem.id + "-quote"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[16px] leading-relaxed"
                    style={{ color: "#434955" }}
                  >
                    {t(`testimonials.quote.${activeItem.id}`)}
                  </motion.p>
                </AnimatePresence>
                <div className="flex items-center gap-[4px]">
                  {Array.from({ length: activeItem.stars }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: 3×2 avatar grid selector — stretches to card height, grid centered */}
            <div className="w-full max-w-[472px] flex items-center justify-center">
            <div
              className="grid grid-cols-3 gap-4 w-full"
            >
              {testimonials.items.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <div key={item.id} className="flex items-center justify-center">
                    <motion.button
                      onClick={() => setActiveIndex(i)}
                      onPointerDown={() => setPressedIndex(i)}
                      onPointerUp={() => setPressedIndex(null)}
                      onPointerLeave={() => setPressedIndex(null)}
                      aria-label={item.name}
                      whileTap={{ scale: 0.93 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="flex-none overflow-hidden cursor-pointer focus:outline-none"
                      style={{
                        width: "86px",
                        height: "103px",
                        borderRadius: "9999px",
                        border: isActive || pressedIndex === i
                          ? "20px solid rgb(255, 207, 48)"
                          : "3px solid rgb(255, 207, 48)",
                        backgroundColor: "rgb(255, 255, 255)",
                        padding: 0,
                        transition: "border 0.15s ease",
                      }}
                    >
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={86}
                        height={103}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  </div>
                );
              })}
            </div>
            </div>
          </motion.div>

          {/* CTA button */}
          <motion.div variants={fadeInUp}>
            <Link
              href={testimonials.cta.href}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              className="inline-flex items-center h-[57px] cursor-pointer"
              style={{
                backgroundColor: "#00CC85",
                border: "1px solid #0B5851",
                borderRadius: "30px",
                padding: btnHovered ? "7px" : "10px",
                gap: "10px",
                textDecoration: "none",
                transition: "padding 0.2s ease",
              }}
            >
              <span
                className="flex-1 px-2 text-center"
                style={{
                  color: "#ffffff",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "1em",
                }}
              >
                {t("testimonials.cta")}
              </span>
              <span
                className="flex items-center justify-center flex-none rounded-full"
                style={{
                  backgroundColor: "#CCFFCC",
                  width: btnHovered ? "42px" : "38px",
                  height: btnHovered ? "42px" : "38px",
                  transition: "width 0.2s ease, height 0.2s ease",
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px", display: "block" }}
                  role="presentation"
                >
                  <path
                    d="M 0 0 L 3.5 3.25 L 0 6.5"
                    fill="transparent"
                    stroke="#0B5851"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(10.75 8.75)"
                  />
                </svg>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
