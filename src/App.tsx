import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Location from "./components/Location";
import Catering from "./components/Catering";
import Footer from "./components/Footer";

import { useOrder } from "./context/OrderContext";
import CartOverlay from "./components/CartOverlay";
import OrderTracker from "./components/OrderTracker";
import AdminDashboard from "./components/AdminDashboard";
import { Activity, ArrowRight, Clock } from "lucide-react";

export default function App() {
  const { activeOrder, isAdminMode } = useOrder();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Auto-open tracker when an order is placed (activeOrder changes from null to object)
  useEffect(() => {
    if (activeOrder) {
      setIsTrackerOpen(true);
    }
  }, [activeOrder?.id]);

  // If in staff mode, render the Admin Terminal instead of public view
  if (isAdminMode) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-dark-black text-cream selection:bg-gold selection:text-dark-black overflow-x-hidden antialiased font-sans">
      {/* Sticky Header */}
      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenTracker={() => setIsTrackerOpen(true)} 
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Landing Section */}
        <Hero />

        {/* 2. Brand Story / About Section */}
        <About />

        {/* 3. Interactive Art Deco Menu Section */}
        <Menu />

        {/* 4. Culinary & Truck Photo Gallery */}
        <Gallery />

        {/* 5. Google Testimonials & Sentiment Section */}
        <Reviews />

        {/* 6. Active Interactive Map & Weekly Hours */}
        <Location />

        {/* 7. Fully Functional Catering Inquiry Portal */}
        <Catering />
      </main>

      {/* Detailed Operational Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <CartOverlay 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Full-Screen Tracking View */}
      {isTrackerOpen && activeOrder && (
        <OrderTracker 
          onClose={() => setIsTrackerOpen(false)} 
        />
      )}

      {/* Persistent Floating Order Tracking Bar (Visible if tracker is closed but order is active) */}
      {!isTrackerOpen && activeOrder && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-card-black border border-cream/10 p-4 rounded-lg z-40 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
            <div>
              <p className="text-xs tabular-nums text-gold">Order {activeOrder.id} Active</p>
              <p className="text-xs font-semibold text-cream">{activeOrder.status}...</p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackerOpen(true)}
            className="bg-gold hover:bg-gold-hover text-dark-black px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
          >
            <span>Track</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
