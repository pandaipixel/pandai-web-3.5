"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { hero } from "@/content/parents";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { parentsTranslations } from "@/content/translations/parents";

export default function ParentsHeroSection() {
  const t = useT(parentsTranslations);
  const [btnHovered, setBtnHovered] = useState(false);
  return (
    <section className="relative bg-white overflow-hidden pt-24">
      <div className="max-w-[1200px] mx-auto px-[50px] w-full py-[50px]">
        {/* Hero Section — horizontal stack, maxWidth 1100px, gap 25px, center aligned */}
        <div className="max-w-[1100px] mx-auto flex flex-col lg:flex-row items-center gap-[25px]">

          {/* LEFT: vertical stack, gap 47px, overflow hidden */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-[47px] flex-1 overflow-hidden w-full"
          >
            {/* Headline stack — gap 20px, padding-left 25px */}
            <div className="flex flex-col gap-[20px] pl-0 lg:pl-[25px] items-center text-center lg:items-start lg:text-left">
              {/* Line 1: H1, yellow #FFD000, sized so first phrase fits on one line */}
              <motion.h1
                variants={fadeInUp}
                className="font-bold text-[34px] md:text-[44px] lg:text-[57px]"
                style={{ color: "#FFD000", lineHeight: "1.1em" }}
              >
                {t("hero.line1")}
              </motion.h1>
              {/* Line 2: H3, dark gray #434955, 32px, weight 700, line-height 1.1 */}
              <motion.h3
                variants={fadeInUp}
                className="font-bold text-[32px]"
                style={{ color: "#434955", lineHeight: "1.1em" }}
              >
                {t("hero.line2")}
              </motion.h3>
            </div>

            {/* CTA button row — padding-left 25px, matching Framer Button 2025 - Var1 */}
            <motion.div
              variants={fadeInUp}
              className="flex pl-0 lg:pl-[25px] justify-center lg:justify-start"
            >
              <Link
                href={hero.cta.href}
                target="_blank"
                rel="noopener noreferrer"
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
                {/* Button label */}
                <span
                  className="flex-1 px-2 text-center whitespace-pre"
                  style={{
                    color: "#ffffff",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "1em",
                  }}
                >
                  {t("hero.cta")}
                </span>

                {/* Arrow badge — light green circle, grows 38px → 42px on hover */}
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

          {/* RIGHT: CF Image container */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center flex-1 w-full overflow-hidden"
          >
            <Image
              src={hero.image}
              alt="Pandai for Parents"
              width={600}
              height={469}
              className="w-full max-w-[320px] md:max-w-[420px] lg:max-w-full object-contain"
              priority
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
