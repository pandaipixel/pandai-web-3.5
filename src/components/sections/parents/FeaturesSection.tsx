"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { features } from "@/content/parents";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import { useT } from "@/context/LanguageContext";
import { parentsTranslations } from "@/content/translations/parents";

const CARD_IDS = ["activity", "goals", "performance"] as const;

function FeatureCard({
  id,
  image,
  title,
  description,
}: {
  id: string;
  image: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative w-full sm:w-[calc(50%-10px)] lg:flex-1 flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        border: "1.5px solid #FFD000",
        borderRadius: "25px",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "114px",
          height: "114px",
          backgroundColor: "rgb(251, 230, 155)",
          borderRadius: "100px",
          top: "52%",
          left: "-60px",
          transform: "translateY(-50%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "165px",
          height: "165px",
          backgroundColor: "rgb(251, 240, 202)",
          borderRadius: "500px",
          top: "-40px",
          right: "-40px",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "66px",
          height: "66px",
          backgroundColor: "rgb(252, 213, 83)",
          borderRadius: "100px",
          top: "-22px",
          left: "44px",
          zIndex: 1,
        }}
      />

      {/* Feature image — fixed 157px height so text row aligns across all cards */}
      <div
        className="relative z-10 flex items-center justify-center flex-none"
        style={{ height: "197px", minHeight: "190px", padding: "20px 10px" }}
      >
        <Image
          src={image}
          alt={title}
          width={240}
          height={157}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Text content */}
      <div
        className="relative z-10 flex flex-col gap-[20px] p-[20px] text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderTop: "1.5px solid #FFD000",
        }}
      >
        <h3
          className="font-bold text-[18px] leading-snug"
          style={{ color: "#FFD000" }}
        >
          {title}
        </h3>
        <p
          className="text-[14px] leading-relaxed"
          style={{ color: "#000000" }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ParentsFeaturesSection() {
  const t = useT(parentsTranslations);

  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-[50px] w-full py-4 sm:py-[30px]">
        <div
          className="flex flex-col gap-[20px] w-full overflow-hidden"
          style={{
            border: "1.5px solid #FFD000",
            borderRadius: "25px",
            backgroundColor: "#ffffff",
            padding: "16px",
          }}
        >

          {/* Section header — illustration above heading on mobile/tablet, side-by-side on desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-[30px] lg:gap-[50px] overflow-hidden">

            {/* Illustration — above heading on mobile/tablet, right side on desktop */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-1 items-center justify-center overflow-hidden order-first lg:order-last"
            >
              <Image
                src={features.sectionImage}
                alt="Pandai for Parents illustration"
                width={420}
                height={320}
                className="w-full max-w-[240px] sm:max-w-[300px] md:max-w-[420px] object-contain"
              />
            </motion.div>

            {/* Title + subtitle */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-[16px] flex-1 text-center lg:text-left"
            >
              <motion.h2
                variants={fadeInUp}
                className="font-bold text-[28px] sm:text-[36px] md:text-[42px]"
                style={{ color: "#FFD000", lineHeight: "1.1em" }}
              >
                {t("features.title")}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-[15px] sm:text-[16px] md:text-[18px] font-bold"
                style={{ color: "#434955", lineHeight: "1.5em" }}
              >
                {t("features.subtitle")}
              </motion.p>
            </motion.div>

          </div>

          {/* Cards container */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch justify-center gap-[16px] sm:gap-[20px] px-4 py-4 sm:px-[30px] sm:py-[30px]"
            style={{
              backgroundColor: "rgb(251, 240, 202)",
              border: "1px solid #FFD000",
              borderRadius: "20px",
            }}
          >
            {features.cards.map((card) => (
              <FeatureCard
                key={card.id}
                id={card.id}
                image={card.image}
                title={t(`features.${card.id}.title`)}
                description={t(`features.${card.id}.desc`)}
              />
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
