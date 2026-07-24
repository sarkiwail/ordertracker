export type OrderStatus =
  | "new"
  | "processing"
  | "ready"
  | "delivered"
  | "cancelled"
  | "on-hold";

export type Platform = "whatsapp" | "instagram" | "website";

export type PaymentMethod = "cash" | "transfer" | "pos";

export type StaffRole = "admin" | "kitchen" | "cashier" | "staff";

export type StaffStatus = "active" | "offline" | "on-break" | "busy";

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: StaffRole;
  status: StaffStatus;
  avatar?: string;
  specialties?: string[];
  activeOrders: number;
  totalOrdersCompleted: number;
  joinedAt: Date;
  permissions: string[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  notes?: string;
  totalOrders: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  platform: Platform;
  paymentMethod: PaymentMethod;
  total: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  estimatedReadyTime?: Date;
  assignedTo?: string;
  assignedStaff?: Staff;
  priority?: "normal" | "high" | "urgent";
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  readyOrders: number;
  todayRevenue: number;
  averageOrderValue: number;
  ordersByPlatform: Record<Platform, number>;
  ordersByStatus: Record<OrderStatus, number>;
  recentOrders: Order[];
}

export interface Activity {
  id: string;
  type: "order_created" | "status_changed" | "payment_received" | "note_added" | "staff_assigned";
  message: string;
  timestamp: Date;
  orderId: string;
}

export const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "New",
  processing: "Processing",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
  "on-hold": "On Hold",
};

export const PLATFORM_LABELS: Record<Platform, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  website: "Website",
};

export const STATUS_COLORS: Record<OrderStatus, string> = {
  new: "status-new",
  processing: "status-processing",
  ready: "status-ready",
  delivered: "status-delivered",
  cancelled: "status-cancelled",
  "on-hold": "status-hold",
};

export const ROLE_LABELS: Record<StaffRole, string> = {
  admin: "Admin",
  kitchen: "Kitchen",
  cashier: "Cashier",
  staff: "Staff",
};

export const STAFF_STATUS_LABELS: Record<StaffStatus, string> = {
  active: "Active",
  offline: "Offline",
  "on-break": "On Break",
  busy: "Busy",
};

export const ROLE_COLORS: Record<StaffRole, string> = {
  admin: "bg-status-new-bg text-status-new",
  kitchen: "bg-status-processing-bg text-status-processing",
  cashier: "bg-status-ready-bg text-status-ready",
  staff: "bg-surface-secondary text-text-secondary",
};

export const STAFF_STATUS_COLORS: Record<StaffStatus, string> = {
  active: "bg-status-ready",
  offline: "bg-text-muted",
  "on-break": "bg-status-processing",
  busy: "bg-status-cancelled",
};