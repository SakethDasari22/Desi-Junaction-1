import React, { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { ShoppingBag, X, Plus, Minus, Trash2, User, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const { cart, updateQuantity, removeFromCart, getCartTotal, placeOrder } = useOrder();
  
  // Checkout Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await placeOrder({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        type: orderType
      });
      
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setOrderType("pickup");
      onClose();
    } catch (err) {
      setError("Failed to place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-black/90 z-50 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card-black border-l border-gold/20 shadow-2xl z-50 flex flex-col font-sans text-cream"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-gold/15 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-widest font-extrabold text-gold uppercase">
                    Your Cart
                  </h3>
                  <p className="text-[10px] font-mono tracking-wider opacity-60">
                    {totalItems} {totalItems === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/5 hover:border-gold/30 hover:bg-gold/10 flex items-center justify-center text-cream-dim hover:text-gold transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-8 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-gold/20 stroke-1" />
                  <div className="space-y-1">
                    <h4 className="font-display text-gold/85 text-sm tracking-wider uppercase font-bold">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-cream-dim/60 max-w-[240px]">
                      Add mouth-watering dishes from the menu to start your real-time tracking order.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 text-xs font-mono font-bold tracking-widest text-gold hover:text-gold-hover border border-gold/25 hover:border-gold/40 px-4 py-2 bg-gold/5 uppercase"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] border-b border-gold/10 pb-2">
                      Selected Items
                    </h4>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={`${item.id}-${item.option || ""}`}
                          className="flex items-center justify-between p-3 bg-dark-black/40 border border-white/5 rounded-md hover:border-gold/15 transition-all"
                        >
                          <div className="space-y-1 max-w-[65%]">
                            <span className="text-xs font-bold uppercase text-cream tracking-wide block">
                              {item.name}
                            </span>
                            {item.option && (
                              <span className="text-[10px] font-serif italic text-gold-light/70 block">
                                Option: {item.option}
                              </span>
                            )}
                            <span className="text-[11px] font-mono text-gold font-medium">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1 border border-white/10 bg-dark-black rounded px-1.5 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.option, -1)}
                                className="text-cream-dim hover:text-gold p-0.5"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-mono font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.option, 1)}
                                className="text-cream-dim hover:text-gold p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id, item.option)}
                              className="text-cream-dim/40 hover:text-desi-red transition-colors p-1"
                              title="Delete item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="space-y-2 bg-dark-black/60 p-4 rounded border border-gold/10">
                    <div className="flex justify-between text-xs text-cream-dim">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-cream-dim">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-mono font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/5 my-2 pt-2 flex justify-between text-sm text-gold font-bold uppercase tracking-wider">
                      <span>Total Amount</span>
                      <span className="font-mono text-base">${(getCartTotal() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.25em] border-b border-gold/10 pb-2">
                      Delivery & Contact Details
                    </h4>

                    {error && (
                      <div className="text-xs text-desi-red-hover bg-desi-red/10 border border-desi-red/30 p-2.5 rounded">
                        {error}
                      </div>
                    )}

                    {/* Order Type Toggle */}
                    <div className="grid grid-cols-2 gap-2 bg-dark-black/40 p-1 border border-white/5 rounded-md">
                      <button
                        type="button"
                        onClick={() => setOrderType("pickup")}
                        className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${
                          orderType === "pickup"
                            ? "bg-gold text-dark-black font-extrabold shadow"
                            : "text-cream-dim hover:text-cream"
                        }`}
                      >
                        Pickup at Truck
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType("delivery")}
                        className={`py-2 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded ${
                          orderType === "delivery"
                            ? "bg-gold text-dark-black font-extrabold shadow"
                            : "text-cream-dim hover:text-cream"
                        }`}
                      >
                        Local Delivery
                      </button>
                    </div>

                    <div className="space-y-3">
                      {/* Name */}
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 w-4 h-4 text-gold/55" />
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-dark-black border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs text-cream outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gold/55" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-dark-black border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs text-cream outline-none focus:border-gold transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold/55" />
                        <input
                          type="email"
                          placeholder="Email Address (for confirmation)"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-dark-black border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs text-cream outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    {orderType === "delivery" && (
                      <div className="bg-desi-red/10 border border-desi-red/30 p-3 rounded flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-desi-red-hover shrink-0 mt-0.5" />
                        <span className="text-[10px] text-cream-dim leading-relaxed">
                          Delivery is available within a 5-mile radius of our truck at <strong>535 Fairway Dr, Naperville</strong>. Delivery fee of $3.99 is cash-on-delivery.
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-desi-red hover:bg-desi-red-hover text-white py-3 rounded text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? "PLACING ORDER..." : "CONFIRM & TRACK LIVE"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
