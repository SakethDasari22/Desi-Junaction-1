import React from "react";
import { MapPin } from "lucide-react";
import { CONTACT_INFO } from "../data/menuData";
import { IMAGES } from "../data/assets";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[680px] h-[92vh] max-h-[900px] flex items-end bg-dark-black overflow-hidden"
    >
      <img
        src={IMAGES.heroBg}
        alt="The Desi Junction food truck with customers lined up at the order window"
        className="absolute inset-0 w-full h-full object-cover object-[68%_80%] md:object-[58%_75%]"
        referrerPolicy="no-referrer"
        fetchPriority="high"
      />
      {/* Scrim: the truck stays visible on the right, text sits on the dark left */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-black/90 via-dark-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark-black to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-32">
        <div className="max-w-2xl rise-in">
          <p className="font-sans text-sm text-gold mb-5">{CONTACT_INFO.tagline}</p>

          <h1 className="font-serif text-4xl sm:text-6xl leading-[1.06] tracking-[-0.02em] font-medium text-cream">
            Dosas, chaat and wok-fired Indo-Chinese, cooked to order
          </h1>

          <p className="text-cream-dim text-lg leading-7 max-w-xl mt-6">
            Indian street snacks and hot-wok noodles and fried rice, served from our truck in the Chicago area.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <a
              href="#menu"
              className="h-12 px-6 rounded-lg bg-desi-red hover:bg-desi-red-hover text-white text-sm font-semibold flex items-center justify-center transition-colors"
            >
              View menu
            </a>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-lg border border-cream/25 bg-white/5 text-cream hover:bg-cream hover:text-dark-black text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MapPin className="w-4 h-4" strokeWidth={1.5} />
              Get directions
            </a>
          </div>

          <p className="text-sm text-cream-dim mt-10">
            Delivery on{" "}
            <a href={CONTACT_INFO.uberEatsUrl} target="_blank" rel="noopener noreferrer" className="text-cream underline underline-offset-4 decoration-cream/30 hover:decoration-cream transition-colors">
              Uber Eats
            </a>{" "}
            and{" "}
            <a href={CONTACT_INFO.grubhubUrl} target="_blank" rel="noopener noreferrer" className="text-cream underline underline-offset-4 decoration-cream/30 hover:decoration-cream transition-colors">
              Grubhub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
