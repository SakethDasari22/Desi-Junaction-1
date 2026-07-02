import { MenuSection, Review, BusinessHours } from "../types";

export const FOOD_MENU: MenuSection[] = [
  {
    title: "Food Menu",
    items: [
      {
        id: "street-fried-rice",
        name: "Street Style Fried Rice",
        description: "Wok-fired rice tossed with fresh mixed vegetables and rich aromatic spices.",
        options: ["veg", "paneer", "egg", "chicken", "shrimp"],
        pricePlaceholder: "$--"
      },
      {
        id: "avakay-fried-rice",
        name: "Avakay Fried Rice",
        description: "A signature spicy fried rice infused with authentic Andhra Avakaya (mango pickle) spice.",
        options: ["veg", "paneer", "egg", "chicken", "shrimp"],
        pricePlaceholder: "$--"
      },
      {
        id: "street-noodles",
        name: "Street Style Noodles",
        description: "Savory Hakka-style street noodles tossed with cabbage, bell peppers, carrots, and light soy sauce.",
        options: ["veg", "paneer", "egg", "chicken", "shrimp"],
        pricePlaceholder: "$--"
      },
      {
        id: "starters",
        name: "Starters",
        description: "Crispy fried bites wok-tossed with aromatic herbs, onions, and bold chilies.",
        options: ["jalapeno chicken", "jalapeno paneer"],
        pricePlaceholder: "$--"
      },
      {
        id: "idly",
        name: "Idly",
        description: "Soft, fluffy steamed rice cakes served with sambar and fresh homemade chutneys.",
        options: ["reg", "ghee", "ghee podi", "chicken curry", "paneer curry"],
        pricePlaceholder: "$--"
      },
      {
        id: "dosa",
        name: "Dosa",
        description: "Crispy golden crepes made from fermented rice and lentil batter.",
        options: [
          "plain",
          "onion",
          "ghee",
          "ghee podi",
          "egg",
          "paneer",
          "cheese",
          "chicken curry",
          "paneer curry"
        ],
        pricePlaceholder: "$--"
      }
    ]
  },
  {
    title: "Snacks Menu",
    items: [
      {
        id: "mirchi-bajji",
        name: "Mirchi Bajji",
        description: "Spiced green chili fritters deep-fried to golden perfection.",
        options: ["plain", "stuffed", "cut mirchi", "bajji masala"],
        pricePlaceholder: "$--"
      },
      {
        id: "egg-bonda",
        name: "Egg Bonda",
        description: "Deep-fried batter-coated hard-boiled eggs with signature street seasonings.",
        options: ["plain", "stuffed", "bajji masala"],
        pricePlaceholder: "$--"
      },
      {
        id: "chats",
        name: "Chats",
        description: "Perfectly balanced sweet, sour, spicy, and tangy street snacks.",
        options: ["samosa", "papdi chat", "pani puri", "dahi puri", "masala puri"],
        pricePlaceholder: "$--"
      },
      {
        id: "drinks",
        name: "Drinks Menu",
        description: "Refreshing cold sodas and hot cardamom tea to pair with your hot street snacks.",
        options: ["chai", "water", "thumsup", "sprite", "coke", "zeera soda"],
        pricePlaceholder: "$--"
      },
      {
        id: "fry-piece-pulav",
        name: "Fry Piece Pulav's",
        description: "Aromatic basmati rice cooked with traditional spices and topped with your choice of spiced fry.",
        options: ["paneer", "chicken", "mutton", "shrimp"],
        pricePlaceholder: "$--",
        isWeekendOnly: true
      },
      {
        id: "gongura-pulav",
        name: "Gongura Pulav's",
        description: "Tangy and spicy basmati rice cooked with premium Gongura (sorrel leaves) paste and delicious toppings.",
        options: ["paneer", "chicken", "mutton", "shrimp"],
        pricePlaceholder: "$--",
        isWeekendOnly: true
      }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Rajesh K.",
    rating: 5,
    text: "The food tastes just like home—well-seasoned, rich in flavor, and cooked with passion. Chicago's food truck scene was missing this authentic street food charm!",
    date: "2 weeks ago"
  },
  {
    id: "rev-2",
    name: "Sneha M.",
    rating: 5,
    text: "The Street Style Fried Rice is absolutely phenomenal! It has that genuine, wok-fired smoky aroma (wok-hei) that tastes exactly like authentic street stalls in India.",
    date: "1 month ago"
  },
  {
    id: "rev-3",
    name: "Amit S.",
    rating: 5,
    text: "Incredible Indo-Chinese flavors! They are spicier and carry that intense kick that is so hard to find elsewhere in the Naperville suburbs. Outstanding dosa and starters.",
    date: "3 weeks ago"
  },
  {
    id: "rev-4",
    name: "Priyanka G.",
    rating: 5,
    text: "A super chill, casual outdoor spot to catch up with friends. The food is made-to-order, hot, and unbelievably fresh. The premium ingredients are totally worth the premium price!",
    date: "2 months ago"
  }
];

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: "Monday", hours: "3:00 PM – 9:00 PM", isClosed: false },
  { day: "Tuesday", hours: "Closed", isClosed: true },
  { day: "Wednesday", hours: "3:00 PM – 9:00 PM", isClosed: false },
  { day: "Thursday", hours: "3:00 PM – 9:00 PM", isClosed: false },
  { day: "Friday", hours: "3:00 PM – 9:00 PM", isClosed: false },
  { day: "Saturday", hours: "12:00 PM – 9:00 PM", isClosed: false },
  { day: "Sunday", hours: "12:00 PM – 9:00 PM", isClosed: false }
];

export const CONTACT_INFO = {
  name: "Desi Junction",
  tagline: "Chicago's First Indian Street Food Truck",
  address: "535 Fairway Dr, Naperville, IL 60563",
  googleMapsUrl: "https://maps.app.goo.gl/q3Pv5w8G8B7HBcif9",
  phoneCatering: "(331) 329-6940",
  phoneOrder: "(817) 900-3381",
  uberEatsUrl: "https://www.ubereats.com/store/desi-junction-535-fairway-dr/zUrHlk5fWGi4tlOooeb7TQ",
  grubhubUrl: "https://www.seamless.com/menu/desi-junction-535-fairway-dr-suite-127-naperville/13317584"
};
