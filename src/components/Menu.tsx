import React, { useState, useEffect } from "react";
import { Calendar, Edit2, Check, ArrowRight, Plus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { FOOD_MENU } from "../data/menuData";
import { MenuItem } from "../types";
import { useOrder, getDefaultPrice } from "../context/OrderContext";
import { IMAGES } from "../data/assets";

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-2xl mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-[-0.02em] leading-[1.06] text-cream">
            Menu
          </h2>
          <p className="text-base text-cream-dim leading-7 mt-4">
            Pick a variation, add it to your order and track it live. Prices show as <span className="tabular-nums text-cream tabular-nums">$--</span> until set: tap a price to edit it, and it is saved in this browser.
          </p>
        </div>

        {/* Price Helper Tool Bar */}
        <div className="flex justify-end mb-6">
          <button
            onClick={handleResetPrices}
            className="text-sm text-cream-dim hover:text-cream transition-colors px-1 py-1.5 cursor-pointer underline underline-offset-4 decoration-cream/20"
            id="reset-prices-btn"
          >
            Reset prices
          </button>
        </div>

        {/* Two-Column Elegant Art Deco Menu Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {FOOD_MENU.map((section, sIndex) => (
            <div
              key={section.title}
              className="bg-card-black border border-cream/10 p-6 sm:p-10 relative rounded-xl"
              id={`menu-section-${sIndex}`}
            >

              {/* Column Section Title */}
              <div className="mb-8 pb-5 border-b border-cream/10">
                <h3 className="font-serif text-2xl sm:text-3xl text-cream font-medium tracking-[-0.01em]">
                  {section.title}
                </h3>
              </div>

              {/* Menu Items List */}
              <div className="space-y-8 relative z-10" id={`menu-list-${sIndex}`}>
                {section.items.map((item) => {
                  const currentPrice = prices[item.id] || "$--";
                  const isEditing = editingId === item.id;
                  
                  // Calculate raw price for adding to cart
                  const numPrice = currentPrice !== "$--" ? parseFloat(currentPrice.replace("$", "")) : getDefaultPrice(item.id);
                  const activeOption = selectedOptions[item.id] || item.options?.[0];

                  const itemImage =
                    item.id === "street-noodles" ? IMAGES.hakkaNoodles :
                    item.id === "chats" ? IMAGES.samosaChaat :
                    item.id === "dosa" ? IMAGES.masalaDosa : undefined;

                  return (
                    <div key={item.id} className="group flex gap-4 items-start relative border-b border-white/5 pb-6 last:border-0 last:pb-0" id={`menu-item-${item.id}`}>
                      {itemImage && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-cream/10 shrink-0 relative">
                          <img
                            src={itemImage}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        {/* Flex row for Title, Dots, Price */}
                        <div className="flex items-baseline justify-between w-full">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-sans text-base font-medium text-cream">
                              {item.name}
                            </h4>
                          {item.isWeekendOnly && (
                            <span className="text-xs text-desi-red-hover flex items-center gap-1 shrink-0">
                              <Calendar className="w-3 h-3" strokeWidth={1.5} />
                              <span>Weekends</span>
                            </span>
                          )}
                        </div>

                        {/* Dotted connector line */}
                        <div className="flex-grow border-b border-dotted border-cream/20 mx-3" />

                        {/* Interactive Price Input or Display */}
                        <div className="shrink-0 font-sans text-base text-gold font-medium tabular-nums flex items-center space-x-1.5">
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
                                className="w-16 bg-transparent text-gold outline-none text-xs text-center font-semibold"
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
                              className="hover:bg-white/5 px-2 py-0.5 rounded-md flex items-center space-x-1 group/btn transition-colors duration-150 cursor-pointer"
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
                                className={`text-sm px-2.5 py-1 rounded-md transition-colors border cursor-pointer ${
                                  isSelected
                                    ? "bg-cream text-dark-black border-cream font-medium"
                                    : "border-cream/15 text-cream-dim hover:bg-white/5 hover:text-cream"
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
                          <p className="text-sm text-cream-dim text-left max-w-lg leading-6">
                            {item.description}
                          </p>
                        )}
                        
                        {/* Quick Add To Cart Button */}
                        <button
                          onClick={() => addToCart({ id: item.id, name: item.name }, activeOption, numPrice)}
                          className="h-9 px-3 border border-cream/20 text-cream hover:bg-cream hover:text-dark-black rounded-lg transition-colors flex items-center gap-1.5 text-sm font-medium shrink-0 cursor-pointer"
                          title={`Add ${item.name} (${activeOption || "standard"}) to cart`}
                        >
                          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>

        {/* Menu Footer Banner */}
        <div className="mt-16" id="menu-catering-banner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 bg-card-black border border-cream/10 p-6 sm:px-8 sm:py-5 rounded-xl max-w-3xl mx-auto"
          >
            <div className="text-left space-y-1">
              <h4 className="font-serif text-cream font-medium text-lg">
                We cater events
              </h4>
              <p className="text-xs text-cream-dim">
                Weddings, birthdays, corporate lunches and street parties.
              </p>
            </div>
            <a
              href="#catering"
              className="bg-desi-red hover:bg-desi-red-hover text-white h-10 px-5 rounded-lg text-sm font-semibold transition-colors duration-200 flex items-center space-x-1.5 shrink-0"
            >
              <span>Book catering</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
