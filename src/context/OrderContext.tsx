import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Order, OrderItem, OrderStatus } from "../types";

export const getDefaultPrice = (itemId: string): number => {
  switch (itemId) {
    case "street-fried-rice": return 14.99;
    case "avakay-fried-rice": return 15.99;
    case "street-noodles": return 13.99;
    case "starters": return 12.99;
    case "idly": return 8.99;
    case "dosa": return 11.99;
    case "mirchi-bajji": return 7.99;
    case "egg-bonda": return 8.49;
    case "chats": return 9.99;
    case "drinks": return 2.50;
    case "fry-piece-pulav": return 16.99;
    case "gongura-pulav": return 15.99;
    default: return 9.99;
  }
};

interface OrderContextProps {
  cart: OrderItem[];
  addToCart: (item: { id: string; name: string }, option?: string, customPrice?: number) => void;
  removeFromCart: (itemId: string, option?: string) => void;
  updateQuantity: (itemId: string, option: string | undefined, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  placeOrder: (customer: { name: string; phone: string; email?: string; type: "pickup" | "delivery" }) => Promise<Order>;
  
  activeOrder: Order | null;
  trackOrder: (orderId: string) => void;
  clearTracking: () => void;
  
  adminOrders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  
  isConnected: boolean;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [adminOrders, setAdminOrders] = useState<Order[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("desi_junction_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from storage", e);
      }
    }

    // Load active tracked order if any
    const savedTrackedId = localStorage.getItem("desi_junction_tracked_id");
    if (savedTrackedId) {
      fetchOrderDetails(savedTrackedId).then((order) => {
        if (order && order.status !== "Completed") {
          setActiveOrder(order);
        }
      });
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("desi_junction_cart", JSON.stringify(cart));
  }, [cart]);

  // Handle WebSocket Connection with Silent Fallback
  useEffect(() => {
    function connect() {
      if (socketRef.current) {
        socketRef.current.close();
      }

      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}`;
      console.log(`Connecting to WebSocket at ${wsUrl}`);
      
      try {
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
          setIsConnected(true);
          console.log("WebSocket Connection Established");

          // Re-subscribe if we have an active order or are in admin mode
          if (activeOrder) {
            socket.send(JSON.stringify({ type: "subscribe", orderId: activeOrder.id }));
          }
          if (isAdminMode) {
            socket.send(JSON.stringify({ type: "subscribe-admin" }));
          }
        };

        socket.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log("WS Message received:", message);

            switch (message.type) {
              case "order-update":
                // Update the active tracking order if IDs match
                if (activeOrder && activeOrder.id === message.order.id) {
                  setActiveOrder(message.order);
                }
                // Update in admin list as well
                setAdminOrders((prev) => 
                  prev.map((o) => o.id === message.order.id ? message.order : o)
                );
                break;

              case "order-created":
                // New order placed - notify admin list
                setAdminOrders((prev) => {
                  if (prev.some((o) => o.id === message.order.id)) return prev;
                  return [message.order, ...prev];
                });
                break;

              case "orders-list":
                // Received full list for admin
                setAdminOrders(message.orders);
                break;

              default:
                break;
            }
          } catch (err) {
            console.error("Error parsing socket message:", err);
          }
        };

        socket.onclose = () => {
          setIsConnected(false);
          console.log("WebSocket Connection Closed. Reconnecting...");
          reconnectTimeoutRef.current = window.setTimeout(connect, 10000); // Relaxed reconnect interval
        };

        socket.onerror = () => {
          // Suppress loud error messages in development/sandboxed environment.
          // Polling fallback is active.
          setIsConnected(false);
        };
      } catch (wsError) {
        setIsConnected(false);
      }
    }

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [activeOrder?.id, isAdminMode]);

  // Graceful HTTP Polling Fallback as backup to WebSocket channel
  useEffect(() => {
    let intervalId: number | undefined;

    const pollData = async () => {
      // 1. If tracking active order, fetch status
      if (activeOrder) {
        try {
          const res = await fetch(`/api/orders/${activeOrder.id}`);
          if (res.ok) {
            const updatedOrder: Order = await res.json();
            if (JSON.stringify(updatedOrder) !== JSON.stringify(activeOrder)) {
              setActiveOrder(updatedOrder);
            }
            setIsConnected(true);
          }
        } catch (err) {
          // Handle silent failure
        }
      }

      // 2. If in admin mode, fetch all orders
      if (isAdminMode) {
        try {
          const res = await fetch("/api/orders");
          if (res.ok) {
            const currentOrders: Order[] = await res.json();
            setAdminOrders((prev) => {
              if (JSON.stringify(prev) !== JSON.stringify(currentOrders)) {
                return currentOrders;
              }
              return prev;
            });
            setIsConnected(true);
          }
        } catch (err) {
          // Handle silent failure
        }
      }
    };

    // Run poll immediately and then every 4 seconds
    pollData();
    intervalId = window.setInterval(pollData, 4000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeOrder?.id, isAdminMode]);

  // Fetch specific order details helper
  async function fetchOrderDetails(orderId: string): Promise<Order | null> {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
    return null;
  }

  // Cart Management
  const addToCart = (item: { id: string; name: string }, option?: string, customPrice?: number) => {
    setCart((prevCart) => {
      // Check if item with same option already exists
      const existingIndex = prevCart.findIndex(
        (i) => i.id === item.id && i.option === option
      );

      const resolvedPrice = customPrice !== undefined ? customPrice : getDefaultPrice(item.id);

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: item.id,
            name: item.name,
            option,
            price: resolvedPrice,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId: string, option?: string) => {
    setCart((prevCart) =>
      prevCart.filter((i) => !(i.id === itemId && i.option === option))
    );
  };

  const updateQuantity = (itemId: string, option: string | undefined, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((i) => {
          if (i.id === itemId && i.option === option) {
            const nextQty = i.quantity + delta;
            return { ...i, quantity: nextQty };
          }
          return i;
        })
        .filter((i) => i.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Place Order API Integration
  const placeOrder = async (customer: { name: string; phone: string; email?: string; type: "pickup" | "delivery" }) => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email,
          items: cart,
          type: customer.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const createdOrder: Order = await response.json();
      
      // Save order tracking to client state
      setActiveOrder(createdOrder);
      localStorage.setItem("desi_junction_tracked_id", createdOrder.id);
      
      // Send subscription packet over active socket
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: "subscribe", orderId: createdOrder.id }));
      }

      // Clear local shopping cart
      clearCart();
      return createdOrder;
    } catch (err) {
      console.error("Error placing order:", err);
      throw err;
    }
  };

  // Tracking Management
  const trackOrder = (orderId: string) => {
    fetchOrderDetails(orderId).then((order) => {
      if (order) {
        setActiveOrder(order);
        localStorage.setItem("desi_junction_tracked_id", order.id);
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({ type: "subscribe", orderId: order.id }));
        }
      } else {
        alert("Order not found or could not be loaded.");
      }
    });
  };

  const clearTracking = () => {
    setActiveOrder(null);
    localStorage.removeItem("desi_junction_tracked_id");
  };

  // Admin Operations
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updated: Order = await response.json();
      
      // Update in local list
      setAdminOrders((prev) => prev.map((o) => o.id === orderId ? updated : o));
      
      // Update tracking state locally as well if this was our order too
      if (activeOrder && activeOrder.id === orderId) {
        setActiveOrder(updated);
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      throw err;
    }
  };

  // Request admin list when entering admin mode
  useEffect(() => {
    if (isAdminMode && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type: "subscribe-admin" }));
    }
  }, [isAdminMode]);

  return (
    <OrderContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        placeOrder,
        activeOrder,
        trackOrder,
        clearTracking,
        adminOrders,
        updateOrderStatus,
        isAdminMode,
        setIsAdminMode,
        isConnected,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
