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
import { Footprints } from "lucide-react";

// ─── Category metadata ────────────────────────────────────────────────────────
const categoriesData = [
  {
    id: "burgers",
    image: "/media/burger.jpeg",
    accent: "#C8A96E",
    label: "Signature Burgers",
    tagline: "Crafted with prime Angus & Wagyu beef",
  },
  {
    id: "pizza",
    image: "/media/pizza.png",
    accent: "#C8A96E",
    label: "Artisan Pizzas",
    tagline: "Stone-baked in our wood-fired oven",
  },
  {
    id: "rice",
    image: "/media/rice.png",
    accent: "#C8A96E",
    label: "Heritage Rice",
    tagline: "Traditional Arabian recipes, perfected",
  },
];

// ─── Per-item image map ────────────────────────────────────────────────────────
const itemImages: Record<string, string> = {
  // ── Burgers ──────────────────────────────────────────────────────────────────
  "Chicken Beef Burger":         "/images/menu/burger_1.png",
  "Chicken Beef Double Burger":  "/images/menu/burger_2.png",
  "Zinger Double Burger":        "/images/menu/burger_3.png",
  "Fish Burger":                 "/images/menu/burger_4.png",
  "Shrimp Burger":               "/images/menu/burger_5.png",
  "Mushroom Burger":             "/media/mushroom_burger.png",
  "Fish Fillet Burger":          "/media/fish_fillet_burger.png",
  "Lamb Burger":                 "/media/lamb_burger.png",
  "Smash Burger":                "/media/smash_burger.png",
  "Truffle Burger":              "/media/truffle_burger.png",
  // ── Pizzas ───────────────────────────────────────────────────────────────────
  "Vegetable Pizza":             "/images/menu/11.png",
  "Pineapple Pizza":             "/images/menu/12.png",
  "Nutella Pizza":             "/images/menu/13_side_angle_resized.png",
  "Super Pepperoni":                   "/images/menu/14.png",
  "Chicken BBQ":                 "/images/menu/21.png",
  "Cheese Pizza":                "/images/menu/22.png",
  "Minced Beef Pizza":           "/images/menu/23.png",
  "Chicken Roanch Pizza":        "/images/menu/24.png",
  "Mushroom Pizza":              "/media/mushroom_pizza.png",
  "Shawarma Pizza":              "/media/shawarma_pizza.png",
  // ── Rice ─────────────────────────────────────────────────────────────────────
  "Grilled Chicken With Rice":   "/images/menu/rice_1.png",
  "Grilled Fish With Rice":      "/images/menu/rice_2.png",
  "Chicken Biryani":             "/images/menu/rice_3.png",
  "Beef Biryani":                "/images/menu/rice_4.png",
  "Shrimp Biryani":              "/images/menu/Shrimp biryani.jpeg",
  "Grill Shrimp With Rice":      "/images/menu/Grill shrimp with rice.jpeg",
  "Mutton Madhooth":             "/images/menu/Mutton Madhooth.jpeg",
  "Chicken Madhooth":            "/images/menu/Chicken madhooth.jpeg",
  "Chicken Kabsa":               "/images/menu/Chicken kabsa.jpeg",
  "Mandi Chicken With Rice":     "/images/menu/Mandhi chicken with rice.jpeg",
};

// ─── Items per category ────────────────────────────────────────────────────────
const categoryItems: Record<string, string[]> = {
  burgers: [
    "Chicken Beef Burger",
    "Chicken Beef Double Burger",
    "Zinger Double Burger",
    "Fish Burger",
    "Shrimp Burger",
  ],
  pizza: [
    "Vegetable Pizza",
    "Pineapple Pizza",
    "Nutella Pizza",
    "Super Pepperoni",
    "Chicken BBQ",
    "Cheese Pizza",
    "Minced Beef Pizza",
    "Chicken Roanch Pizza",
  ],
  rice: [
    "Grilled Chicken With Rice",
    "Grilled Fish With Rice",
    "Chicken Biryani",
    "Beef Biryani",
    "Shrimp Biryani",
    "Grill Shrimp With Rice",
    "Mutton Madhooth",
    "Chicken Madhooth",
    "Chicken Kabsa",
    "Mandi Chicken With Rice",
  ],
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
        <div className="relative w-full overflow-hidden" style={{ height: "260px" }}>
          {image ? (
            <img
              src={image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              style={{ objectPosition: "center 35%" }}
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
          <div className="absolute inset-x-0 bottom-[-8px] h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          {/* Action icons */}
          <div className="absolute top-6 right-4 flex flex-col gap-2 z-30">
            <div 
              className="w-12 h-12 rounded-full bg-black flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ border: "2px solid #EAB308" }}
            >
              <span className="text-[11px] font-black text-[#EAB308] leading-none">
                {(item.calories || "547 kcal").replace(" calories", "").replace(" kcal", "")}
              </span>
              <span className="text-[8px] uppercase font-bold text-neutral-400 leading-none mt-0.5">
                calories
              </span>
            </div>
            <div 
              className="w-12 h-12 rounded-full bg-black flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              style={{ border: "2px solid #EAB308" }}
            >
              <Footprints size={14} className="text-[#EAB308]" />
              <span className="text-[8px] font-bold text-white leading-none mt-1.5 whitespace-nowrap">
                {(item.walkTime || "110 minutes").replace(" minutes", " min").replace(" minute", " min")}
              </span>
            </div>
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
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col">
              <h3
                className="text-[15px] font-bold leading-tight tracking-tight"
                style={{ color: hovered ? "#fff" : "#e5e5e5" }}
              >
                {item.name}
              </h3>
              {item.subName && (
                <span 
                  className="text-[15px] font-bold mt-1"
                  style={{ color: hovered ? "#fff" : "#e5e5e5" }}
                >
                  {item.subName}
                </span>
              )}
            </div>
            {item.price && (
              <div className="flex flex-col items-end gap-3 mt-1" style={{ transform: "translateY(6px)" }}>
                <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-[#EAB308] text-black whitespace-nowrap">
                  {item.price}
                </span>
                <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-[#EAB308] text-black whitespace-nowrap">
                  {item.price2 || item.price}
                </span>
              </div>
            )}
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
        minHeight: "200px",
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
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
