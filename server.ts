import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Order, OrderStatus } from "./src/types";

// Seed active orders for demonstration
let orders: Order[] = [
  {
    id: "DJ-1001",
    customerName: "Rahul Sharma",
    customerPhone: "(630) 555-1234",
    items: [
      { id: "street_fried_rice", name: "Street Style Fried Rice", option: "Chicken", price: 14.99, quantity: 1 },
      { id: "ghee_podi_idly", name: "Ghee Podi Idly", price: 8.99, quantity: 2 }
    ],
    totalPrice: 32.97,
    status: "Completed",
    type: "pickup",
    createdAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "DJ-1002",
    customerName: "Anjali Patel",
    customerPhone: "(331) 555-5678",
    items: [
      { id: "paneer_curry_dosa", name: "Paneer Curry Dosa", price: 13.99, quantity: 1 },
      { id: "samosa_chat", name: "Samosa Chat", price: 9.99, quantity: 1 }
    ],
    totalPrice: 23.98,
    status: "Preparing",
    type: "pickup",
    createdAt: new Date(Date.now() - 1200000).toISOString(), // 20 mins ago
    updatedAt: new Date(Date.now() - 1200000).toISOString()
  },
  {
    id: "DJ-1003",
    customerName: "Michael Chang",
    customerPhone: "(815) 555-9012",
    items: [
      { id: "avakay_fried_rice", name: "Avakay Fried Rice", option: "Paneer", price: 15.99, quantity: 1 },
      { id: "pani_puri", name: "Pani Puri", price: 8.99, quantity: 1 }
    ],
    totalPrice: 24.98,
    status: "Received",
    type: "delivery",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to generate next Order ID
let orderCounter = 1004;
function generateOrderId(): string {
  return `DJ-${orderCounter++}`;
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json());

  // WebSocket connection state
  interface ClientSubscription {
    socket: WebSocket;
    orderId?: string;
    isAdmin: boolean;
  }
  const clients = new Set<ClientSubscription>();

  wss.on("connection", (ws) => {
    const client: ClientSubscription = { socket: ws, isAdmin: false };
    clients.add(client);

    ws.on("message", (messageStr) => {
      try {
        const message = JSON.parse(messageStr.toString());

        if (message.type === "subscribe") {
          client.orderId = message.orderId;
          // Send current state of this order immediately if found
          const order = orders.find((o) => o.id === message.orderId);
          if (order) {
            ws.send(JSON.stringify({ type: "order-update", order }));
          }
        } else if (message.type === "subscribe-admin") {
          client.isAdmin = true;
          // Send all orders to newly connected admin
          ws.send(JSON.stringify({ type: "orders-list", orders }));
        }
      } catch (err) {
        console.error("Error processing websocket message:", err);
      }
    });

    ws.on("close", () => {
      clients.delete(client);
    });
  });

  // Broadcast helper
  function broadcastOrderUpdate(order: Order, isNew: boolean = false) {
    const updateMsg = JSON.stringify({
      type: isNew ? "order-created" : "order-update",
      order
    });

    for (const client of clients) {
      if (client.socket.readyState === WebSocket.OPEN) {
        if (client.isAdmin || client.orderId === order.id) {
          client.socket.send(updateMsg);
        }
      }
    }
  }

  // API Routes
  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  app.get("/api/orders/:id", (req, res) => {
    const order = orders.find((o) => o.id === req.params.id);
    if (!order) {
      res.status(404).json({ error: "Order not found" });
    } else {
      res.json(order);
    }
  });

  app.post("/api/orders", (req, res) => {
    const { customerName, customerPhone, customerEmail, items, type } = req.body;

    if (!customerName || !customerPhone || !items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Invalid order data" });
      return;
    }

    const totalPrice = items.reduce((sum: number, item: any) => sum + (Number(item.price) * Number(item.quantity)), 0);

    const newOrder: Order = {
      id: generateOrderId(),
      customerName,
      customerPhone,
      customerEmail,
      items,
      totalPrice: Number(totalPrice.toFixed(2)),
      status: "Received",
      type: type || "pickup",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    orders.unshift(newOrder); // Add to beginning
    broadcastOrderUpdate(newOrder, true);

    res.status(201).json(newOrder);
  });

  app.patch("/api/orders/:id", (req, res) => {
    const { status } = req.body;
    const orderIndex = orders.findIndex((o) => o.id === req.params.id);

    if (orderIndex === -1) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    const allowedStatuses: OrderStatus[] = ["Received", "Preparing", "Out for Delivery", "Ready for Pickup", "Completed"];
    if (!allowedStatuses.includes(status)) {
      res.status(400).json({ error: "Invalid status value" });
      return;
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    broadcastOrderUpdate(orders[orderIndex], false);
    res.json(orders[orderIndex]);
  });

  // Handle Vite Asset Serving & Development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
