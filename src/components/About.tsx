"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
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
    <section id="about" ref={containerRef} className="relative min-h-screen bg-black py-32 px-4 md:px-12 lg:px-24 overflow-hidden z-20 border-t border-neutral-900 flex items-center">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
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
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
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
    </section>
  );
}
