"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { cta } from "@/content/parents";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { parentsTranslations } from "@/content/translations/parents";

function PandaiButton({
  href,
  label,
  variant = "primary",
  animated = false,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  animated?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isPrimary = variant === "primary";

  const inner = (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="inline-flex items-center h-[57px] cursor-pointer"
      style={{
        backgroundColor: pressed
          ? "rgb(11, 88, 81)"
          : hovered
            ? "rgb(140, 235, 139)"
            : isPrimary ? "rgb(0, 204, 133)" : "rgb(204, 255, 204)",
        border: "1px solid #0B5851",
        borderRadius: "30px",
        padding: hovered ? "7px" : "10px",
        gap: "10px",
        textDecoration: "none",
        transition: "padding 0.2s ease, background-color 0.15s ease",
      }}
    >
      <span
        className="flex-1 px-2 text-center"
        style={{
          color: pressed ? "rgb(204, 255, 204)" : hovered ? "rgb(11, 88, 81)" : isPrimary ? "#ffffff" : "rgb(11, 88, 81)",
          fontFamily: "Poppins, sans-serif",
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "1em",
        }}
      >
        {label}
      </span>
      <span
        className="flex items-center justify-center flex-none rounded-full"
        style={{
          backgroundColor: pressed ? "rgb(140, 235, 139)" : "rgb(204, 255, 204)",
          width: hovered ? "42px" : "38px",
          height: hovered ? "42px" : "38px",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.15s ease",
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(10.75 8.75)"
          />
        </svg>
      </span>
    </Link>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
        style={{ display: "inline-flex" }}
      >
        {inner}
      </motion.div>
    );
  }

  return inner;
}

export default function CTASection() {
  const t = useT(parentsTranslations);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-[50px] w-full pb-8 sm:pb-[40px]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[1100px] mx-auto flex flex-col"
          style={{
            backgroundColor: "rgb(251, 240, 202)",
            border: "1px solid rgb(255, 208, 0)",
            borderRadius: "25px",
            overflow: "hidden",
          }}
        >
          {/* ── Row 1: Content above illustration ──────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-[20px] px-6 sm:px-[50px] pt-8 sm:pt-[40px] pb-6 sm:pb-8"
          >
            {/* Desktop (sm+): char image + H2/H3 side-by-side */}
            <div className="hidden sm:flex flex-row items-center gap-[10px]">
              <div className="flex-none" style={{ width: "147px" }}>
                <Image
                  src={cta.characterImage}
                  alt=""
                  width={147}
                  height={147}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-0">
                <h2
                  className="font-bold sm:text-[35px] lg:text-[41px]"
                  style={{ color: "rgb(11, 88, 81)", lineHeight: "1.1em" }}
                >
                  {t("cta.heading")}
                </h2>
                <h3
                  className="font-bold sm:text-[28px] lg:text-[32px]"
                  style={{ color: "rgb(11, 88, 81)", lineHeight: "1.1em" }}
                >
                  {t("cta.subheading")}
                </h3>
              </div>
            </div>

            {/* Mobile only: char image centered */}
            <div className="flex sm:hidden justify-center">
              <Image
                src={cta.characterImage}
                alt=""
                width={147}
                height={147}
                className="w-[120px] object-contain"
              />
            </div>

            {/* Mobile only: H2/H3 below char, above stat */}
            <div className="flex sm:hidden flex-col items-center gap-0">
              <h2
                className="font-bold text-[28px] text-center"
                style={{ color: "rgb(11, 88, 81)", lineHeight: "1.1em" }}
              >
                {t("cta.heading")}
              </h2>
              <h3
                className="font-bold text-[23px] text-center"
                style={{ color: "rgb(11, 88, 81)", lineHeight: "1.1em" }}
              >
                {t("cta.subheading")}
              </h3>
            </div>

            {/* Stat — always visible, 16px, no bold */}
            <p
              className="text-center"
              style={{ color: "rgb(11, 88, 81)", fontSize: "16px", fontWeight: 400 }}
            >
              {t("cta.stat.prefix")} {cta.statNumber} {t("cta.stat.suffix")}
            </p>
          </motion.div>

          {/* ── Row 2: Illustration over arch dome (no extra spacing) ──────── */}
          {/* Arch height = 83.3% of illustration height (329/395).
              Illustration covers arch from top; arch sits at bottom. */}
          <motion.div
            variants={fadeInUp}
            className="relative w-full"
          >
            {/* Yellow arch — behind illustration, anchored to bottom */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 w-full max-w-[735px]"
              style={{
                height: "83.3%",
                maxHeight: "350px",
                backgroundColor: "rgb(255, 208, 0)",
                borderRadius: "1000px 1000px 0 0",
              }}
            />

            {/* Illustration — max 735px, centered, on top of arch */}
            <Image
              src={cta.illustrationImage}
              alt=""
              width={735}
              height={395}
              className="relative z-10 w-full max-w-[735px] mx-auto object-contain block"
            />
          </motion.div>

          {/* ── Row 3: CTA buttons ─────────────────────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-row flex-wrap items-center justify-center"
            style={{
              gap: "15px",
              padding: "30px 20px",
              backgroundColor: "rgb(242, 255, 242)",
              borderTop: "1px solid rgb(255, 208, 0)",
            }}
          >
            <PandaiButton href={cta.button.href} label={t("cta.button")} variant="primary" animated />
            <PandaiButton href={cta.button2.href} label={t("cta.button2")} variant="primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
