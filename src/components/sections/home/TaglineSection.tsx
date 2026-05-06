"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { homeTranslations } from "@/content/translations/home";

export default function TaglineSection() {
  const t = useT(homeTranslations)
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(to right, #CCFFCC 3.5%, #F2FFF2 3.5%)",
            border: "2px solid #66e0b6" /* OG-Green/300 — more visible */,
            padding:
              "30px 30px 30px 68px" /* 30px all sides, extra left to clear bookmark */,
          }}
        >
          {/* ── Bookmark ribbon ──
              Two-tone split: left half OG-Green/300, right half OG-Green/700.
              V-notch clip-path at bottom. */}
          <div
            className="absolute top-0 left-6"
            style={{
              width: "22px",
              height: "76px",
              background: "linear-gradient(to right, #00CC85 100%)",
              clipPath: "polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%)",
            }}
          />

          {/* ── Tagline text ──
              Edit: src/content/home.ts → tagline.text */}
          <p
            className="text-base sm:text-lg lg:text-xl font-bold leading-relaxed"
            style={{ color: "#1a1a1a" }}
          >
            {t('tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
