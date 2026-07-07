"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// ─── Category metadata ────────────────────────────────────────────────────────
const categoriesData = [
  {
    id: "burgers",
    image: "/images/menu/burger.jpg",
    accent: "#C8A96E",
    label: "Signature Burgers",
    tagline: "Crafted with prime Angus & Wagyu beef",
  },
  {
    id: "pizza",
    image: "/images/menu/pizza.png",
    accent: "#C8A96E",
    label: "Artisan Pizzas",
    tagline: "Stone-baked in our wood-fired oven",
  },
  {
    id: "rice",
    image: "/images/menu/rice.png",
    accent: "#C8A96E",
    label: "Heritage Rice",
    tagline: "Traditional Arabian recipes, perfected",
  },
];

// ─── Per-item image map ────────────────────────────────────────────────────────
const itemImages: Record<string, string> = {
  "Classic Burger":           "/images/menu/classic_burger.png",
  "Double Cheese Burger":     "/images/menu/double_cheese_burger.png",
  "Chicken Burger":           "/images/menu/chicken_burger.png",
  "Spicy Burger":             "/images/menu/spicy_burger.png",
  "Mokarrmal Special Burger": "/images/menu/special_burger.png",
  "Margherita Pizza":         "/images/menu/margherita_pizza.png",
  "Chicken Pizza":            "/images/menu/chicken_pizza.png",
  "Pepperoni Pizza":          "/images/menu/pepperoni_pizza.png",
  "BBQ Pizza":                "/images/menu/bbq_pizza.png",
  "Mokarrmal Signature Pizza":"/images/menu/signature_pizza.png",
  "Chicken Kabsa":            "/images/menu/chicken_kabsa.png",
  "Mandi":                    "/images/menu/mandi.png",
  "Biryani":                  "/images/menu/biryani.png",
  "Mixed Rice Platter":       "/images/menu/mixed_rice.png",
};

// ─── Items per category ────────────────────────────────────────────────────────
const categoryItems: Record<string, string[]> = {
  burgers: [
    "Classic Burger",
    "Double Cheese Burger",
    "Chicken Burger",
    "Spicy Burger",
    "Mokarrmal Special Burger",
  ],
  pizza: [
    "Margherita Pizza",
    "Chicken Pizza",
    "Pepperoni Pizza",
    "BBQ Pizza",
    "Mokarrmal Signature Pizza",
  ],
  rice: ["Chicken Kabsa", "Mandi", "Biryani", "Mixed Rice Platter"],
};

// ─── Premium Menu Card ────────────────────────────────────────────────────────
function MenuCard({
  itemKey,
  accent,
  index,
}: {
  itemKey: string;
  accent: string;
  index: number;
}) {
  const { t } = useLanguage();
  const item = t.items[itemKey];
  const image = itemImages[itemKey] ?? null;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mx = useSpring(x, { stiffness: 300, damping: 30 });
  const my = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(my, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  if (!item) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative cursor-pointer group"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "800px",
      }}
    >
      {/* Card shell */}
      <div
        className="relative rounded-[20px] overflow-hidden transition-shadow duration-500"
        style={{
          background: "linear-gradient(145deg, #141414 0%, #0a0a0a 100%)",
          border: `1px solid ${hovered ? accent + "50" : "#232323"}`,
          boxShadow: hovered
            ? `0 20px 60px ${accent}25, 0 0 0 1px ${accent}20`
            : "0 4px 24px rgba(0,0,0,0.6)",
          transition: "border 0.4s, box-shadow 0.4s",
        }}
      >
        {/* ── Food image area ── */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
          {image ? (
            <img
              src={image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ filter: hovered ? "brightness(0.95)" : "brightness(0.78)" }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `${accent}10` }}
            >
              <div
                className="w-24 h-24 rounded-full blur-3xl"
                style={{ background: `${accent}40` }}
              />
            </div>
          )}

          {/* Gradient fade at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          {/* Price badge – top right */}
          <div
            className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black tracking-wide"
            style={{
              background: `${accent}22`,
              color: accent,
              border: `1px solid ${accent}44`,
              backdropFilter: "blur(8px)",
            }}
          >
            {item.price}
          </div>

          {/* Shimmer line on hover */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              opacity: hovered ? 1 : 0,
            }}
            animate={hovered ? { scaleX: [0, 1] } : { scaleX: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* ── Text content ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col gap-2">
          <h3
            className="text-[15px] font-bold leading-tight tracking-tight"
            style={{ color: hovered ? "#fff" : "#e5e5e5" }}
          >
            {item.name}
          </h3>
          <p className="text-[11px] leading-relaxed line-clamp-2" style={{ color: "#666" }}>
            {item.desc}
          </p>

          {/* Status row */}
          <div className="flex items-center gap-1.5 mt-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: accent }}
            />
            <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: accent }}>
              Available
            </span>
          </div>
        </div>

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r-full transition-opacity duration-400"
          style={{ background: accent, opacity: hovered ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
}

// ─── Category Hero Card (Premium, no emoji) ──────────────────────────────────
function CategoryHeroCard({
  cat,
  index,
  label,
  onClick,
}: {
  cat: (typeof categoriesData)[0];
  index: number;
  label: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "1 / 1",
        minHeight: "260px",
        borderRadius: "50%",
        border: hovered
          ? "2px solid #C8A96E"
          : "2px solid #2a2a2a",
        boxShadow: hovered
          ? "0 0 0 6px #C8A96E18, 0 24px 60px rgba(0,0,0,0.8)"
          : "0 8px 32px rgba(0,0,0,0.5)",
        transition: "border 0.45s, box-shadow 0.45s, transform 0.5s",
        transform: hovered ? "translateY(-8px) scale(1.04)" : "translateY(0) scale(1)",
      }}
    >
      {/* Photo */}
      <img
        src={cat.image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.12)" : "scale(1.0)",
          transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
          filter: hovered ? "brightness(0.5)" : "brightness(0.4)",
        }}
      />

      {/* Radial dark overlay — darkest at edges for circular feel */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 80%)",
        }}
      />

      {/* Gold ring pulse on hover */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: hovered ? "inset 0 0 40px rgba(200,169,110,0.15)" : "none",
          transition: "box-shadow 0.5s",
        }}
      />

      {/* Centred content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {/* Number */}
        <span
          className="block text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
          style={{
            color: "#C8A96E",
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 0.4s",
          }}
        >
          0{index + 1}
        </span>

        {/* Category name */}
        <h3
          className="text-2xl md:text-3xl font-black text-white leading-tight"
          style={{ letterSpacing: "-0.02em" }}
        >
          {label}
        </h3>

        {/* Gold line */}
        <div
          className="mt-4 h-[1px] mx-auto"
          style={{
            background: "#C8A96E",
            width: hovered ? "40px" : "20px",
            opacity: 0.7,
            transition: "width 0.5s ease",
          }}
        />

        {/* Tagline — reveals on hover */}
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35 }}
          className="mt-3 text-[10px] uppercase tracking-[0.22em] font-medium"
          style={{ color: "#C8A96E99" }}
        >
          {cat.tagline}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Main Menu Component ───────────────────────────────────────────────────────
export default function Menu() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const activeCatData = categoriesData.find((c) => c.id === activeCategory);

  return (
    <section
      id="menu"
      className="relative min-h-screen bg-black py-16 md:py-28 px-4 md:px-12 lg:px-24 overflow-hidden z-20 -mt-[2px]"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-[0.05] blur-[100px] bg-white" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* ── Section Header ── */}
        <motion.div layout="position" className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-semibold uppercase tracking-[0.35em] mb-4"
            style={{ color: "#C8A96E" }}
          >
            What we serve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-5 tracking-tight"
          >
            {t.menuSection.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base text-neutral-500 max-w-lg mx-auto font-light leading-relaxed"
          >
            {t.menuSection.subtitle}
          </motion.p>
        </motion.div>

        {/* ── Views ── */}
        <AnimatePresence mode="wait">
          {/* VIEW 1 — Hero category cards */}
          {!activeCategory && (
            <motion.div
              key="hero-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-[2px]"
            >
              {categoriesData.map((cat, i) => (
                <CategoryHeroCard
                  key={cat.id}
                  cat={cat}
                  index={i}
                  label={t.categories[cat.id as keyof typeof t.categories]}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </motion.div>
          )}

          {/* VIEW 2 — Item grid */}
          {activeCategory && activeCatData && (
            <motion.div
              key={`item-grid-${activeCategory}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Tab bar */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {categoriesData.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={`tab-${cat.id}`}
                        onClick={() => setActiveCategory(cat.id)}
                        className="px-6 py-2.5 text-sm font-bold whitespace-nowrap transition-all duration-300"
                        style={
                          isActive
                            ? {
                                background: "transparent",
                                color: "#C8A96E",
                                borderBottom: "1px solid #C8A96E",
                                letterSpacing: "0.08em",
                              }
                            : {
                                background: "transparent",
                                color: "#555",
                                borderBottom: "1px solid transparent",
                                letterSpacing: "0.05em",
                              }
                        }
                      >
                        {t.categories[cat.id as keyof typeof t.categories]}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="px-5 py-2.5 text-sm font-medium transition-all duration-300"
                    style={{ background: "transparent", color: "#444", borderBottom: "1px solid transparent", letterSpacing: "0.05em" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#888";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#444";
                    }}
                  >
                    {language === "en" ? "← All" : "← كل"}
                  </button>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                  {categoryItems[activeCategory].map((itemKey, idx) => (
                    <MenuCard
                      key={itemKey}
                      itemKey={itemKey}
                      accent={activeCatData.accent}
                      index={idx}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
