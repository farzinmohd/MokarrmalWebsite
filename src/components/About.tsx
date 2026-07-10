"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Star } from "lucide-react";

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

        {/* Right Side: Visual/Images */}
        <div className="relative h-[600px] w-full hidden lg:block">
           <motion.div 
             style={{ y: y1, opacity }} 
             className="absolute top-0 right-10 w-[60%] h-[65%] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl z-20"
           >
             <div className="absolute inset-0 bg-neutral-900">
               {/* Placeholder for actual interior/food image. Using one of the menu images as an aesthetic filler if none exist */}
               <img src="/media/burger.jpeg" alt="Mokarrmal Experience" className="w-full h-full object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
             </div>
             <div className="absolute bottom-8 left-8 flex items-center space-x-2 text-gold">
                {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
             </div>
           </motion.div>
           
           <motion.div 
             style={{ y: y2, opacity }}
             className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-3xl overflow-hidden border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)] z-10 backdrop-blur-sm"
           >
             <div className="absolute inset-0 bg-neutral-900/80">
               <img src="/media/pizza.png" alt="Mokarrmal Quality" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
             </div>
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-gold/30 flex items-center justify-center p-2">
                   <div className="w-full h-full rounded-full border border-gold/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <span className="text-gold font-bold tracking-widest text-xs">MOKARRMAL</span>
                   </div>
                </div>
             </div>
           </motion.div>
        </div>

      </div>
    </section>
  );
}
