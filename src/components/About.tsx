"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();
  const a = t.aboutUs;
  
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="relative bg-black py-32 px-4 md:px-12 lg:px-24 overflow-hidden z-20">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col space-y-8"
        >
          <div>
            <h4 className="text-gold tracking-[0.3em] text-sm md:text-base font-semibold uppercase mb-4">
              {a.title}
            </h4>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {a.storyTitle}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-gold to-transparent mb-8" />
          </div>

          <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
            <p>{a.storyText1}</p>
            <p>{a.storyText2}</p>
          </div>

          {/* Stats/Badges */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-neutral-800">
            <div>
              <p className="text-3xl font-bold text-white mb-1">{a.stats.quality}</p>
              <p className="text-sm text-gold tracking-widest uppercase">{a.stats.qualityLabel}</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">{a.stats.experience}</p>
              <p className="text-sm text-gold tracking-widest uppercase">{a.stats.experienceLabel}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Premium Credential Cards */}
        <div className="w-full hidden lg:flex flex-col justify-center gap-6">

          {/* Card 1 — Founding Story */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
            className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-md p-8 shadow-2xl hover:border-gold/40 transition-colors duration-500 group"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-500">
                <span className="text-gold text-2xl">🕌</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2">{a.card1.label}</p>
                <h4 className="text-white font-bold text-xl mb-2">{a.card1.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">{a.card1.desc}</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Ingredient Promise */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.25 }}
            className="w-full rounded-2xl border border-gold/20 bg-gradient-to-br from-neutral-950 to-neutral-900 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:shadow-[0_0_50px_rgba(212,175,55,0.15)] transition-all duration-500 group"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors duration-500">
                <span className="text-gold text-2xl">✦</span>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-gold uppercase mb-2">{a.card2.label}</p>
                <h4 className="text-white font-bold text-xl mb-3">{a.card2.title}</h4>
                <div className="flex flex-wrap gap-3">
                  {a.card2.tags.map((tag) => (
                    <span key={tag} className="text-[11px] text-gold/80 border border-gold/20 px-3 py-1 rounded-full bg-gold/5">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3 — Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.4 }}
            className="w-full rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6 flex items-center justify-around divide-x divide-neutral-800 rtl:divide-x-reverse"
          >
            {[
              [a.card3.val1, a.card3.label1],
              [a.card3.val2, a.card3.label2],
              [a.card3.val3, a.card3.label3],
            ].map(([val, label]) => (
              <div key={label} className="text-center flex-1">
                <p className="text-2xl font-bold text-white">{val}</p>
                <p className="text-[11px] text-gold tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </motion.div>

        </div>

      </div>

      {/* ── Shop Photo Gallery ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto w-full mt-20 relative z-10"
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold/70">Our Restaurant</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Photo row - Staggered Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 pb-16">
          {a.gallery.map((photo, i) => {
            const imgSrc = `/images/shop-${i + 1}.jpg`;
            const imgAlt = i === 0 
              ? "Mokarmal restaurant counter with staff serving customers" 
              : i === 1 
                ? "Mokarmal dining area with branded seating" 
                : "Mokarmal restaurant front counter view";

            return (
              <motion.div
                key={imgSrc}
                initial={{ opacity: 0, y: 60, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer border border-neutral-900 bg-neutral-950 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_50px_rgba(200,169,110,0.12)] ${
                  i === 0 ? "sm:translate-y-8" : i === 1 ? "sm:-translate-y-4" : "sm:translate-y-4"
                }`}
                style={{ aspectRatio: "4 / 4.8", maxHeight: "380px" }}
              >
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ filter: "brightness(0.75) contrast(1.05)" }}
                />
                
                {/* Glassmorphic Top Tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 z-10">
                  <span className="text-[9px] font-bold text-gold tracking-widest">{photo.num}</span>
                  <div className="w-[1px] h-2 bg-neutral-600" />
                  <span className="text-[9px] font-bold text-white tracking-widest uppercase">{photo.title}</span>
                </div>

                {/* Text block (always visible on gradient overlay) */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/85 to-transparent pt-20">
                  <p className="text-xs text-gold font-bold uppercase tracking-widest mb-1.5">
                    {language === "ar" ? "إرث مكرمّل" : "Mokarmal Legacy"}
                  </p>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {photo.subtitle}
                  </p>
                </div>

                {/* Subtle overlay border for extra premium feel */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 rounded-2xl transition-all duration-500 z-10" />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Guest Reviews Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto w-full mt-32 relative z-10"
      >
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-gold/70">
            {language === "ar" ? "آراء الضيوف" : "Guest Experiences"}
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {a.reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
              className="relative overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/40 p-8 hover:border-gold/20 hover:bg-neutral-950/80 hover:shadow-[0_20px_50px_rgba(200,169,110,0.05)] transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Gold gradient ambient spotlight on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`text-sm ${idx < review.rating ? "text-gold" : "text-neutral-800"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-[13px] text-neutral-400 font-light leading-relaxed italic mb-8 relative z-10">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author name */}
              <div className="relative z-10 pt-4 border-t border-neutral-900/60">
                <span className="text-[11px] font-bold text-white tracking-widest uppercase block">
                  {review.name}
                </span>
                <span className="text-[9px] text-gold/60 tracking-wider uppercase mt-1 block">
                  {language === "ar" ? "عميل معتمد" : "Verified Guest"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
