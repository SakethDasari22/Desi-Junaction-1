import React from "react";
import { useOrder } from "../context/OrderContext";
import { Clock, Utensils, Truck, CheckCircle2, ChevronRight, X, Phone, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import { IMAGES } from "../data/assets";

interface OrderTrackerProps {
  onClose: () => void;
}

export default function OrderTracker({ onClose }: OrderTrackerProps) {
  const { activeOrder, clearTracking, isConnected } = useOrder();

  if (!activeOrder) return null;

  const orderStatuses = [
    {
      key: "Received",
      title: "Order Received",
      desc: "Sent directly to the food truck",
      icon: Clock,
      color: "border-blue-500 text-blue-400 bg-blue-950/20"
    },
    {
      key: "Preparing",
      title: "Preparing Food",
      desc: "Our wok-fired stoves are sizzling",
      icon: Utensils,
      color: "border-amber-500 text-amber-400 bg-amber-950/20"
    },
    {
      key: "Ready / Out",
      title: activeOrder.type === "pickup" ? "Ready for Pickup" : "Out for Delivery",
      desc: activeOrder.type === "pickup" ? "Fresh & hot at the counter" : "Runner is on the way",
      icon: Truck,
      color: "border-emerald-500 text-emerald-400 bg-emerald-950/20"
    },
    {
      key: "Completed",
      title: "Order Completed",
      desc: "Enjoy your street flavors",
      icon: CheckCircle2,
      color: "border-gold text-gold bg-cream/5"
    }
  ];

  // Helper to determine the current state index
  const getStatusIndex = (status: string): number => {
    switch (status) {
      case "Received": return 0;
      case "Preparing": return 1;
      case "Ready for Pickup":
      case "Out for Delivery": return 2;
      case "Completed": return 3;
      default: return 0;
    }
  };

  const currentIndex = getStatusIndex(activeOrder.status);

  return (
    <div className="fixed inset-0 z-45 bg-dark-black overflow-y-auto font-sans text-cream">
      {/* Background Ambience */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 py-20 relative z-10 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-cream/10 pb-5">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-xs tabular-nums text-cream-dim hover:text-gold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to site</span>
          </button>

          <div className="flex items-center space-x-2 bg-card-black/80 border border-white/5 px-3 py-1.5 rounded-full text-xs tabular-nums">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 " : "bg-amber-500 "}`} />
            <span className="opacity-70">
              {isConnected ? "Truck Live Synced" : "Reconnecting server..."}
            </span>
          </div>

          <button
            onClick={clearTracking}
            className="text-xs tabular-nums text-cream-dim hover:text-desi-red transition-colors flex items-center space-x-1 cursor-pointer"
            title="Stop tracking this order"
          >
            <span>Reset tracker</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Hero Order Card */}
        <div className="bg-card-black border border-cream/10 p-6 sm:p-8 rounded-lg relative overflow-hidden">
          {/* Subtle design corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cream/10" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cream/10" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cream/10" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cream/10" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="font-serif text-xs text-gold block">
                Live order tracker
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-cream">
                Order {activeOrder.id}
              </h2>
              <p className="text-xs text-cream-dim">
                Placed on {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            <div className="bg-cream/5 border border-cream/10 rounded px-4 py-2 text-right self-start sm:self-center">
              <span className="text-xs text-gold block opacity-80">
                Tracking status
              </span>
              <span className="text-sm font-semibold text-gold-light block">
                {activeOrder.status}
              </span>
            </div>
          </div>
        </div>

        {/* Live Stepper Tracker */}
        <div className="bg-card-black border border-white/5 p-6 sm:p-8 rounded-lg">
          <h3 className="text-xs tabular-nums font-semibold text-gold mb-8 border-b border-white/5 pb-2">
            Real-Time timeline
          </h3>

          <div className="relative">
            {/* Horizontal connection line for desktop */}
            <div className="hidden md:block absolute top-[22px] left-[32px] right-[32px] h-[2px] bg-white/10" />
            <div
              className="hidden md:block absolute top-[22px] left-[32px] h-[2px] bg-gold transition-colors duration-300"
              style={{ width: `${(currentIndex / 3) * 100}%` }}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {orderStatuses.map((step, sIdx) => {
                const StepIcon = step.icon;
                const isPassed = sIdx <= currentIndex;
                const isActive = sIdx === currentIndex;

                return (
                  <div
                    key={step.key}
                    className={`flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2 transition-colors ${
                      isPassed ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    {/* Circle icon wrapper */}
                    <div
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? `${step.color} border-gold  scale-110`
                          : isPassed
                          ? "border-gold text-gold bg-cream/5"
                          : "border-white/10 text-cream-dim/40 bg-dark-black"
                      }`}
                    >
                      <StepIcon className={`w-5 h-5 ${isActive ? "" : ""}`} />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className={`text-xs font-semibold   ${isActive ? "text-gold" : "text-cream"}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-cream-dim leading-tight">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real Food Truck Showcase with Instructions */}
        <div className="bg-card-black border border-cream/10 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-5">
          <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden">
            <img
              src={IMAGES.logo}
              alt="Desi Junction Brand Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-dark-black/90 to-transparent" />
          </div>

          <div className="p-6 md:p-8 md:col-span-3 space-y-4 flex flex-col justify-center">
            <h4 className="font-serif text-gold font-semibold text-sm">
              Our signature red food truck trailer
            </h4>
            <div className="space-y-2">
              {activeOrder.type === "pickup" ? (
                <>
                  <p className="text-xs text-cream-dim leading-relaxed">
                    We prepare your street food fresh at our custom red food truck trailer parked in the Naperville suburbs.
                  </p>
                  <p className="text-xs text-gold font-semibold flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>Pickup location: 535 fairway dr, naperville, IL 60563</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-cream-dim leading-relaxed">
                    Our team is packing up your order fresh from the trailer kitchen. Our delivery driver is loading it into their vehicle to bring it hot and fresh.
                  </p>
                  <p className="text-xs text-gold font-semibold flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>Deliver to Name: {activeOrder.customerName}</span>
                  </p>
                </>
              )}
            </div>
            
            <div className="pt-2 border-t border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-desi-red/10 border border-desi-red/20 flex items-center justify-center text-desi-red-hover shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs tabular-nums leading-tight">
                <p className="opacity-50">Need help with this order?</p>
                <p className="text-cream hover:text-gold font-semibold mt-0.5">Call truck: (817) 900-3381</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details Accordion / Summary */}
        <div className="bg-card-black border border-white/5 p-6 rounded-lg space-y-4">
          <h3 className="text-xs tabular-nums font-semibold text-gold border-b border-white/5 pb-2">
            Items ordered
          </h3>

          <div className="space-y-3 divide-y divide-white/5">
            {activeOrder.items.map((item) => (
              <div key={`${item.id}-${item.option || ""}`} className="flex justify-between items-center pt-3 first:pt-0">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-cream">
                    {item.name}
                  </span>
                  {item.option && (
                    <span className="text-xs font-serif text-gold-light/70 block">
                      Option: {item.option}
                    </span>
                  )}
                </div>
                <div className="text-right tabular-nums text-xs">
                  <span className="text-cream-dim mr-4">Qty: {item.quantity}</span>
                  <span className="text-gold font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-baseline">
            <span className="text-xs font-semibold text-gold-light">
              Total price (incl. tax)
            </span>
            <span className="tabular-nums text-lg font-semibold text-gold">
              ${(activeOrder.totalPrice * 1.08).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Bottom Call to action */}
        <div className="text-center pt-4">
          <button
            onClick={onClose}
            className="bg-gold hover:bg-gold-hover text-dark-black font-semibold px-8 py-3 rounded text-xs transition-colors duration-200 cursor-pointer"
          >
            Keep browsing Desi Junction
          </button>
        </div>

      </div>
    </div>
  );
}
