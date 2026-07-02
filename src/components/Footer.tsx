import React from "react";
import { Instagram, Facebook, MapPin, Phone, HelpCircle, ArrowUp } from "lucide-react";
import { CONTACT_INFO, BUSINESS_HOURS } from "../data/menuData";
import { IMAGES } from "../data/assets";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-dark-black border-t border-gold/15 pt-16 pb-8 relative overflow-hidden">
      
      {/* Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Column 1: Brand & Socials (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-6" id="footer-col-brand">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full border border-gold/40 overflow-hidden shadow-lg shrink-0">
                <img
                  src={IMAGES.logo}
                  alt="Desi Junction Footer Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-extrabold text-gold tracking-widest uppercase">
                  DESI JUNCTION
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cream-dim/60">
                  Chicago's First Street Food Truck
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-cream-dim/65 font-light leading-relaxed max-w-sm">
              We bring the electric flavor profiles of Indian street junctions and fire-cooked Indo-Chinese woks directly to the suburbs of Chicago. Hot, spicy, and made-to-order.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gold/5 border border-gold/25 text-gold hover:bg-gold hover:text-dark-black transition-all duration-300 flex items-center justify-center shadow"
                aria-label="Instagram Page"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gold/5 border border-gold/25 text-gold hover:bg-gold hover:text-dark-black transition-all duration-300 flex items-center justify-center shadow"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Numbers & Address (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-5" id="footer-col-contact">
            <h3 className="font-display text-xs tracking-widest uppercase font-bold text-gold">
              Contact & Directions
            </h3>
            <div className="h-[1px] w-12 bg-gold/30" />

            <div className="space-y-4 text-xs sm:text-sm text-cream-dim/80 font-light">
              {/* Address */}
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-3 hover:text-gold transition-colors"
              >
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </a>

              {/* Order line */}
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-gold uppercase font-accent">Truck Order Line</span>
                  <a
                    href={`tel:${CONTACT_INFO.phoneOrder.replace(/\D/g, "")}`}
                    className="font-mono text-cream hover:text-gold transition-colors font-semibold"
                  >
                    {CONTACT_INFO.phoneOrder}
                  </a>
                </div>
              </div>

              {/* Catering Line */}
              <div className="flex items-start space-x-3">
                <HelpCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-gold uppercase font-accent">Catering bookings</span>
                  <a
                    href={`tel:${CONTACT_INFO.phoneCatering.replace(/\D/g, "")}`}
                    className="font-mono text-cream hover:text-gold transition-colors font-semibold"
                  >
                    {CONTACT_INFO.phoneCatering}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Hours Summary (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-5" id="footer-col-hours">
            <h3 className="font-display text-xs tracking-widest uppercase font-bold text-gold">
              Quick Schedule
            </h3>
            <div className="h-[1px] w-12 bg-gold/30" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-cream-dim/75 font-light" id="footer-hours-summary">
              {BUSINESS_HOURS.map((hoursItem) => (
                <div key={hoursItem.day} className="flex flex-col text-left py-0.5 border-b border-white/5">
                  <span className="font-semibold text-cream-dim/90">{hoursItem.day}</span>
                  <span className={`text-[11px] font-mono ${hoursItem.isClosed ? "text-desi-red/75" : "text-gold/80"}`}>
                    {hoursItem.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Divider and Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-cream-dim/35 font-mono text-center sm:text-left">
            &copy; {new Date().getFullYear()} Desi Junction. All rights reserved. Built with precision for Chicago's First Indian Street Food Truck.
          </p>

          {/* Scroll To Top Button */}
          <button
            onClick={handleScrollToTop}
            className="group flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-cream-dim/50 hover:text-gold transition-colors"
            aria-label="Scroll to top"
            id="scroll-to-top-btn"
          >
            <span>Back to top</span>
            <div className="p-1.5 bg-white/5 rounded border border-white/5 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all">
              <ArrowUp className="w-3.5 h-3.5 text-cream-dim group-hover:text-gold transition-colors" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
