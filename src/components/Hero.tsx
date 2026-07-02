import React from "react";
import { ArrowDown, MapPin, Menu, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT_INFO } from "../data/menuData";
import { IMAGES } from "../data/assets";

export default function Hero() {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-dark-black overflow-hidden pt-20"
    >
      {/* Background Image with Parallax & Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent z-10" />
        <img
          src={IMAGES.heroBg}
          alt="Desi Junction Food Truck"
          className="w-full h-full object-cover object-[68%_80%] scale-[1.7] md:object-[58%_75%] md:scale-110 select-none"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Logo Badge */}
          <motion.div
            variants={itemVariants}
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-gold/60 p-1 bg-dark-black/90 mb-6 shadow-2xl relative group hover:border-gold transition-colors duration-500"
          >
            <div className="absolute -inset-1 rounded-full border border-gold/20 animate-spin-[spin_30s_linear_infinite]" />
            <img
              src={IMAGES.logo}
              alt="Desi Junction Circular Badge Logo"
              className="w-full h-full rounded-full object-cover shadow-inner"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Subheader / Badge */}
          <motion.p
            variants={itemVariants}
            className="text-gold font-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-bold mb-4 bg-gold/10 px-4 py-1.5 rounded-full border border-gold/25 backdrop-blur-sm"
          >
            {CONTACT_INFO.tagline}
          </motion.p>

          {/* Main Title (Display Serif) */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-cream tracking-wider uppercase mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          >
            DESI JUNCTION
          </motion.h1>

          {/* Divider Line with diamond */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4 w-full max-w-xs mb-6">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-gold/60 flex-grow" />
            <div className="w-2.5 h-2.5 transform rotate-45 bg-gold border border-gold" />
            <div className="h-[1px] bg-gradient-to-l from-transparent to-gold/60 flex-grow" />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-cream-dim text-base sm:text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed drop-shadow"
          >
            Savor the spicy thrill of authentic, made-to-order Indian street snacks and wok-fired Indo-Chinese delicacies. Wok-tossed fresh and served sizzling hot on the streets of Chicagoland.
          </motion.p>

          {/* Call-to-actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mb-12"
          >
            <a
              href="#menu"
              className="w-full sm:w-auto bg-desi-red hover:bg-desi-red-hover text-white px-8 py-4 rounded-md font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-desi-red/30 border border-desi-red hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
            >
              <Menu className="w-4 h-4" />
              <span>View Menu</span>
            </a>
            <a
              href={CONTACT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-dark-black/85 hover:bg-dark-black/100 text-gold hover:text-gold-hover px-8 py-4 rounded-md font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg border border-gold/45 hover:border-gold hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4 text-gold" />
              <span>Get Directions</span>
            </a>
          </motion.div>

          {/* Online Ordering Platform Quick Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-3 bg-dark-black/60 border border-white/5 backdrop-blur-md px-6 py-4 rounded-lg"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold/80">Order Delivery Online</span>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 px-4 py-2 rounded-md transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-300 font-semibold tracking-wide">Uber Eats</span>
                <ExternalLink className="w-3 h-3 text-emerald-400/70" />
              </a>
              <a
                href={CONTACT_INFO.grubhubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-orange-950/20 hover:bg-orange-950/40 border border-orange-500/20 px-4 py-2 rounded-md transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span className="text-xs text-orange-300 font-semibold tracking-wide">Grubhub</span>
                <ExternalLink className="w-3 h-3 text-orange-400/70" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <a
          href="#about"
          className="flex flex-col items-center space-y-1 text-cream-dim hover:text-gold transition-colors duration-300"
          id="hero-scroll-link"
        >
          <span className="text-[10px] uppercase tracking-widest font-accent">The Story</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
