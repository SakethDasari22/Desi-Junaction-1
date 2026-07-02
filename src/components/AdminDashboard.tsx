import React, { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import { X, RefreshCw, Phone, Mail, MapPin, Truck, Check, Clock, Utensils, ClipboardList, CheckSquare, Square } from "lucide-react";
import { Order, OrderStatus } from "../types";
import { IMAGES } from "../data/assets";

export default function AdminDashboard() {
  const { adminOrders, updateOrderStatus, setIsAdminMode, isConnected } = useOrder();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"active" | "all">("active");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Select the first order in the filtered list if none is selected
  const filteredOrders = adminOrders.filter((order) => {
    if (filter === "active") return order.status !== "Completed";
    return true;
  });

  useEffect(() => {
    if (filteredOrders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(filteredOrders[0].id);
    }
  }, [filteredOrders, selectedOrderId]);

  const selectedOrder = adminOrders.find((o) => o.id === selectedOrderId);

  const toggleItemCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case "Received":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Preparing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Ready for Pickup":
      case "Out for Delivery":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Completed":
        return "bg-white/5 text-cream-dim/50 border-white/5";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-black flex flex-col font-sans text-cream">
      {/* Top Admin Header */}
      <header className="h-18 border-b border-gold/20 flex items-center justify-between px-6 bg-card-black shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-desi-red text-white font-serif font-bold text-lg">
            DJ
          </div>
          <div>
            <h1 className="text-gold font-display text-base tracking-widest font-extrabold uppercase">
              Desi Junction • Staff POS Terminal
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
              Real-time Food Truck Order Controller
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* WS Connection Status */}
          <div className="flex items-center space-x-2 bg-dark-black/60 border border-white/5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
            <span>
              {isConnected ? "Kitchen Server Connected" : "Reconnecting server..."}
            </span>
          </div>

          <button
            onClick={() => setIsAdminMode(false)}
            className="bg-desi-red hover:bg-desi-red-hover text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center space-x-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </header>

      {/* Main Container splits Sidebar and Detail */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* Left Side: Orders Sidebar list */}
        <aside className="w-96 border-r border-gold/15 bg-card-black/50 flex flex-col shrink-0 overflow-hidden">
          {/* Filter Bar */}
          <div className="p-4 border-b border-white/5 bg-dark-black/40 grid grid-cols-2 gap-2">
            <button
              onClick={() => setFilter("active")}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
                filter === "active"
                  ? "bg-gold border-gold text-dark-black font-extrabold"
                  : "border-white/5 text-cream-dim hover:text-cream bg-dark-black/20"
              }`}
            >
              Active ({adminOrders.filter((o) => o.status !== "Completed").length})
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all ${
                filter === "all"
                  ? "bg-gold border-gold text-dark-black font-extrabold"
                  : "border-white/5 text-cream-dim hover:text-cream bg-dark-black/20"
              }`}
            >
              All Orders ({adminOrders.length})
            </button>
          </div>

          {/* Orders Scrollable List */}
          <div className="flex-grow overflow-y-auto no-scrollbar divide-y divide-white/5">
            {filteredOrders.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <ClipboardList className="w-10 h-10 text-gold/20 mx-auto stroke-1" />
                <p className="text-xs text-cream-dim/60">No orders matching this filter.</p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = order.id === selectedOrderId;
                const date = new Date(order.createdAt);
                const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

                return (
                  <button
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`w-full p-4 text-left border-l-4 transition-all hover:bg-gold/5 flex flex-col gap-2 ${
                      isSelected
                        ? "bg-gold/10 border-gold"
                        : "border-transparent bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold tracking-wider text-gold">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-cream-dim/50 font-mono">
                        {timeString}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-cream tracking-wide">
                        {order.customerName}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-cream-dim flex items-center gap-1">
                        {order.type === "pickup" ? (
                          <>
                            <Utensils className="w-3 h-3 text-gold/60" />
                            <span>Pickup</span>
                          </>
                        ) : (
                          <>
                            <Truck className="w-3 h-3 text-desi-red-hover" />
                            <span>Delivery</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-cream-dim/60">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items • ${(order.totalPrice * 1.08).toFixed(2)}
                      </span>
                      <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Side: Order Detail Management Pane */}
        <main className="flex-grow bg-dark-black p-6 sm:p-8 overflow-y-auto no-scrollbar">
          {selectedOrder ? (
            <div className="max-w-3xl mx-auto space-y-6">
              
              {/* Heading Panel */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold/15 pb-6 gap-4">
                <div className="space-y-1">
                  <span className="font-accent text-xs tracking-widest text-gold uppercase block">
                    MANAGE ACTIVE ORDER
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-cream uppercase tracking-wider">
                    Order {selectedOrder.id}
                  </h2>
                  <p className="text-xs text-cream-dim/60">
                    Received on {new Date(selectedOrder.createdAt).toLocaleDateString()} at {new Date(selectedOrder.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-[10px] text-cream-dim/50 uppercase tracking-widest block">
                    Current Status
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded border ${getStatusBadgeColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Update Actions - Quick Stepper Buttons */}
              <div className="bg-card-black border border-gold/10 p-5 rounded-lg space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold border-b border-white/5 pb-2">
                  Kitchen Controller Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    disabled={selectedOrder.status === "Preparing" || selectedOrder.status === "Completed"}
                    onClick={() => updateOrderStatus(selectedOrder.id, "Preparing")}
                    className="py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25 disabled:opacity-30 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Utensils className="w-4 h-4" />
                    <span>Start Preparing</span>
                  </button>

                  <button
                    disabled={selectedOrder.status === "Ready for Pickup" || selectedOrder.status === "Out for Delivery" || selectedOrder.status === "Completed"}
                    onClick={() => updateOrderStatus(selectedOrder.id, selectedOrder.type === "pickup" ? "Ready for Pickup" : "Out for Delivery")}
                    className="py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/25 disabled:opacity-30 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{selectedOrder.type === "pickup" ? "Mark Ready for Pickup" : "Mark Out for Delivery"}</span>
                  </button>

                  <button
                    disabled={selectedOrder.status === "Completed"}
                    onClick={() => updateOrderStatus(selectedOrder.id, "Completed")}
                    className="py-3 px-4 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/25 disabled:opacity-30 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Complete Order</span>
                  </button>
                </div>
              </div>

              {/* Grid of details: Customer & Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Customer Card */}
                <div className="bg-card-black border border-white/5 p-5 rounded-lg space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold border-b border-white/5 pb-2">
                    Customer & Dispatch Info
                  </h3>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cream">
                        C
                      </div>
                      <div>
                        <p className="opacity-45 text-[9px] uppercase tracking-wider">CLIENT NAME</p>
                        <p className="font-bold text-cream uppercase">{selectedOrder.customerName}</p>
                      </div>
                    </div>

                    <a
                      href={`tel:${selectedOrder.customerPhone}`}
                      className="flex items-center space-x-3 text-xs hover:bg-gold/5 p-1 rounded-md transition-all group"
                    >
                      <div className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-gold group-hover:border-gold/30">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="opacity-45 text-[9px] uppercase tracking-wider">PHONE NUMBER</p>
                        <p className="font-bold text-cream group-hover:text-gold transition-colors">{selectedOrder.customerPhone}</p>
                      </div>
                    </a>

                    {selectedOrder.customerEmail && (
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cream">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="opacity-45 text-[9px] uppercase tracking-wider">EMAIL ADDRESS</p>
                          <p className="font-bold text-cream text-wrap truncate">{selectedOrder.customerEmail}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 text-xs pt-1">
                      <div className="w-7 h-7 rounded bg-white/5 border border-white/10 flex items-center justify-center text-cream">
                        {selectedOrder.type === "pickup" ? <Utensils className="w-3.5 h-3.5 text-gold" /> : <Truck className="w-3.5 h-3.5 text-desi-red-hover" />}
                      </div>
                      <div>
                        <p className="opacity-45 text-[9px] uppercase tracking-wider">DISPATCH TYPE</p>
                        <p className="font-bold uppercase text-cream">
                          {selectedOrder.type === "pickup" ? "Customer Pickup" : "Delivery to Door"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checklist Prep card */}
                <div className="bg-card-black border border-white/5 p-5 rounded-lg space-y-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold border-b border-white/5 pb-2">
                    Assembly Checklist
                  </h3>

                  <div className="space-y-2.5">
                    {selectedOrder.items.map((item, idx) => {
                      const itemKey = `${selectedOrder.id}-${item.id}-${item.option || "def"}-${idx}`;
                      const isChecked = !!checkedItems[itemKey];

                      return (
                        <button
                          key={itemKey}
                          onClick={() => toggleItemCheck(itemKey)}
                          className={`w-full p-2.5 text-left rounded-md border flex items-center justify-between transition-all cursor-pointer ${
                            isChecked
                              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                              : "bg-dark-black/40 border-white/5 text-cream hover:border-gold/20"
                          }`}
                        >
                          <div className="space-y-0.5">
                            <span className={`text-xs font-bold uppercase tracking-wide block ${isChecked ? "line-through opacity-50" : ""}`}>
                              {item.name}
                            </span>
                            {item.option && (
                              <span className="text-[10px] font-serif italic opacity-70 block">
                                Option: {item.option}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center space-x-3 shrink-0">
                            <span className="text-xs font-mono font-bold bg-dark-black px-2 py-1 rounded">
                              QTY: {item.quantity}
                            </span>
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 opacity-30" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Order Cost Breakdown */}
              <div className="bg-card-black border border-white/5 p-5 rounded-lg space-y-2 text-xs">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold border-b border-white/5 pb-2 mb-3">
                  Bill Summary
                </h3>
                <div className="flex justify-between opacity-70">
                  <span>Subtotal</span>
                  <span className="font-mono">${selectedOrder.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between opacity-70">
                  <span>Sales Tax (8%)</span>
                  <span className="font-mono">${(selectedOrder.totalPrice * 0.08).toFixed(2)}</span>
                </div>
                {selectedOrder.type === "delivery" && (
                  <div className="flex justify-between opacity-70">
                    <span>Delivery Runner Surcharge (Cash on Delivery)</span>
                    <span className="font-mono text-amber-400">$3.99 COD</span>
                  </div>
                )}
                <div className="flex justify-between text-gold font-bold text-sm border-t border-white/5 pt-2 mt-2 uppercase tracking-wide">
                  <span>Grand Total</span>
                  <span className="font-mono">${(selectedOrder.totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ClipboardList className="w-16 h-16 text-gold/30 stroke-1" />
              <div className="space-y-1">
                <h3 className="font-display text-gold uppercase tracking-widest text-sm font-bold">No Order Selected</h3>
                <p className="text-xs text-cream-dim/70 max-w-[280px]">Please select an incoming order from the left sidebar panel to begin preparing and managing status.</p>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
