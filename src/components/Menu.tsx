import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Edit2, Check, ArrowRight, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { FOOD_MENU } from "../data/menuData";
import { MenuItem } from "../types";
import DecoCorner, { DecoFrame } from "./DecoCorner";
import { useOrder, getDefaultPrice } from "../context/OrderContext";

export default function Menu() {
  // Store menu prices in state, loading from localStorage if present
  const [prices, setPrices] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState("");
  const { addToCart } = useOrder();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize prices from localStorage or default to "$--"
    const savedPrices = localStorage.getItem("desi_junction_menu_prices");
    if (savedPrices) {
      try {
        setPrices(JSON.parse(savedPrices));
      } catch (e) {
        console.error("Failed to parse saved prices", e);
      }
    } else {
      // Default all items to "$--"
      const initialPrices: Record<string, string> = {};
      FOOD_MENU.forEach((section) => {
        section.items.forEach((item) => {
          initialPrices[item.id] = item.pricePlaceholder || "$--";
        });
      });
      setPrices(initialPrices);
    }
  }, []);

  const handleStartEdit = (itemId: string, currentPrice: string) => {
    setEditingId(itemId);
    setTempPrice(currentPrice === "$--" ? "" : currentPrice);
  };

  const handleSavePrice = (itemId: string) => {
    const finalPrice = tempPrice.trim() === "" ? "$--" : tempPrice.trim();
    const updatedPrices = { ...prices, [itemId]: finalPrice };
    setPrices(updatedPrices);
    localStorage.setItem("desi_junction_menu_prices", JSON.stringify(updatedPrices));
    setEditingId(null);
  };

  const handleResetPrices = () => {
    if (window.confirm("Reset all prices back to placeholders ($--)?")) {
      const initialPrices: Record<string, string> = {};
      FOOD_MENU.forEach((section) => {
        section.items.forEach((item) => {
          initialPrices[item.id] = "$--";
        });
      });
      setPrices(initialPrices);
      localStorage.setItem("desi_junction_menu_prices", JSON.stringify(initialPrices));
    }
  };

  return (
    <section id="menu" className="py-24 bg-dark-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-radial-at-t from-gold/5 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-accent text-xs tracking-[0.25em] text-gold font-bold uppercase block mb-3">
            Gourmet Selection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-cream tracking-widest uppercase">
            THE DIGITAL MENU
          </h2>
          <div className="flex items-center justify-center space-x-3 my-4">
            <div className="h-[1px] w-12 bg-gold/50" />
            <Sparkles className="w-4 h-4 text-gold" />
            <div className="h-[1px] w-12 bg-gold/50" />
          </div>
          <p className="text-sm sm:text-base text-cream-dim/80 font-light leading-relaxed">
            Double-lined panels inspired by our printed cards. <strong className="text-gold">Interactive feature:</strong> Click on any price placeholder <span className="font-mono text-gold px-1.5 py-0.5 bg-gold/10 rounded border border-gold/20 text-xs">$--</span> to edit and save your real prices. Choose your customizations and add items to your cart to track your order in real-time!
          </p>
        </div>

        {/* Price Helper Tool Bar */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleResetPrices}
            className="text-xs font-mono tracking-wider text-cream-dim/50 hover:text-gold transition-colors duration-200 border border-white/5 hover:border-gold/30 px-3 py-1.5 rounded-md bg-card-black/40 cursor-pointer"
            id="reset-prices-btn"
          >
            Reset Menu Prices to Placeholders
          </button>
        </div>

        {/* Two-Column Elegant Art Deco Menu Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {FOOD_MENU.map((section, sIndex) => (
            <div
              key={section.title}
              className="bg-card-black border border-gold/25 p-8 sm:p-12 relative rounded-lg shadow-2xl transition-all duration-300 hover:border-gold/40 deco-border"
              id={`menu-section-${sIndex}`}
            >
              {/* Art Deco Gold Corner Frame */}
              <DecoFrame />

              {/* Column Section Title */}
              <div className="text-center mb-10 mt-2">
                <h3 className="font-display text-2xl sm:text-3xl tracking-widest text-gold font-extrabold uppercase">
                  {section.title}
                </h3>
                <div className="w-16 h-[1px] bg-gold mx-auto mt-2" />
              </div>

              {/* Menu Items List */}
              <div className="space-y-8 relative z-10" id={`menu-list-${sIndex}`}>
                {section.items.map((item) => {
                  const currentPrice = prices[item.id] || "$--";
                  const isEditing = editingId === item.id;
                  
                  // Calculate raw price for adding to cart
                  const numPrice = currentPrice !== "$--" ? parseFloat(currentPrice.replace("$", "")) : getDefaultPrice(item.id);
                  const activeOption = selectedOptions[item.id] || item.options?.[0];

                  return (
                    <div key={item.id} className="group relative" id={`menu-item-${item.id}`}>
                      {/* Flex row for Title, Dots, Price */}
                      <div className="flex items-baseline justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-sans text-sm sm:text-base font-bold text-cream tracking-wide uppercase group-hover:text-gold transition-colors duration-200">
                            {item.name}
                          </h4>
                          {item.isWeekendOnly && (
                            <span className="text-[9px] bg-desi-red/25 border border-desi-red/40 text-desi-red-hover font-bold font-accent px-1.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-1 shrink-0">
                              <Calendar className="w-2.5 h-2.5" />
                              <span>Weekends</span>
                            </span>
                          )}
                        </div>

                        {/* Dotted connector line */}
                        <div className="flex-grow border-b border-dashed border-gold/25 mx-3 group-hover:border-gold/40 transition-colors" />

                        {/* Interactive Price Input or Display */}
                        <div className="shrink-0 font-mono text-sm sm:text-base text-gold font-semibold tracking-wider flex items-center space-x-1.5">
                          {isEditing ? (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSavePrice(item.id);
                              }}
                              className="flex items-center space-x-1 bg-dark-black border border-gold rounded px-1.5 py-0.5"
                            >
                              <input
                                type="text"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                className="w-16 bg-transparent text-gold outline-none text-xs text-center font-bold"
                                placeholder="$"
                                autoFocus
                                onBlur={() => handleSavePrice(item.id)}
                              />
                              <button
                                type="submit"
                                className="text-emerald-400 hover:text-emerald-300 p-0.5"
                                title="Save"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </form>
                          ) : (
                            <button
                              onClick={() => handleStartEdit(item.id, currentPrice)}
                              className="hover:bg-gold/10 px-2 py-0.5 rounded border border-transparent hover:border-gold/20 flex items-center space-x-1 group/btn transition-all duration-150 cursor-pointer"
                              title="Click to edit price"
                            >
                              <span>{currentPrice}</span>
                              <Edit2 className="w-3 h-3 text-gold/30 group-hover/btn:text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Chic Interactive Option Selector Pills */}
                      {item.options && (
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-1.5">
                          {item.options.map((opt) => {
                            const isSelected = activeOption === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => setSelectedOptions((prev) => ({ ...prev, [item.id]: opt }))}
                                className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded transition-all uppercase border cursor-pointer ${
                                  isSelected
                                    ? "bg-gold border-gold text-dark-black font-extrabold shadow-sm"
                                    : "bg-dark-black/40 border-white/5 text-cream-dim/70 hover:bg-white/5 hover:text-cream"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Brief helper description and Order Button */}
                      <div className="flex items-start justify-between gap-4 mt-2">
                        {item.description && (
                          <p className="text-xs text-cream-dim/60 font-light text-left max-w-lg leading-relaxed">
                            {item.description}
                          </p>
                        )}
                        
                        {/* Quick Add To Cart Button */}
                        <button
                          onClick={() => addToCart({ id: item.id, name: item.name }, activeOption, numPrice)}
                          className="bg-gold hover:bg-gold-hover text-dark-black p-1.5 rounded transition-all flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                          title={`Add ${item.name} (${activeOption || "standard"}) to cart`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

        {/* Menu Footer Banner */}
        <div className="mt-16 text-center" id="menu-catering-banner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card-black border border-gold/25 p-6 sm:px-10 sm:py-5 rounded-lg max-w-3xl mx-auto shadow-xl"
          >
            <div className="text-left space-y-1">
              <h4 className="font-display text-gold font-bold tracking-widest text-sm uppercase">
                We Cater For All Occasions
              </h4>
              <p className="text-xs text-cream-dim/80 font-light">
                Weddings, birthdays, corporate retreats, and neighborhood street parties.
              </p>
            </div>
            <a
              href="#catering"
              className="bg-desi-red hover:bg-desi-red-hover text-white px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center space-x-1.5 shrink-0"
            >
              <span>Book Catering</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
