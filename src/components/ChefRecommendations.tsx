"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

export default function ChefRecommendations() {
  const { t } = useLanguage();
  const c = t.chefsSection;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      tl.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" },
        "-=0.5"
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const dishImages = [
    "/media/truffle_burger.png",
    "/media/mandi.png",
    "/media/mushroom_pizza.png",
  ];

  return (
    <section id="chefs-menu" ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Lighting Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-white mb-12 md:mb-20">
          {c.title.split("'")[0]}&apos;<span className="text-gold italic font-serif">{c.title.split("'").slice(1).join("'")}</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {c.dishes.map((dish, i) => (
            <div
              key={i}
              className={`group relative bg-black border border-neutral-800 rounded-3xl overflow-hidden hover:border-gold/50 transition-colors duration-500 ${i === 1 ? "md:mt-12" : ""}`}
            >
              {/* Image - top 60% */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={dishImages[i]}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
              </div>

              {/* Text - bottom 40% */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{dish.name}</h3>
                <p className="text-neutral-400 mb-6 font-light text-sm leading-relaxed">{dish.desc}</p>
                <button className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-xs hover:text-white hover:border-white transition-all">
                  {dish.discover}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
