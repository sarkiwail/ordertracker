import { Order, DashboardStats, Activity } from "@/types";

const menuItems = [
  "Classic Shawarma Wrap",
  "Chicken Shawarma Plate",
  "Beef Shawarma Wrap",
  "Mixed Shawarma Plate",
  "Falafel Wrap",
  "Shawarma Salad Bowl",
  "Garlic Sauce (Extra)",
  "Spicy Sauce (Extra)",
  "Fries (Large)",
  "Soft Drink",
  "Water Bottle",
  "Mango Juice",
  "Laban (Yogurt Drink)",
  "Extra Pita Bread",
  "Hummus Plate",
  "Baba Ghanoush",
];

const customerNames = [
  "Ahmed Hassan",
  "Fatima Al-Rashid",
  "Omar Abdallah",
  "Layla Mahmoud",
  "Yusuf Ibrahim",
  "Aisha Okafor",
  "Mohammed Ali",
  "Zainab Bello",
  "Khalid Usman",
  "Mariam Adeyemi",
  "Hassan Balogun",
  "Nadia Saleh",
];

const phoneNumbers = [
  "+234 802 345 6789",
  "+234 803 456 7890",
  "+234 805 678 9012",
  "+234 806 789 0123",
  "+234 808 901 2345",
  "+234 809 012 3456",
];

const addresses = [
  "42 Ahmadu Bello Way, Garki, Abuja",
  "15 Awolowo Road, Ikoyi, Lagos",
  "78 Airport Road, Uyo, Akwa Ibom",
  "23 Herbert Macaulay Way, Yaba, Lagos",
  "10 Independence Avenue, Central District, Abuja",
  "55 Tafawa Balewa Square, Lagos Island",
  "8 Sultan Road, Kaduna",
  "31 Stadium Road, Port Harcourt",
];

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysBack: number): Date {
  const now = Date.now();
  const past = now - daysBack * 24 * 60 * 60 * 1000;
  return new Date(past + Math.random() * (now - past));
}

function generateOrder(index: number): Order {
  const statuses: Order["status"][] = [
    "new",
    "processing",
    "ready",
    "delivered",
    "cancelled",
    "on-hold",
  ];
  const platforms: Order["platform"][] = ["whatsapp", "instagram", "website"];
  const paymentMethods: Order["paymentMethod"][] = ["cash", "transfer", "pos"];

  const itemCount = randomBetween(1, 4);
  const items = Array.from({ length: itemCount }, (_, i) => {
    const price = randomBetween(1500, 8500);
    return {
      id: `item-${index}-${i}`,
      name: randomItem(menuItems),
      quantity: randomBetween(1, 3),
      price,
    };
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const customerName = randomItem(customerNames);
  const status = statuses[Math.min(index, statuses.length - 1)];

  const createdAt = randomDate(7);
  const updatedAt = new Date(createdAt.getTime() + randomBetween(5, 120) * 60000);

  return {
    id: `ord-${1000 + index}`,
    orderNumber: `ORD-${String(1000 + index).slice(-4)}`,
    customer: {
      id: `cust-${index}`,
      name: customerName,
      phone: randomItem(phoneNumbers),
      address: randomItem(addresses),
      totalOrders: randomBetween(1, 25),
    },
    items,
    status,
    platform: randomItem(platforms),
    paymentMethod: randomItem(paymentMethods),
    total,
    paid: status === "delivered" || Math.random() > 0.3,
    createdAt,
    updatedAt,
    notes: Math.random() > 0.7 ? "No onions, extra garlic sauce please." : undefined,
    estimatedReadyTime:
      status === "processing" || status === "new"
        ? new Date(Date.now() + randomBetween(10, 40) * 60000)
        : undefined,
    assignedTo: Math.random() > 0.5 ? "Chef Kofi" : undefined,
  };
}

// Generate 50 orders
export const mockOrders: Order[] = Array.from({ length: 50 }, (_, i) =>
  generateOrder(i)
).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

// Update some orders to be very recent for realistic "new" orders
const recentOrderIndices = [0, 1, 2, 3, 4, 5];
recentOrderIndices.forEach((i) => {
  if (mockOrders[i]) {
    mockOrders[i] = {
      ...mockOrders[i],
      status: "new" as const,
      createdAt: new Date(Date.now() - randomBetween(2, 30) * 60000),
      updatedAt: new Date(Date.now() - randomBetween(1, 5) * 60000),
    };
  }
});

export function getOrdersByStatus(status: Order["status"]): Order[] {
  return mockOrders.filter((o) => o.status === status);
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id || o.orderNumber === id);
}

export const dashboardStats: DashboardStats = {
  totalOrders: mockOrders.length,
  pendingOrders: getOrdersByStatus("new").length,
  processingOrders: getOrdersByStatus("processing").length,
  readyOrders: getOrdersByStatus("ready").length,
  todayRevenue: mockOrders
    .filter(
      (o) =>
        o.createdAt.toDateString() === new Date().toDateString() && o.paid
    )
    .reduce((sum, o) => sum + o.total, 0),
  averageOrderValue: Math.round(
    mockOrders.reduce((sum, o) => sum + o.total, 0) / mockOrders.length
  ),
  ordersByPlatform: {
    whatsapp: mockOrders.filter((o) => o.platform === "whatsapp").length,
    instagram: mockOrders.filter((o) => o.platform === "instagram").length,
    website: mockOrders.filter((o) => o.platform === "website").length,
  },
  ordersByStatus: {
    new: getOrdersByStatus("new").length,
    processing: getOrdersByStatus("processing").length,
    ready: getOrdersByStatus("ready").length,
    delivered: getOrdersByStatus("delivered").length,
    cancelled: getOrdersByStatus("cancelled").length,
    "on-hold": getOrdersByStatus("on-hold").length,
  },
  recentOrders: mockOrders.slice(0, 8),
};

export const recentActivity: Activity[] = [
  {
    id: "act-1",
    type: "order_created",
    message: "New order from Ahmed Hassan via WhatsApp",
    timestamp: new Date(Date.now() - 2 * 60000),
    orderId: "ord-1000",
  },
  {
    id: "act-2",
    type: "status_changed",
    message: "Order ORD-1001 is now being prepared",
    timestamp: new Date(Date.now() - 8 * 60000),
    orderId: "ord-1001",
  },
  {
    id: "act-3",
    type: "payment_received",
    message: "Payment of ₦4,500 confirmed for ORD-1002",
    timestamp: new Date(Date.now() - 15 * 60000),
    orderId: "ord-1002",
  },
  {
    id: "act-4",
    type: "order_created",
    message: "New order from Fatima Al-Rashid via Instagram",
    timestamp: new Date(Date.now() - 20 * 60000),
    orderId: "ord-1003",
  },
  {
    id: "act-5",
    type: "status_changed",
    message: "Order ORD-1004 is ready for pickup",
    timestamp: new Date(Date.now() - 30 * 60000),
    orderId: "ord-1004",
  },
  {
    id: "act-6",
    type: "note_added",
    message: "Customer requested extra garlic sauce for ORD-1005",
    timestamp: new Date(Date.now() - 45 * 60000),
    orderId: "ord-1005",
  },
  {
    id: "act-7",
    type: "order_created",
    message: "New order from Yusuf Ibrahim via Website",
    timestamp: new Date(Date.now() - 60 * 60000),
    orderId: "ord-1006",
  },
  {
    id: "act-8",
    type: "status_changed",
    message: "Order ORD-1007 marked as delivered",
    timestamp: new Date(Date.now() - 90 * 60000),
    orderId: "ord-1007",
  },
];