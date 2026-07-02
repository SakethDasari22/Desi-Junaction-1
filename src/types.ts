export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  options?: string[]; // e.g., ["veg", "paneer", "egg", "chicken", "shrimp"]
  pricePlaceholder?: string; // e.g., "$--" or "TBD"
  isWeekendOnly?: boolean;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface BusinessHours {
  day: string;
  hours: string;
  isClosed: boolean;
}

export type OrderStatus = "Received" | "Preparing" | "Out for Delivery" | "Ready for Pickup" | "Completed";

export interface OrderItem {
  id: string;
  name: string;
  option?: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  type: "pickup" | "delivery";
  createdAt: string;
  updatedAt: string;
}

