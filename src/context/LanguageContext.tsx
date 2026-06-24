"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

type Translations = {
  [key in Language]: {
    nav: {
      home: string;
      menu: string;
      about: string;
      chefsMenu: string;
      contact: string;
      orderNow: string;
    };
    menuSection: {
      title: string;
      subtitle: string;
    };
    categories: {
      burgers: string;
      shawarma: string;
      pizza: string;
      rice: string;
      beverages: string;
      sides: string;
    };
    items: Record<string, { name: string; desc: string; price: string }>;
  };
};

const translations: Translations = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About Us",
      chefsMenu: "Chef's Menu",
      contact: "Contact",
      orderNow: "Order Now",
    },
    menuSection: {
      title: "Explore Our Menu",
      subtitle: "Choose your favorite category and discover our signature dishes.",
    },
    categories: {
      burgers: "Burgers",
      shawarma: "Shawarma",
      pizza: "Pizza",
      rice: "Rice Specials",
      beverages: "Beverages",
      sides: "Sides"
    },
    items: {
      "Classic Burger": { name: "Classic Burger", desc: "Angus beef, cheddar, lettuce, tomato, special sauce", price: "35 SAR" },
      "Double Cheese Burger": { name: "Double Cheese Burger", desc: "Double Angus beef, double cheddar, caramelized onions", price: "55 SAR" },
      "Chicken Burger": { name: "Chicken Burger", desc: "Crispy chicken breast, slaw, spicy mayo", price: "38 SAR" },
      "Spicy Burger": { name: "Spicy Burger", desc: "Angus beef, jalapenos, pepper jack, spicy sauce", price: "42 SAR" },
      "Mokarrmal Special Burger": { name: "Mokarrmal Special Burger", desc: "Wagyu beef, truffle mayo, aged cheddar, brioche", price: "65 SAR" },
      "Chicken Shawarma": { name: "Chicken Shawarma", desc: "Spiced chicken, garlic sauce, fresh pickles", price: "25 SAR" },
      "Beef Shawarma": { name: "Beef Shawarma", desc: "Premium beef, tahini, parsley, onions", price: "28 SAR" },
      "Mixed Shawarma": { name: "Mixed Shawarma", desc: "Chicken and beef, mixed sauces, fries", price: "32 SAR" },
      "Family Shawarma Platter": { name: "Family Shawarma Platter", desc: "Large assorted shawarma cuts, sides, dips", price: "120 SAR" },
      "Margherita Pizza": { name: "Margherita Pizza", desc: "San Marzano tomatoes, fresh mozzarella, basil", price: "45 SAR" },
      "Chicken Pizza": { name: "Chicken Pizza", desc: "Grilled chicken, mushrooms, garlic white sauce", price: "55 SAR" },
      "Pepperoni Pizza": { name: "Pepperoni Pizza", desc: "Premium beef pepperoni, mozzarella, oregano", price: "50 SAR" },
      "BBQ Pizza": { name: "BBQ Pizza", desc: "Smoked chicken, BBQ sauce, red onions", price: "55 SAR" },
      "Mokarrmal Signature Pizza": { name: "Mokarrmal Signature Pizza", desc: "Truffle paste, wild mushrooms, 24k gold leaf", price: "95 SAR" },
      "Chicken Kabsa": { name: "Chicken Kabsa", desc: "Traditional spiced rice, roasted half chicken", price: "40 SAR" },
      "Mandi": { name: "Mandi", desc: "Smoked basmati rice, tender lamb, mandi spices", price: "60 SAR" },
      "Biryani": { name: "Biryani", desc: "Fragrant saffron rice, marinated chicken", price: "45 SAR" },
      "Mixed Rice Platter": { name: "Mixed Rice Platter", desc: "Assorted premium rice varieties with mixed meats", price: "150 SAR" },
      "Mint Lemonade": { name: "Mint Lemonade", desc: "Fresh lemons, crushed mint, ice", price: "18 SAR" },
      "Saudi Champagne": { name: "Saudi Champagne", desc: "Apple juice, sparkling water, fresh fruits", price: "35 SAR" },
      "Fresh Orange Juice": { name: "Fresh Orange Juice", desc: "Freshly squeezed Valencia oranges", price: "20 SAR" },
      "Soft Drinks": { name: "Soft Drinks", desc: "Cola, Sprite, Fanta", price: "8 SAR" },
      "Truffle Fries": { name: "Truffle Fries", desc: "Crispy fries, truffle oil, parmesan", price: "25 SAR" },
      "Crispy Onion Rings": { name: "Crispy Onion Rings", desc: "Battered thick-cut onion rings, ranch dip", price: "18 SAR" },
      "Mozzarella Sticks": { name: "Mozzarella Sticks", desc: "Fried mozzarella, marinara dipping sauce", price: "22 SAR" },
      "Mokarrmal Salad": { name: "Mokarrmal Salad", desc: "Mixed greens, pomegranate, walnuts, balsamic", price: "35 SAR" }
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      menu: "القائمة",
      about: "من نحن",
      chefsMenu: "قائمة الشيف",
      contact: "اتصل بنا",
      orderNow: "اطلب الآن",
    },
    menuSection: {
      title: "استكشف قائمتنا",
      subtitle: "اختر فئتك المفضلة واكتشف أطباقنا المميزة.",
    },
    categories: {
      burgers: "برجر",
      shawarma: "شاورما",
      pizza: "بيتزا",
      rice: "أطباق الأرز",
      beverages: "مشروبات",
      sides: "أطباق جانبية"
    },
    items: {
      "Classic Burger": { name: "كلاسيك برجر", desc: "لحم أنجوس، شيدر، خس، طماطم، صوص خاص", price: "35 ريال" },
      "Double Cheese Burger": { name: "دبل تشيز برجر", desc: "لحم أنجوس مزدوج، شيدر مزدوج، بصل مكرمل", price: "55 ريال" },
      "Chicken Burger": { name: "برجر دجاج", desc: "صدر دجاج مقرمش، سلطة ملفوف، مايونيز حار", price: "38 ريال" },
      "Spicy Burger": { name: "برجر حار", desc: "لحم أنجوس، هلابينو، جبنة بيبر جاك، صوص حار", price: "42 ريال" },
      "Mokarrmal Special Burger": { name: "برجر مكرمّل الخاص", desc: "لحم واغيو، مايونيز الكمأة، شيدر معتق، بريوش", price: "65 ريال" },
      "Chicken Shawarma": { name: "شاورما دجاج", desc: "دجاج متبل، صوص ثوم، مخلل طازج", price: "25 ريال" },
      "Beef Shawarma": { name: "شاورما لحم", desc: "لحم فاخر، طحينة، بقدونس، بصل", price: "28 ريال" },
      "Mixed Shawarma": { name: "شاورما مشكلة", desc: "دجاج ولحم، صوصات مشكلة، بطاطس", price: "32 ريال" },
      "Family Shawarma Platter": { name: "طبق شاورما عائلي", desc: "تشكيلة شاورما كبيرة، أطباق جانبية، صوصات", price: "120 ريال" },
      "Margherita Pizza": { name: "بيتزا مارغريتا", desc: "طماطم سان مارزانو، موزاريلا طازجة، ريحان", price: "45 ريال" },
      "Chicken Pizza": { name: "بيتزا دجاج", desc: "دجاج مشوي، فطر، صوص ثوم أبيض", price: "55 ريال" },
      "Pepperoni Pizza": { name: "بيتزا بيبروني", desc: "بيبروني لحم فاخر، موزاريلا، أوريغانو", price: "50 ريال" },
      "BBQ Pizza": { name: "بيتزا باربكيو", desc: "دجاج مدخن، صوص باربكيو، بصل أحمر", price: "55 ريال" },
      "Mokarrmal Signature Pizza": { name: "بيتزا مكرمّل المميزة", desc: "معجون الكمأة، فطر بري، ورق ذهب عيار 24", price: "95 ريال" },
      "Chicken Kabsa": { name: "كبسة دجاج", desc: "أرز تقليدي مبهر، نصف دجاجة محمرة", price: "40 ريال" },
      "Mandi": { name: "مندي", desc: "أرز بسمتي مدخن، لحم غنم طري، بهارات المندي", price: "60 ريال" },
      "Biryani": { name: "برياني", desc: "أرز زعفران معطر، دجاج متبل", price: "45 ريال" },
      "Mixed Rice Platter": { name: "طبق أرز مشكل", desc: "تشكيلة أرز فاخرة مع لحوم مشكلة", price: "150 ريال" },
      "Mint Lemonade": { name: "ليمون بالنعناع", desc: "ليمون طازج، نعناع مطحون، ثلج", price: "18 ريال" },
      "Saudi Champagne": { name: "شامبانيا سعودية", desc: "عصير تفاح، مياه غازية، فواكه طازجة", price: "35 ريال" },
      "Fresh Orange Juice": { name: "عصير برتقال طازج", desc: "برتقال فالنسيا معصور طازجاً", price: "20 ريال" },
      "Soft Drinks": { name: "مشروبات غازية", desc: "كولا، سبرايت، فانتا", price: "8 ريال" },
      "Truffle Fries": { name: "بطاطس الكمأة", desc: "بطاطس مقرمشة، زيت الكمأة، بارميزان", price: "25 ريال" },
      "Crispy Onion Rings": { name: "حلقات بصل مقرمشة", desc: "حلقات بصل سميكة مقلية، صوص رانش", price: "18 ريال" },
      "Mozzarella Sticks": { name: "أصابع الموزاريلا", desc: "موزاريلا مقلية، صوص مارينارا", price: "22 ريال" },
      "Mokarrmal Salad": { name: "سلطة مكرمّل", desc: "خضار مشكلة، رمان، جوز، بلسميك", price: "35 ريال" }
    }
  },
};

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  t: Translations[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      <div dir={language === "ar" ? "rtl" : "ltr"}>{children}</div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
