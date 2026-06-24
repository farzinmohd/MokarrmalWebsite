"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// Define categories with their image fallbacks
const categoriesData = [
  { id: "burgers", image: "/images/menu/burg.jpeg" },
  { id: "shawarma", image: null }, // Falls back to gold glow
  { id: "pizza", image: "/images/menu/pizz.jpeg" },
  { id: "rice", image: "/images/menu/rice.jpeg" },
  { id: "beverages", image: null },
  { id: "sides", image: null }
];

// Define items mapping
const categoryItems: Record<string, string[]> = {
  burgers: ["Classic Burger", "Double Cheese Burger", "Chicken Burger", "Spicy Burger", "Mokarrmal Special Burger"],
  shawarma: ["Chicken Shawarma", "Beef Shawarma", "Mixed Shawarma", "Family Shawarma Platter"],
  pizza: ["Margherita Pizza", "Chicken Pizza", "Pepperoni Pizza", "BBQ Pizza", "Mokarrmal Signature Pizza"],
  rice: ["Chicken Kabsa", "Mandi", "Biryani", "Mixed Rice Platter"],
  beverages: ["Mint Lemonade", "Saudi Champagne", "Fresh Orange Juice", "Soft Drinks"],
  sides: ["Truffle Fries", "Crispy Onion Rings", "Mozzarella Sticks", "Mokarrmal Salad"]
};

// Reusable 3D Menu Card for individual items
function MenuCard({ itemKey, fallbackImage }: { itemKey: string; fallbackImage: string | null }) {
  const { t } = useLanguage();
  const item = t.items[itemKey];
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!item) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-[4/5] rounded-2xl cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-neutral-800 to-black border border-neutral-700/50 shadow-2xl overflow-hidden group-hover:border-gold/30 transition-colors duration-500">
        
        {/* Image Section - Top 60% */}
        <div className="absolute inset-x-0 top-0 h-[60%] overflow-hidden bg-neutral-900">
           {fallbackImage ? (
             <img src={fallbackImage} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" />
           ) : (
             <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gold/10 blur-2xl" />
             </div>
           )}
           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* Text Section - Bottom 40% */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] p-6 flex flex-col justify-end bg-transparent z-10" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
          <p className="text-xs text-neutral-400 mb-4 line-clamp-2">{item.desc}</p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-medium text-white">{item.price}</span>
            <button className="px-4 py-2 bg-neutral-800 border border-neutral-600 text-white rounded-full text-xs font-medium hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
              {t.nav.orderNow}
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function Menu() {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="menu" className="relative min-h-screen bg-black py-32 px-4 md:px-12 lg:px-24 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto min-h-[600px] flex flex-col">
        
        {/* Header Section */}
        <motion.div 
          layout="position"
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">{t.menuSection.title}</h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
            {t.menuSection.subtitle}
          </p>
        </motion.div>

        {/* View 1: Category Selection Grid */}
        <AnimatePresence mode="wait">
          {!activeCategory && (
            <motion.div 
              key="category-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1 place-content-center"
            >
              {categoriesData.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  layoutId={`category-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className="relative aspect-square rounded-full cursor-pointer group flex flex-col items-center justify-center overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-gold/50 transition-colors duration-500 z-20" />
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-neutral-900 shadow-[0_0_40px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-shadow duration-500">
                    {cat.image ? (
                      <img src={cat.image} alt={t.categories[cat.id as keyof typeof t.categories]} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gold/10 blur-xl group-hover:bg-gold/20 transition-colors duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                  </div>
                  <h3 className="relative z-30 text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg">
                    {t.categories[cat.id as keyof typeof t.categories]}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* View 2: Detailed Menu */}
          {activeCategory && (
            <motion.div
              key="detailed-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1"
            >
              {/* Horizontal Category Nav */}
              <div className="flex justify-center mb-12">
                <div className="flex overflow-x-auto space-x-2 rtl:space-x-reverse pb-4 no-scrollbar max-w-full">
                  {categoriesData.map((cat) => (
                    <button
                      key={`nav-${cat.id}`}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        activeCategory === cat.id 
                          ? "bg-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                          : "bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                    >
                      {t.categories[cat.id as keyof typeof t.categories]}
                    </button>
                  ))}
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className="px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap text-neutral-400 hover:text-white border border-neutral-800 hover:bg-neutral-900 transition-all duration-300 ml-4 rtl:ml-0 rtl:mr-4"
                  >
                    {language === "en" ? "← Back to Categories" : "العودة للفئات →"}
                  </button>
                </div>
              </div>

              {/* Items Grid mapped directly from selected category */}
              <motion.div 
                layoutId={`category-${activeCategory}`}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-[1000px] flex-1 content-start"
              >
                <AnimatePresence mode="popLayout">
                  {categoryItems[activeCategory].map((itemKey) => (
                    <MenuCard 
                      key={itemKey} 
                      itemKey={itemKey} 
                      fallbackImage={categoriesData.find(c => c.id === activeCategory)?.image || null} 
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
