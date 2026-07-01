"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ChefRecommendations() {
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

  return (
    <section id="chefs-menu" ref={sectionRef} className="py-16 md:py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
      {/* Background Lighting Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-6xl font-bold text-center text-white mb-12 md:mb-20">
          Chef&apos;s <span className="text-gold italic font-serif">Recommendations</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {/* Card 1 */}
          <div className="group relative bg-black border border-neutral-800 rounded-3xl p-8 hover:border-gold/50 transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            <div className="relative h-64 w-full mb-8 z-20">
              <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                 {/* Image Placeholder */}
                 <span className="text-neutral-700">Image 1</span>
              </div>
            </div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Wagyu Gold Burger</h3>
              <p className="text-neutral-400 mb-6 font-light">A masterpiece of flavor. 100% Wagyu beef patty, vintage cheddar, and our secret gold sauce.</p>
              <button className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-all">Discover</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-black border border-neutral-800 rounded-3xl p-8 hover:border-gold/50 transition-colors duration-500 overflow-hidden mt-0 md:mt-12">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            <div className="relative h-64 w-full mb-8 z-20">
              <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                 {/* Image Placeholder */}
                 <span className="text-neutral-700">Image 2</span>
              </div>
            </div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Royal Shawarma Platter</h3>
              <p className="text-neutral-400 mb-6 font-light">Slow-roasted premium cuts, served with artisan bread and authentic garlic emulsion.</p>
              <button className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-all">Discover</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-black border border-neutral-800 rounded-3xl p-8 hover:border-gold/50 transition-colors duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
            <div className="relative h-64 w-full mb-8 z-20">
              <div className="w-full h-full bg-neutral-900 rounded-2xl flex items-center justify-center">
                 {/* Image Placeholder */}
                 <span className="text-neutral-700">Image 3</span>
              </div>
            </div>
            <div className="relative z-20">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">Truffle Pizza</h3>
              <p className="text-neutral-400 mb-6 font-light">Hand-tossed sourdough, rich truffle cream, wild mushrooms, and buffalo mozzarella.</p>
              <button className="text-gold border-b border-gold pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-all">Discover</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
