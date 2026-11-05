import React, { useState, useEffect } from "react";
import { Menu, X, Phone, ShoppingBag, ExternalLink, ShieldCheck, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_INFO } from "../data/menuData";
import { IMAGES } from "../data/assets";
import { useOrder } from "../context/OrderContext";

interface HeaderProps {
  onOpenCart: () => void;
  onOpenTracker: () => void;
}

export default function Header({ onOpenCart, onOpenTracker }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, activeOrder, setIsAdminMode } = useOrder();

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Catering", href: "#catering" },
    { name: "Location", href: "#location" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-dark-black/95  border-b border-cream/10 py-3 "
          : "bg-gradient-to-b from-dark-black/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <a href="#hero" className="flex items-center space-x-3 group" id="header-logo-link">
            <div className="w-10 h-10 rounded-full border border-cream/10 overflow-hidden group-hover:border-gold transition-colors duration-300">
              <img
                src={IMAGES.logo}
                alt="Desi Junction Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl text-gold font-semibold group-hover:text-cream-hover transition-colors duration-300">
                Desi Junction
              </span>
              <span className="text-xs font-serif text-cream/75 -mt-1 hidden sm:block">
                Chicago's first street food truck
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-cream-dim hover:text-gold text-xs lg:text-sm font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* Quick Staff Portal Access */}
            <button
              onClick={() => setIsAdminMode(true)}
              className="text-cream-dim hover:text-gold text-xs lg:text-sm tabular-nums transition-colors duration-200 flex items-center space-x-1 border border-white/5 hover:border-cream/10 px-2 py-1 rounded bg-card-black/30 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold/60" />
              <span>Staff POS</span>
            </button>
          </nav>

          {/* Contact, Order and Cart CTA */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6" id="desktop-ctas">
            {/* Active Order Tracker Shortcut */}
            {activeOrder && (
              <button
                onClick={onOpenTracker}
                className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/35 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-amber-500" />
                <span>Track order ({activeOrder.id})</span>
              </button>
            )}

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-md border border-cream/10 bg-cream/5 text-gold hover:bg-gold hover:text-dark-black transition-colors cursor-pointer"
              title="Open Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-desi-red text-white text-xs tabular-nums font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-card-black">
                  {totalCartItems}
                </span>
              )}
            </button>

            <a
              href={`tel:${CONTACT_INFO.phoneOrder.replace(/\D/g, "")}`}
              className="bg-desi-red hover:bg-desi-red-hover text-white px-4 lg:px-5 py-2 rounded text-xs font-semibold transition-colors duration-300 hover:shadow-desi-red/20 border border-desi-red"
              id="header-order-btn"
            >
              Call to order
            </a>
          </div>

          {/* Mobile Menu Trigger & Ordering Buttons */}
          <div className="flex items-center space-x-3 md:hidden" id="mobile-ctas-container">
            {activeOrder && (
              <button
                onClick={onOpenTracker}
                className="bg-amber-500/10 text-amber-400 border border-amber-500/35 p-2 rounded-full cursor-pointer"
                title="Track Active Order"
              >
                <Activity className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-md border border-cream/10 bg-cream/5 text-gold cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-desi-red text-white text-xs tabular-nums font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cream hover:text-gold focus:outline-none p-1 cursor-pointer"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-dark-black border-b border-cream/10 overflow-hidden"
            id="mobile-dropdown-menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-cream-dim hover:text-gold text-sm font-semibold py-2.5 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}

              {/* Staff Portal Toggle Mobile */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsAdminMode(true);
                }}
                className="text-cream-dim hover:text-gold text-sm tabular-nums py-2.5 border-b border-white/5 text-left flex items-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-gold/60" />
                <span>Staff POS portal</span>
              </button>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-4 space-y-3">
                <p className="text-xs text-gold font-semibold">Partners delivery</p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={CONTACT_INFO.uberEatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-800/10 border border-emerald-500/35 rounded-md text-xs text-emerald-300 font-semibold"
                  >
                    <span>Uber Eats</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={CONTACT_INFO.grubhubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-1.5 py-2.5 bg-orange-950/10 border border-orange-500/35 rounded-md text-xs text-orange-300 font-semibold"
                  >
                    <span>Grubhub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <a
                  href={`tel:${CONTACT_INFO.phoneOrder.replace(/\D/g, "")}`}
                  className="block text-center w-full bg-desi-red hover:bg-desi-red-hover text-white py-3 rounded-md text-sm font-semibold transition-colors duration-200"
                >
                  Call Order Line: {CONTACT_INFO.phoneOrder}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
