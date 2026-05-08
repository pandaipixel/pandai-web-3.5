"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { pricing } from "@/content/parents";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { parentsTranslations } from "@/content/translations/parents";

type PlanTab = "monthly" | "yearly";

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ flexShrink: 0 }} role="presentation">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ flexShrink: 0 }} role="presentation">
      <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" style={{ flexShrink: 0 }} role="presentation">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FindOutMoreSection() {
  const t = useT(parentsTranslations);
  const [activeTab, setActiveTab] = useState<PlanTab>("yearly");

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Responsive outer padding: tighter on mobile, full on sm+ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-[50px] w-full py-8 sm:py-[50px]">

        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="font-bold text-[28px] sm:text-[36px] md:text-[42px] text-center mb-[28px]"
          style={{ lineHeight: "1.1em" }}
        >
          <span style={{ color: "#FFD000" }}>{t("pricing.heading.save")}</span>
          <span style={{ color: "#434955" }}>{t("pricing.heading.rest")}</span>
        </motion.h2>

        {/* Outer pricing container */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col overflow-hidden"
          style={{
            border: "1px solid rgb(255, 208, 0)",
            backgroundColor: "rgb(255, 208, 0)",
            borderRadius: "25px",
            gap: "2px",
          }}
        >
          {/* Description area */}
          <motion.div
            variants={fadeInUp}
            className="px-4 py-4 sm:px-[25px] sm:py-[25px]"
            style={{ backgroundColor: "rgb(255, 240, 173)" }}
          >
            <p
              className="text-[15px] sm:text-[17px] md:text-[19px] font-bold leading-relaxed text-center"
              style={{ color: "#434955" }}
            >
              {t("pricing.desc")}
            </p>
          </motion.div>

          {/* Content row: left illustration + right plan table */}
          <div className="flex flex-col lg:flex-row" style={{ gap: "2px" }}>

            {/* Left: illustration — hidden on mobile, visible on lg+ */}
            <motion.div
              variants={fadeInUp}
              className="hidden lg:flex items-end justify-center pt-[30px] px-[30px] flex-1"
              style={{
                backgroundColor: "rgb(255, 225, 89)",
                minHeight: "300px",
              }}
            >
              <Image
                src={pricing.illustration}
                alt="Family subscription illustration"
                width={320}
                height={280}
                className="w-full max-w-[280px] md:max-w-[320px] object-contain"
              />
            </motion.div>

            {/* Right: plan table */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col flex-1 p-4 sm:p-10"
            >
              <div className="flex flex-col">

                {/* Tab bar — mobile: gap 20px px 20px / desktop: gap 33px px 25px */}
                <div className="flex h-[43px] gap-5 sm:gap-[33px] px-5 sm:px-[25px]">

                  {/* Monthly tab — always light green */}
                  <button
                    onClick={() => setActiveTab("monthly")}
                    className="flex flex-1 items-center justify-center gap-0 sm:gap-[8px] transition-colors duration-200 rounded-tl-[15px] rounded-tr-[15px] sm:rounded-tl-[20px] sm:rounded-tr-[20px] px-[10px] sm:px-[20px]"
                    style={{
                      backgroundColor: "rgb(204, 255, 204)",
                      color: "rgb(11, 88, 81)",
                    }}
                  >
                    <span className="font-semibold text-[13px] sm:text-[17px] whitespace-nowrap">
                      {t("pricing.tab.monthly")}
                    </span>
                    {activeTab === "monthly" ? <ChevronDown /> : (
                      <motion.div
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                      >
                        <ChevronUp />
                      </motion.div>
                    )}
                  </button>

                  {/* Yearly tab — always dark green */}
                  <button
                    onClick={() => setActiveTab("yearly")}
                    className="flex flex-1 items-center justify-center gap-0 sm:gap-[8px] transition-colors duration-200 rounded-tl-[15px] rounded-tr-[15px] sm:rounded-tl-[20px] sm:rounded-tr-[20px] px-[10px] sm:px-[20px]"
                    style={{
                      backgroundColor: "rgb(0, 204, 133)",
                      color: "#ffffff",
                    }}
                  >
                    <span className="font-semibold text-[13px] sm:text-[17px] whitespace-nowrap">
                      {t("pricing.tab.yearly")}
                    </span>
                    {activeTab === "yearly" ? <ChevronDown /> : (
                      <motion.div
                        animate={{ scale: [1, 1.35, 1] }}
                        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                      >
                        <ChevronUp />
                      </motion.div>
                    )}
                  </button>
                </div>

                {/* Table body */}
                <div
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    borderRadius: "15px 15px 20px 20px",
                    overflow: "hidden",
                  }}
                >
                  {/* Header row */}
                  <div
                    className="flex transition-colors duration-200"
                    style={{
                      backgroundColor:
                        activeTab === "yearly"
                          ? "rgb(0, 204, 133)"
                          : "rgb(204, 255, 204)",
                      padding: "15px",
                    }}
                  >
                    <div
                      className="flex-1 flex items-center justify-center"
                      style={{
                        borderRight:
                          activeTab === "yearly"
                            ? "1.5px solid rgba(255,255,255,0.5)"
                            : "1.5px solid rgb(11, 88, 81)",
                        padding: "8px 8px",
                      }}
                    >
                      <span
                        className="text-[12px] sm:text-[16px] font-bold text-center"
                        style={{
                          color: activeTab === "yearly" ? "#ffffff" : "rgb(11, 88, 81)",
                          maxWidth: "90px",
                          lineHeight: "1.3",
                        }}
                      >
                        {t("pricing.table.children")}
                      </span>
                    </div>
                    <div
                      className="flex-1 flex items-center"
                      style={{ padding: "8px 8px" }}
                    >
                      {/* Text — flex-1 so it fills space and centers its content */}
                      <span
                        className="flex-1 text-[12px] sm:text-[16px] font-bold text-center"
                        style={{
                          color: activeTab === "yearly" ? "#ffffff" : "rgb(11, 88, 81)",
                          lineHeight: "1.3",
                        }}
                      >
                        {activeTab === "monthly"
                          ? t("pricing.table.monthly")
                          : t("pricing.table.yearly")}
                      </span>
                      {/* Auto Debit badge — flex-none at right, never overlaps */}
                      {activeTab === "yearly" && (
                        <span
                          className="flex-none inline-flex items-center justify-center text-center"
                          style={{
                            backgroundColor: "rgb(255, 242, 0)",
                            color: "rgb(11, 88, 81)",
                            borderRadius: "8px",
                            fontSize: "9px",
                            padding: "3px 5px",
                            lineHeight: "1.2",
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Auto<br />Debit
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Data rows */}
                  {pricing.rows.map((row, idx) => (
                    <div
                      key={row.id}
                      className="flex items-center"
                      style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        borderBottom:
                          idx < pricing.rows.length - 1
                            ? "1.5px solid rgb(255, 208, 0)"
                            : "none",
                      }}
                    >
                      {/* Left column: child icons */}
                      <div
                        className="flex items-center justify-center flex-1"
                        style={{ padding: "8px 10px", gap: "4px", minWidth: 0 }}
                      >
                        {row.icons.map((icon, i) => (
                          <Image
                            key={i}
                            src={icon}
                            alt=""
                            width={50}
                            height={46}
                            className="object-contain flex-none w-8 h-[30px] sm:w-[50px] sm:h-[46px]"
                          />
                        ))}
                      </div>

                      {/* Arrow — own flex item */}
                      <div
                        className="flex items-center justify-center flex-none"
                        style={{ width: "20px", color: "rgb(255, 185, 0)" }}
                      >
                        <ChevronRight />
                      </div>

                      {/* Right column: price */}
                      <div
                        className="flex items-center justify-center flex-1"
                        style={{ padding: "8px 10px", minWidth: 0 }}
                      >
                        {activeTab === "monthly" ? (
                          <span
                            className="text-[16px] sm:text-[22px] font-bold"
                            style={{ color: "rgb(0, 0, 0)" }}
                          >
                            {row.monthlyPrice}
                          </span>
                        ) : (
                          <span
                            className="font-bold text-center"
                            style={{
                              color: "rgb(0, 0, 0)",
                              fontSize: "clamp(12px, 3.5vw, 18px)",
                              lineHeight: "1.3",
                            }}
                          >
                            {row.yearlyDiscount} = {row.yearlyPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
