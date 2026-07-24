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
      pizza: string;
      rice: string;
      shawarma: string;
      beverages: string;
      sides: string;
    };
    items: Record<
      string,
      { 
        name: string; 
        desc: string; 
        price: string; 
        subName?: string; 
        price2?: string; 
        calories?: string; 
        walkTime?: string; 
      }
    >;
    footer: {
      tagline: string;
      location: string;
      locationAddress: string;
      hours: string;
      contact: string;
      callUs: string;
      whatsApp: string;
      getDirections: string;
      monThu: string;
      friday: string;
      satSun: string;
      copyright: string;
      websiteBy: string;
    };
    aboutUs: {
      title: string;
      subtitle: string;
      storyTitle: string;
      storyText1: string;
      storyText2: string;
      stats: {
        quality: string;
        qualityLabel: string;
        experience: string;
        experienceLabel: string;
      };
      card1: { label: string; title: string; desc: string };
      card2: { label: string; title: string; tags: string[] };
      card3: { val1: string; label1: string; val2: string; label2: string; val3: string; label3: string };
      reviews: { name: string; rating: number; comment: string }[];
      gallery: { num: string; title: string; subtitle: string }[];
    };
    chefsSection: {
      title: string;
      dishes: { name: string; desc: string; discover: string }[];
    };
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
      pizza: "Pizza",
      rice: "Rice Specials",
      shawarma: "Shawarma",
      beverages: "Beverages",
      sides: "Sides",
    },
    items: {
      "Chicken Beef Burger": { 
        name: "Chicken Beef Burger", 
        subName: "برجر دجاج / لحم", 
        desc: "A delicious combination of chicken and beef flavors", 
        price: "18.50 SAR", 
        calories: "450 kcal", 
        walkTime: "90 minutes" 
      },
      "Chicken Beef Double Burger": { 
        name: "Chicken Beef Double Burger", 
        subName: "برجر دجاج / لحم دبل", 
        desc: "Double the patties, double the flavor", 
        price: "28.50 SAR", 
        calories: "820 kcal", 
        walkTime: "164 minutes" 
      },
      "Zinger Double Burger": { 
        name: "Zinger Double Burger", 
        subName: "زنجر دبل برجر", 
        desc: "Spicy double chicken zinger for a fiery kick", 
        price: "30.50 SAR", 
        calories: "750 kcal", 
        walkTime: "150 minutes" 
      },
      "Fish Burger": { 
        name: "Fish Burger", 
        subName: "برجر سمك", 
        desc: "Crispy fish fillet with fresh tartar sauce", 
        price: "22.50 SAR", 
        calories: "420 kcal", 
        walkTime: "84 minutes" 
      },
      "Shrimp Burger": { 
        name: "Shrimp Burger", 
        subName: "برجر جمبري", 
        desc: "Succulent shrimp patty with our signature sauce", 
        price: "23.50 SAR", 
        calories: "360 kcal", 
        walkTime: "72 minutes" 
      },
      "Chicken Shawarma": { name: "Chicken Shawarma", desc: "Spiced chicken, garlic sauce, fresh pickles", price: "25 SAR" },
      "Beef Shawarma": { name: "Beef Shawarma", desc: "Premium beef, tahini, parsley, onions", price: "28 SAR" },
      "Mixed Shawarma": { name: "Mixed Shawarma", desc: "Chicken and beef, mixed sauces, fries", price: "32 SAR" },
      "Family Shawarma Platter": { name: "Family Shawarma Platter", desc: "Large assorted shawarma cuts, sides, dips", price: "120 SAR" },
      "Vegetable Pizza": { 
        name: "Vegetable Pizza", 
        subName: "بيتزا خضار", 
        desc: "Fresh garden vegetables, mozzarella, tomato sauce", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "547 kcal",
        walkTime: "110 minutes"
      },
      "Pineapple Pizza": { 
        name: "Pineapple Pizza", 
        subName: "بيتزا أناناس", 
        desc: "Sweet pineapple, savory toppings, mozzarella, tomato sauce", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "350 kcal",
        walkTime: "70 minutes"
      },
      "Nutella Pizza": { 
        name: "Nutella Pizza", 
        subName: "نوتيلا", 
        desc: "Rich Nutella spread, melted over a fresh pizza crust", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "720 kcal",
        walkTime: "145 minutes"
      },
      "Super Pepperoni": { 
        name: "Super Pepperoni", 
        subName: "سوبر بيبروني", 
        desc: "Extra pepperoni, mozzarella, and our signature tomato sauce", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "630 kcal",
        walkTime: "126 minutes"
      },
      "Chicken BBQ": { 
        name: "Chicken BBQ", 
        subName: "باربكيو دجاج", 
        desc: "Grilled chicken with sweet BBQ sauce and red onions", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "756 kcal",
        walkTime: "151 minutes"
      },
      "Cheese Pizza": { 
        name: "Cheese Pizza", 
        subName: "بيتزا جبنة", 
        desc: "Classic cheese pizza with our special blend of mozzarella", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "610 kcal",
        walkTime: "122 minutes"
      },
      "Minced Beef Pizza": { 
        name: "Minced Beef Pizza", 
        subName: "بيتزا لحم مفروم", 
        desc: "Spiced minced beef, mozzarella, and fresh herbs", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "684 kcal",
        walkTime: "137 minutes"
      },
      "Chicken Roanch Pizza": { 
        name: "Chicken Roanch Pizza", 
        subName: "بيتزا دجاج رانش", 
        desc: "Grilled chicken topped with creamy ranch sauce", 
        price: "35.50 SAR", 
        price2: "45.50 SAR",
        calories: "735 kcal",
        walkTime: "147 minutes"
      },
      "Grilled Chicken With Rice": { 
        name: "Grilled Chicken With Rice", 
        subName: "دجاج الفحم مع أرز", 
        desc: "Authentic grilled chicken served with aromatic rice", 
        price: "30.50 SAR", 
        calories: "620 kcal", 
        walkTime: "124 minutes" 
      },
      "Grilled Fish With Rice": { 
        name: "Grilled Fish With Rice", 
        subName: "سمك الفحم مع أرز", 
        desc: "Freshly grilled fish served over premium rice", 
        price: "45.50 SAR", 
        calories: "470 kcal", 
        walkTime: "94 minutes" 
      },
      "Chicken Biryani": { 
        name: "Chicken Biryani", 
        subName: "برياني دجاج", 
        desc: "Classic chicken biryani cooked with traditional spices", 
        price: "20.50 SAR", 
        price2: "30.50 SAR", 
        calories: "580 kcal", 
        walkTime: "116 minutes" 
      },
      "Beef Biryani": { 
        name: "Beef Biryani", 
        subName: "برياني لحم", 
        desc: "Tender beef pieces layered with fragrant basmati rice", 
        price: "30.50 SAR", 
        price2: "40.50 SAR", 
        calories: "630 kcal", 
        walkTime: "126 minutes" 
      },
      "Shrimp Biryani": { 
        name: "Shrimp Biryani", 
        subName: "برياني جمبري", 
        desc: "Flavorful shrimp biryani with rich coastal spices", 
        price: "45.50 SAR", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      "Grill Shrimp With Rice": { 
        name: "Grill Shrimp With Rice", 
        subName: "جمبري مع أرز", 
        desc: "Perfectly grilled shrimp served alongside spiced rice", 
        price: "45.50 SAR", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      "Mutton Madhooth": { 
        name: "Mutton Madhooth", 
        subName: "لحم مضغوط", 
        desc: "Pressure-cooked mutton rice bursting with rich flavors", 
        price: "55.50 SAR", 
        calories: "716 kcal", 
        walkTime: "143 minutes" 
      },
      "Chicken Madhooth": { 
        name: "Chicken Madhooth", 
        subName: "دجاج مضغوط", 
        desc: "Pressure-cooked chicken and rice with authentic spices", 
        price: "30.50 SAR", 
        price2: "35.50 SAR", 
        calories: "620 kcal", 
        walkTime: "124 minutes" 
      },
      "Chicken Kabsa": { 
        name: "Chicken Kabsa", 
        subName: "كبسة دجاج", 
        desc: "Traditional spiced kabsa rice topped with roasted chicken", 
        price: "20.50 SAR", 
        price2: "30.50 SAR", 
        calories: "540 kcal", 
        walkTime: "108 minutes" 
      },
      "Mandi Chicken With Rice": { 
        name: "Mandi Chicken With Rice", 
        subName: "مندي دجاج مع أرز", 
        desc: "Slow-roasted mandi chicken on a bed of smoked rice", 
        price: "30.50 SAR", 
        price2: "35.50 SAR", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      // ── New Burgers ──
      "Mushroom Burger":          { name: "Mushroom Burger", desc: "Sauteed portobello mushrooms, Swiss cheese, garlic aioli, brioche bun", price: "45 SAR" },
      "Fish Fillet Burger":       { name: "Fish Fillet Burger", desc: "Crispy golden sea bass fillet, tartar sauce, shredded lettuce", price: "42 SAR" },
      "Lamb Burger":              { name: "Lamb Burger", desc: "Spiced lamb patty, caramelized onions, mint yogurt, rocket", price: "50 SAR" },
      "Smash Burger":             { name: "Smash Burger", desc: "Double smashed crispy-edged patties, American cheese, pickles, special sauce", price: "48 SAR" },
      "Truffle Burger":           { name: "Truffle Burger", desc: "Wagyu beef, black truffle shavings, aged brie, truffle aioli, charcoal bun", price: "75 SAR" },
      // ── New Pizzas ──
      "Meat Feast Pizza":         { name: "Meat Feast Pizza", desc: "Beef pepperoni, spiced lamb, grilled chicken, premium mozzarella", price: "65 SAR" },
      "Four Cheese Pizza":        { name: "Four Cheese Pizza", desc: "Mozzarella, aged parmesan, smoked gouda, cheddar, honey drizzle", price: "55 SAR" },
      "Seafood Pizza":            { name: "Seafood Pizza", desc: "Tiger prawns, calamari, baby clams, garlic cream sauce, fresh herbs", price: "70 SAR" },
      "Mushroom Pizza":           { name: "Mushroom Pizza", desc: "Wild porcini, shiitake, oyster mushrooms, truffle oil, fresh thyme", price: "55 SAR" },
      "Shawarma Pizza":           { name: "Shawarma Pizza", desc: "Shawarma-spiced chicken, garlic toum sauce, pickled vegetables, parsley", price: "60 SAR" },
      // ── New Rice ──
      "Lamb Kabsa":               { name: "Lamb Kabsa", desc: "Slow-roasted spiced lamb on saffron basmati, raisins, almonds", price: "65 SAR" },
      "Seafood Rice":             { name: "Seafood Rice", desc: "Saffron basmati, tiger prawns, grilled fish, calamari, fresh herbs", price: "70 SAR" },
      "Lamb Ouzi":                { name: "Lamb Ouzi", desc: "Whole slow-roasted lamb on spiced rice, pine nuts, almonds, raisins", price: "180 SAR" },
      "Machboos":                 { name: "Machboos", desc: "Gulf-spiced basmati with slow-braised lamb, dried limes, rose water", price: "65 SAR" },
      "Haneeth":                  { name: "Haneeth", desc: "Yemeni clay-pot slow-cooked spiced lamb on fragrant basmati rice", price: "70 SAR" },
      "Saffron Rice Platter":     { name: "Saffron Rice Platter", desc: "Golden saffron basmati, grilled chicken, pine nuts, crispy fried onions", price: "75 SAR" },
      "Mint Lemonade": { name: "Mint Lemonade", desc: "Fresh lemons, crushed mint, ice", price: "18 SAR" },
      "Saudi Champagne": { name: "Saudi Champagne", desc: "Apple juice, sparkling water, fresh fruits", price: "35 SAR" },
      "Fresh Orange Juice": { name: "Fresh Orange Juice", desc: "Freshly squeezed Valencia oranges", price: "20 SAR" },
      "Soft Drinks": { name: "Soft Drinks", desc: "Cola, Sprite, Fanta", price: "8 SAR" },
      "Truffle Fries": { name: "Truffle Fries", desc: "Crispy fries, truffle oil, parmesan", price: "25 SAR" },
      "Crispy Onion Rings": { name: "Crispy Onion Rings", desc: "Battered thick-cut onion rings, ranch dip", price: "18 SAR" },
      "Mozzarella Sticks": { name: "Mozzarella Sticks", desc: "Fried mozzarella, marinara dipping sauce", price: "22 SAR" },
      "Mokarrmal Salad": { name: "Mokarmal Salad", desc: "Mixed greens, pomegranate, walnuts, balsamic", price: "35 SAR" }
    },
    footer: {
      tagline: "A luxury fast-food experience redefining taste and quality in Saudi Arabia.",
      location: "Location",
      locationAddress: "First Ring Road, Near The Clock Towers, Makkah 24231, Saudi Arabia",
      hours: "Opening Hours",
      contact: "Contact",
      callUs: "Call Us",
      whatsApp: "WhatsApp",
      getDirections: "Get Directions",
      monThu: "Mon - Thu:",
      friday: "Friday:",
      satSun: "Sat - Sun:",
      copyright: "© 2026 Mokarmal. All rights reserved.",
      websiteBy: "Website by",
    },
    aboutUs: {
      title: "Our Story",
      subtitle: "The Mokarmal Legacy",
      storyTitle: "Redefining Fast Food with Uncompromising Luxury",
      storyText1: "Born in the heart of Makkah, Mokarmal was founded on a simple yet revolutionary idea: fast food doesn't have to compromise on quality. We source only the finest ingredients—from premium Wagyu beef to authentic Italian truffles—to craft an experience that is both quick and profoundly satisfying.",
      storyText2: "Our culinary team merges traditional Saudi hospitality with modern, innovative cooking techniques. Every dish is a masterpiece, designed to offer a cinematic journey of flavor that you won't find anywhere else.",
      stats: {
        quality: "100%",
        qualityLabel: "Premium Ingredients",
        experience: "5★",
        experienceLabel: "Luxury Experience",
      },
      card1: {
        label: "Founded in Makkah",
        title: "Born From Passion",
        desc: "A vision to bring world-class luxury dining to the heart of Saudi Arabia, served fast and without compromise."
      },
      card2: {
        label: "Our Commitment",
        title: "Zero Compromise Ingredients",
        tags: ["Wagyu Beef", "Italian Truffle", "Fresh Daily"]
      },
      card3: {
        val1: "100%", label1: "Premium Ingredients",
        val2: "5★", label2: "Rated Experience",
        val3: "Halal", label3: "Certified"
      },
      reviews: [
        {
          name: "Abdulrahman Al-Fahad",
          rating: 5,
          comment: "Absolutely the best Wagyu burger in Makkah. The truffle mayo is incredibly rich, and the presentation is outstanding. A true premium experience!"
        },
        {
          name: "Sarah Mitchell",
          rating: 5,
          comment: "The Alfahm Mandi is cooked to perfection—super tender meat and highly aromatic rice. The luxury dark setting is stunning."
        },
        {
          name: "Fahad K.",
          rating: 4,
          comment: "A unique fusion of fast dining and high-end luxury. The atmosphere is top-notch and the Truffle Pizza is absolutely brilliant."
        }
      ],
      gallery: [
        {
          num: "01",
          title: "The Vibe",
          subtitle: "Experience the lively heart of our open kitchen, where authentic flavors come to life daily."
        },
        {
          num: "02",
          title: "The Space",
          subtitle: "Settle into a refined, comfortable dining room crafted to host memorable family gatherings."
        },
        {
          num: "03",
          title: "The Craft",
          subtitle: "Witness clean architectural details and golden lighting, elevating fast food into luxury."
        }
      ]
    },
    chefsSection: {
      title: "Chef's Recommendations",
      dishes: [
        { name: "Zinger Double Burger", desc: "Spicy double chicken zinger for a fiery kick", discover: "Discover" },
        { name: "Mutton Madhooth", desc: "Pressure-cooked mutton rice bursting with rich flavors", discover: "Discover" },
        { name: "Chicken BBQ", desc: "Grilled chicken with sweet BBQ sauce and red onions", discover: "Discover" }
      ]
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
      pizza: "بيتزا",
      rice: "أطباق الأرز",
      shawarma: "شاورما",
      beverages: "مشروبات",
      sides: "أطباق جانبية",
    },
    items: {
      "Chicken Beef Burger": { 
        name: "برجر دجاج / لحم", 
        subName: "Chicken Beef Burger", 
        desc: "مزيج لذيذ من نكهات الدجاج واللحم", 
        price: "18.50 ريال", 
        calories: "450 kcal", 
        walkTime: "90 minutes" 
      },
      "Chicken Beef Double Burger": { 
        name: "برجر دجاج / لحم دبل", 
        subName: "Chicken Beef Double Burger", 
        desc: "شريحتان مضاعفتان، نكهة مضاعفة", 
        price: "28.50 ريال", 
        calories: "820 kcal", 
        walkTime: "164 minutes" 
      },
      "Zinger Double Burger": { 
        name: "زنجر دبل برجر", 
        subName: "Zinger Double Burger", 
        desc: "زنجر دجاج مزدوج حار لنكهة نارية", 
        price: "30.50 ريال", 
        calories: "750 kcal", 
        walkTime: "150 minutes" 
      },
      "Fish Burger": { 
        name: "برجر سمك", 
        subName: "Fish Burger", 
        desc: "فيليه سمك مقرمش مع صلصة التارتار الطازجة", 
        price: "22.50 ريال", 
        calories: "420 kcal", 
        walkTime: "84 minutes" 
      },
      "Shrimp Burger": { 
        name: "برجر جمبري", 
        subName: "Shrimp Burger", 
        desc: "شريحة جمبري عصارية مع صلصتنا المميزة", 
        price: "23.50 ريال", 
        calories: "360 kcal", 
        walkTime: "72 minutes" 
      },
      "Chicken Shawarma": { name: "شاورما دجاج", desc: "دجاج متبل، صوص ثوم، مخلل طازج", price: "25 ريال" },
      "Beef Shawarma": { name: "شاورما لحم", desc: "لحم فاخر، طحينة، بقدونس، بصل", price: "28 ريال" },
      "Mixed Shawarma": { name: "شاورما مشكلة", desc: "دجاج ولحم، صوصات مشكلة، بطاطس", price: "32 ريال" },
      "Family Shawarma Platter": { name: "طبق شاورما عائلي", desc: "تشكيلة شاورما كبيرة، أطباق جانبية، صوصات", price: "120 ريال" },
      "Vegetable Pizza": { 
        name: "بيتزا خضار", 
        subName: "Vegetable Pizza", 
        desc: "خضار مشكلة طازجة، موزاريلا، صلصة طماطم", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "547 kcal",
        walkTime: "110 minutes"
      },
      "Pineapple Pizza": { 
        name: "بيتزا أناناس", 
        subName: "Pineapple Pizza", 
        desc: "أناناس حلو، إضافات مالحة، موزاريلا، صلصة طماطم", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "350 kcal",
        walkTime: "70 minutes"
      },
      "Nutella Pizza": { 
        name: "نوتيلا", 
        subName: "Nutella Pizza", 
        desc: "شوكولاتة نوتيلا الغنية، مذابة على عجينة بيتزا طازجة", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "720 kcal",
        walkTime: "145 minutes"
      },
      "Super Pepperoni": { 
        name: "سوبر بيبروني", 
        subName: "Super Pepperoni", 
        desc: "بيبروني إضافي، موزاريلا، وصلصة الطماطم المميزة", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "630 kcal",
        walkTime: "126 minutes"
      },
      "Chicken BBQ": { 
        name: "باربكيو دجاج", 
        subName: "Chicken BBQ", 
        desc: "دجاج مشوي مع صلصة باربكيو حلوة وبصل أحمر", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "756 kcal",
        walkTime: "151 minutes"
      },
      "Cheese Pizza": { 
        name: "بيتزا جبنة", 
        subName: "Cheese Pizza", 
        desc: "بيتزا الجبنة الكلاسيكية مع مزيجنا الخاص من الموزاريلا", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "610 kcal",
        walkTime: "122 minutes"
      },
      "Minced Beef Pizza": { 
        name: "بيتزا لحم مفروم", 
        subName: "Minced Beef Pizza", 
        desc: "لحم مفروم متبل، موزاريلا، وأعشاب طازجة", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "684 kcal",
        walkTime: "137 minutes"
      },
      "Chicken Roanch Pizza": { 
        name: "بيتزا دجاج رانش", 
        subName: "Chicken Roanch Pizza", 
        desc: "دجاج مشوي مغطى بصلصة الرانش الكريمية", 
        price: "35.50 ريال", 
        price2: "45.50 ريال",
        calories: "735 kcal",
        walkTime: "147 minutes"
      },
      "Grilled Chicken With Rice": { 
        name: "دجاج الفحم مع أرز", 
        subName: "Grilled Chicken With Rice", 
        desc: "دجاج مشوي أصيل يقدم مع أرز عطري", 
        price: "30.50 ريال", 
        calories: "620 kcal", 
        walkTime: "124 minutes" 
      },
      "Grilled Fish With Rice": { 
        name: "سمك الفحم مع أرز", 
        subName: "Grilled Fish With Rice", 
        desc: "سمك مشوي طازج يقدم فوق أرز فاخر", 
        price: "45.50 ريال", 
        calories: "470 kcal", 
        walkTime: "94 minutes" 
      },
      "Chicken Biryani": { 
        name: "برياني دجاج", 
        subName: "Chicken Biryani", 
        desc: "برياني الدجاج الكلاسيكي المطبوخ بالتوابل التقليدية", 
        price: "20.50 ريال", 
        price2: "30.50 ريال", 
        calories: "580 kcal", 
        walkTime: "116 minutes" 
      },
      "Beef Biryani": { 
        name: "برياني لحم", 
        subName: "Beef Biryani", 
        desc: "قطع لحم طرية مع أرز البسمتي العطري", 
        price: "30.50 ريال", 
        price2: "40.50 ريال", 
        calories: "630 kcal", 
        walkTime: "126 minutes" 
      },
      "Shrimp Biryani": { 
        name: "برياني جمبري", 
        subName: "Shrimp Biryani", 
        desc: "برياني جمبري لذيذ مع توابل غنية", 
        price: "45.50 ريال", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      "Grill Shrimp With Rice": { 
        name: "جمبري مع أرز", 
        subName: "Grill Shrimp With Rice", 
        desc: "جمبري مشوي بعناية يقدم مع الأرز المتبل", 
        price: "45.50 ريال", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      "Mutton Madhooth": { 
        name: "لحم مضغوط", 
        subName: "Mutton Madhooth", 
        desc: "مضغوط اللحم المطبوخ ببطء بنكهات غنية", 
        price: "55.50 ريال", 
        calories: "716 kcal", 
        walkTime: "143 minutes" 
      },
      "Chicken Madhooth": { 
        name: "دجاج مضغوط", 
        subName: "Chicken Madhooth", 
        desc: "مضغوط الدجاج والأرز بالتوابل الأصيلة", 
        price: "30.50 ريال", 
        price2: "35.50 ريال", 
        calories: "620 kcal", 
        walkTime: "124 minutes" 
      },
      "Chicken Kabsa": { 
        name: "كبسة دجاج", 
        subName: "Chicken Kabsa", 
        desc: "أرز الكبسة التقليدي المبهر مع الدجاج المحمر", 
        price: "20.50 ريال", 
        price2: "30.50 ريال", 
        calories: "540 kcal", 
        walkTime: "108 minutes" 
      },
      "Mandi Chicken With Rice": { 
        name: "مندي دجاج مع أرز", 
        subName: "Mandi Chicken With Rice", 
        desc: "دجاج مندي محمر ببطء على طبقة من الأرز المدخن", 
        price: "30.50 ريال", 
        price2: "35.50 ريال", 
        calories: "530 kcal", 
        walkTime: "106 minutes" 
      },
      // ── New Burgers ──
      "Mushroom Burger":          { name: "برجر الفطر", desc: "فطر بورتوبيلو مشوي، جبنة سويسر، مايونيز ثوم، بريوش", price: "45 ريال" },
      "Fish Fillet Burger":       { name: "برجر فيليه سمك", desc: "فيليه سمك ذهبي مقرمش، صوص تارتار، خس مبشور", price: "42 ريال" },
      "Lamb Burger":              { name: "برجر لحم الغنم", desc: "باتي لحم غنم متبل، بصل مكرمل، زبادي نعناع، جرجير", price: "50 ريال" },
      "Smash Burger":             { name: "سماش برجر", desc: "باتيتان مضغوطتان بحواف مقرمشة، جبنة أمريكية، مخلل، صوص خاص", price: "48 ريال" },
      "Truffle Burger":           { name: "برجر الكمأة", desc: "لحم واغيو، شائح كمأة سوداء، جبنة بري معتقة، مايونيز الكمأة، خبز بريوش أسود", price: "75 ريال" },
      // ── New Pizzas ──
      "Meat Feast Pizza":         { name: "بيتزا اللحوم الفاخرة", desc: "بيبروني لحم، خروف متبل، دجاج مشوي، موزاريلا فاخرة", price: "65 ريال" },
      "Four Cheese Pizza":        { name: "بيتزا أربعة أجبان", desc: "موزاريلا، بارميزان معتق، غودا مدخن، شيدر، رشاشة عسل", price: "55 ريال" },
      "Seafood Pizza":            { name: "بيتزا ثمار البحر", desc: "روبيان نمر، حلقات حبار، بطلون صغير، صوص ثوم كريمي، أعشاب طازجة", price: "70 ريال" },
      "Mushroom Pizza":           { name: "بيتزا الفطر", desc: "فطر بورشيني، شيتاكي، محارة المحار، زيت الكمأة، زعتر طازج", price: "55 ريال" },
      "Shawarma Pizza":           { name: "بيتزا شاورما", desc: "دجاج بتوابل الشاورما، صوص ثوم وتوم، مخللات، بقدونس", price: "60 ريال" },
      // ── New Rice ──
      "Lamb Kabsa":               { name: "كبسة لحم", desc: "خروف متبل مشوي ببطء على أرز بسمتي بالزعفران، زبيب ولوز", price: "65 ريال" },
      "Seafood Rice":             { name: "أرز ثمار البحر", desc: "أرز بسمتي بالزعفران، روبيان نمر، سمك مشوي، حبار، أعشاب طازجة", price: "70 ريال" },
      "Lamb Ouzi":                { name: "لحم عوزي", desc: "خروف كامل مشوي ببطء على أرز متبل، صنوبر، لوز وزبيب", price: "180 ريال" },
      "Machboos":                 { name: "مجبوس", desc: "أرز خليجي متبل مع خروف مطهو ببطء، ليمون جاف، ماء ورد", price: "65 ريال" },
      "Haneeth":                  { name: "حنيذ", desc: "خروف متبل يمني مطهو في فخار على أرز بسمتي عطري", price: "70 ريال" },
      "Saffron Rice Platter":     { name: "طبق أرز الزعفران", desc: "أرز بسمتي ذهبي بالزعفران، دجاج مشوي، صنوبر، بصل مقلي مقرمش", price: "75 ريال" },
      "Mint Lemonade": { name: "ليمون بالنعناع", desc: "ليمون طازج، نعناع مطحون، ثلج", price: "18 ريال" },
      "Saudi Champagne": { name: "شامبانيا سعودية", desc: "عصير تفاح، مياه غازية، فواكه طازجة", price: "35 ريال" },
      "Fresh Orange Juice": { name: "عصير برتقال طازج", desc: "برتقال فالنسيا معصور طازجاً", price: "20 ريال" },
      "Soft Drinks": { name: "مشروبات غازية", desc: "كولا، سبرايت، فانتا", price: "8 ريال" },
      "Truffle Fries": { name: "بطاطس الكمأة", desc: "بطاطس مقرمشة، زيت الكمأة، بارميزان", price: "25 ريال" },
      "Crispy Onion Rings": { name: "حلقات بصل مقرمشة", desc: "حلقات بصل سميكة مقلية، صوص رانش", price: "18 ريال" },
      "Mozzarella Sticks": { name: "أصابع الموزاريلا", desc: "موزاريلا مقلية، صوص مارينارا", price: "22 ريال" },
      "Mokarrmal Salad": { name: "سلطة مكرمّل", desc: "خضار مشكلة، رمان، جوز، بلسميك", price: "35 ريال" }
    },
    footer: {
      tagline: "تجربة طعام فاخرة تُعيد تعريف الذوق والجودة في المملكة العربية السعودية.",
      location: "الموقع",
      locationAddress: "الطريق الدائري الأول، بجوار برج الساعة، مكة المكرمة 24231",
      hours: "ساعات العمل",
      contact: "التواصل",
      callUs: "اتصل بنا",
      whatsApp: "واتساب",
      getDirections: "احصل على الاتجاهات",
      monThu: "الاثنين - الخميس:",
      friday: "الجمعة:",
      satSun: "السبت - الأحد:",
      copyright: "© 2026 مكرمّل. جميع الحقوق محفوظة.",
      websiteBy: "تصميم وتطوير",
    },
    aboutUs: {
      title: "قصتنا",
      subtitle: "إرث مكرمّل",
      storyTitle: "إعادة تعريف الوجبات السريعة بفخامة لا تضاهى",
      storyText1: "وُلد مكرمّل في قلب مكة المكرمة، وتأسس على فكرة بسيطة ولكنها ثورية: الوجبات السريعة لا يجب أن تساوم على الجودة. نحن نستورد فقط أجود المكونات - من لحم الواغيو الفاخر إلى الكمأة الإيطالية الأصيلة - لنصنع تجربة سريعة ومرضية للغاية.",
      storyText2: "يدمج فريق الطهي لدينا بين الضيافة السعودية التقليدية وتقنيات الطبخ الحديثة والمبتكرة. كل طبق هو تحفة فنية، صُمم ليقدم رحلة سينمائية من النكهات لن تجدها في أي مكان آخر.",
      stats: {
        quality: "100%",
        qualityLabel: "مكونات فاخرة",
        experience: "5★",
        experienceLabel: "تجربة فاخرة",
      },
      card1: {
        label: "تأسست في مكة المكرمة",
        title: "ولد من الشغف",
        desc: "رؤية لجلب أرقى تجارب الطعام إلى قلب المملكة العربية السعودية، بسرعة ودون تنازلات."
      },
      card2: {
        label: "تعهدنا",
        title: "مكونات بلا تساهل",
        tags: ["لحم واغيو", "كمأة إيطالية", "طازج يومياً"]
      },
      card3: {
        val1: "100%", label1: "مكونات فاخرة",
        val2: "5★", label2: "تجربة ممتازة",
        val3: "حلال", label3: "معتمد"
      },
      reviews: [
        {
          name: "عبد الرحمن الفهد",
          rating: 5,
          comment: "بلا شك أفضل برجر واغيو في مكة المكرمة. مايونيز الكمأة غني للغاية والتقديم رائع. تجربة فاخرة بحق!"
        },
        {
          name: "سارة ميتشل",
          rating: 5,
          comment: "مندي الفحم مطهو بإتقان - لحم طري للغاية وأرز عطري مميز. الأجواء الداكنة الفاخرة مذهلة."
        },
        {
          name: "فهد ك.",
          rating: 4,
          comment: "مزيج فريد بين الخدمة السريعة والفخامة الراقية. الأجواء رائعة وبيتزا الكمأة ممتازة ولذيذة جداً."
        }
      ],
      gallery: [
        {
          num: "01",
          title: "الأجواء",
          subtitle: "عِش تجربة تفاعلية ممتعة بمشاهدة مطبخنا المفتوح حيث تنبض النكهات الأصيلة بالحياة يومياً."
        },
        {
          num: "02",
          title: "المساحة",
          subtitle: "استمتع بتناول طعامك في صالة جلوس مريحة وفاخرة صُممت خصيصاً لتناسب لقاءاتكم العائلية الدافئة."
        },
        {
          num: "03",
          title: "الحِرفة",
          subtitle: "شاهد روعة التصاميم المعمارية والإضاءة الذهبية التي تضفي لمسة من الرقي والراحة على المكان."
        }
      ]
    },
    chefsSection: {
      title: "توصيات الشيف",
      dishes: [
        { name: "زنجر دبل برجر", desc: "زنجر دجاج مزدوج حار لنكهة نارية", discover: "اكتشف" },
        { name: "لحم مضغوط", desc: "مضغوط اللحم المطبوخ ببطء بنكهات غنية", discover: "اكتشف" },
        { name: "باربكيو دجاج", desc: "دجاج مشوي مع صلصة الباربيكيو الحلوة والبصل الأحمر", discover: "اكتشف" }
      ]
    }
  },
};

// Dynamically populate subName for all items (excluding cases where it is manually defined)
Object.keys(translations.en.items).forEach((key) => {
  if (translations.en.items[key] && translations.ar.items[key]) {
    if (!translations.en.items[key].subName) {
      translations.en.items[key].subName = translations.ar.items[key].name;
    }
    if (!translations.ar.items[key].subName) {
      translations.ar.items[key].subName = translations.en.items[key].name;
    }
  }
});

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
