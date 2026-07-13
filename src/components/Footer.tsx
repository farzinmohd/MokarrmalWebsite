"use client";

import { MapPin, Phone, Clock, Instagram, Twitter, Facebook, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer id="contact" className="bg-black border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">MOKARMAL</h2>
          <p className="text-neutral-400 font-light mb-6 leading-relaxed">
            {f.tagline}
          </p>
          <div className="flex space-x-5 text-gold">
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300 inline-block">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300 inline-block">
              <Twitter size={24} />
            </a>
            <a href="#" className="hover:text-white hover:scale-110 transition-all duration-300 inline-block">
              <Facebook size={24} />
            </a>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <MapPin className="text-gold mr-3 rtl:mr-0 rtl:ml-3" size={20} />
            {f.location}
          </h3>
          <p className="text-neutral-400 font-light leading-relaxed mb-4">
            {f.locationAddress}
          </p>
          <div className="w-full h-40 rounded-xl overflow-hidden border border-gold/20 shadow-lg relative group">
            <iframe
              title="Mokarrmal Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=21.4188805,39.8253114&z=17&output=embed"
            />
            <a 
              href="https://maps.app.goo.gl/1dXNJcLnb9N5haU8A" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
               <span className="flex items-center gap-2 text-sm font-medium text-gold bg-black/90 border border-gold/30 px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                 {f.getDirections} <Navigation size={14} />
               </span>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Clock className="text-gold mr-3 rtl:mr-0 rtl:ml-3" size={20} />
            {f.hours}
          </h3>
          <ul className="text-neutral-400 font-light space-y-3">
            <li className="flex justify-between"><span>{f.monThu}</span> <span>11:00 AM - 2:00 AM</span></li>
            <li className="flex justify-between"><span>{f.friday}</span> <span>1:00 PM - 3:00 AM</span></li>
            <li className="flex justify-between"><span>{f.satSun}</span> <span>11:00 AM - 3:00 AM</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Phone className="text-gold mr-3 rtl:mr-0 rtl:ml-3" size={20} />
            {f.contact}
          </h3>
          <div className="space-y-4">
            <a 
              href="tel:+966500000000" 
              className="block w-full py-3 px-4 border border-neutral-700 rounded-lg text-center text-white hover:border-gold hover:text-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] transition-all duration-300"
            >
              {f.callUs}
            </a>
            <a 
              href="https://wa.me/966500000000" 
              className="block w-full py-3 px-4 bg-gold text-black font-semibold rounded-lg text-center hover:bg-[#c29f31] transition-colors duration-300"
            >
              {f.whatsApp}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Credit Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-neutral-500">
        <p className="mb-4 md:mb-0">{f.copyright}</p>
        <p>
          {f.websiteBy}{" "}
          <a href="https://pent26.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold transition-colors duration-300">
            Pent26
          </a>
        </p>
      </div>
    </footer>
  );
}
