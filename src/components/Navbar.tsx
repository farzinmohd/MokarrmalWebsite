"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Set scrolled state for background
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: t.nav.home, href: "#home" },
    { name: t.nav.menu, href: "#menu" },
    { name: t.nav.about, href: "#contact" },
    { name: t.nav.chefsMenu, href: "#chefs-menu" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const LanguageToggle = () => (
    <button
      onClick={toggleLanguage}
      className="relative flex items-center w-16 h-8 bg-neutral-900/50 backdrop-blur-md rounded-full p-1 border border-neutral-800 hover:border-gold/50 transition-colors"
      aria-label="Toggle Language"
    >
      <span className="absolute left-2 text-[10px] font-medium text-neutral-400">EN</span>
      <span className="absolute right-2 text-[10px] font-medium text-neutral-400">AR</span>
      <motion.div
        className="w-6 h-6 bg-gold rounded-full z-10 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
        animate={{ x: language === "en" ? 0 : 32 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      />
    </button>
  );

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.1, 0.25, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 ${
          scrolled ? "py-4" : "py-8"
        }`}
      >
        <div
          className={`flex items-center justify-between w-full max-w-7xl mx-4 md:mx-12 px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl md:text-2xl font-bold tracking-widest text-white cursor-pointer">
              MOKARRMAL<span className="text-gold">.</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="relative group text-sm font-medium text-neutral-300 hover:text-white transition-colors py-2"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right" />
              </a>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <LanguageToggle />
            <a
              href="tel:+966500000000"
              className="px-6 py-2.5 bg-gradient-to-r from-gold/80 to-gold text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto mb-16">
              <span className="text-2xl font-bold tracking-widest text-white">
                MOKARRMAL<span className="text-gold">.</span>
              </span>
              <button
                className="text-white p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Mobile Menu"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col space-y-8 items-center justify-center flex-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl md:text-5xl font-light tracking-wide text-neutral-300 hover:text-gold transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col items-center space-y-8 mb-8">
              <LanguageToggle />
              <a
                href="tel:+966500000000"
                className="w-full max-w-sm py-4 bg-gradient-to-r from-gold/80 to-gold text-black rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] text-center block"
              >
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
