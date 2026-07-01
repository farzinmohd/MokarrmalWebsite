"use client";

import { MapPin, Phone, Clock, Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-neutral-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">MOKARRMAL</h2>
          <p className="text-neutral-400 font-light mb-6">
            A luxury fast-food experience redefining taste and quality in Saudi Arabia.
          </p>
          <div className="flex space-x-4 text-gold">
            <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter size={24} /></a>
            <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <MapPin className="text-gold mr-2" size={20} />
            Location
          </h3>
          <p className="text-neutral-400 font-light leading-relaxed">
            First Ring Road, Near The Clock Towers<br />
            Makkah 24231, Saudi Arabia
          </p>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Clock className="text-gold mr-2" size={20} />
            Opening Hours
          </h3>
          <ul className="text-neutral-400 font-light space-y-2">
            <li className="flex justify-between"><span>Mon - Thu:</span> <span>11:00 AM - 2:00 AM</span></li>
            <li className="flex justify-between"><span>Friday:</span> <span>1:00 PM - 3:00 AM</span></li>
            <li className="flex justify-between"><span>Sat - Sun:</span> <span>11:00 AM - 3:00 AM</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <Phone className="text-gold mr-2" size={20} />
            Contact
          </h3>
          <div className="space-y-4">
            <a href="tel:+966500000000" className="block w-full py-3 px-4 border border-neutral-700 rounded-lg text-center text-white hover:border-gold hover:text-gold transition-colors">
              Call Us
            </a>
            <a href="https://wa.me/966500000000" className="block w-full py-3 px-4 bg-gold text-black font-semibold rounded-lg text-center hover:bg-white transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MapPin className="text-gold" size={18} />
          Find Us
        </h3>
        <div className="w-full rounded-2xl overflow-hidden border border-neutral-800" style={{ height: "240px" }}>
          <iframe
            title="Mokarrmal Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=21.4188855,39.8227365&z=17&output=embed"
          />
        </div>
        <p className="mt-3 text-xs text-neutral-600">
          Al Hajlah, 6103 4207 6861, Makkah 24231, Saudi Arabia — Located in The Clock Towers
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-600">
        <p>&copy; {new Date().getFullYear()} Mokarrmal Restaurant. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
