import { Staff, StaffRole, StaffStatus } from "@/types";

export const mockStaff: Staff[] = [
  {
    id: "staff-1",
    name: "Admin",
    email: "admin@shawarma.com",
    phone: "+234 800 000 0001",
    role: "admin",
    status: "active",
    specialties: ["Management", "All Areas"],
    activeOrders: 0,
    totalOrdersCompleted: 156,
    joinedAt: new Date("2024-01-15"),
    permissions: ["all"],
  },
  {
    id: "staff-2",
    name: "Chef Kofi",
    email: "kofi@shawarma.com",
    phone: "+234 800 000 0002",
    role: "kitchen",
    status: "active",
    specialties: ["Grill", "Wrap Preparation", "Sauce Making"],
    activeOrders: 3,
    totalOrdersCompleted: 423,
    joinedAt: new Date("2024-02-20"),
    permissions: ["view_orders", "update_status", "mark_ready"],
  },
  {
    id: "staff-3",
    name: "Maria Santos",
    email: "maria@shawarma.com",
    phone: "+234 800 000 0003",
    role: "cashier",
    status: "busy",
    specialties: ["POS", "Customer Service", "Payments"],
    activeOrders: 2,
    totalOrdersCompleted: 289,
    joinedAt: new Date("2024-03-10"),
    permissions: ["view_orders", "process_payment", "create_orders"],
  },
  {
    id: "staff-4",
    name: "John Doe",
    email: "john@shawarma.com",
    phone: "+234 800 000 0004",
    role: "staff",
    status: "offline",
    specialties: ["Food Prep", "Cleaning"],
    activeOrders: 0,
    totalOrdersCompleted: 87,
    joinedAt: new Date("2024-06-01"),
    permissions: ["view_orders"],
  },
  {
    id: "staff-5",
    name: "Aisha Bello",
    email: "aisha@shawarma.com",
    role: "kitchen",
    status: "active",
    specialties: ["Grill", "Plating", "Quality Check"],
    activeOrders: 1,
    totalOrdersCompleted: 198,
    joinedAt: new Date("2024-04-15"),
    permissions: ["view_orders", "update_status", "mark_ready"],
  },
  {
    id: "staff-6",
    name: "Emeka Okafor",
    email: "emeka@shawarma.com",
    role: "kitchen",
    status: "on-break",
    specialties: ["Wrap Preparation", "Fries", "Sauces"],
    activeOrders: 1,
    totalOrdersCompleted: 312,
    joinedAt: new Date("2024-03-01"),
    permissions: ["view_orders", "update_status"],
  },
];

export function getStaffByRole(role: StaffRole): Staff[] {
  return mockStaff.filter((s) => s.role === role);
}

export function getStaffByStatus(status: StaffStatus): Staff[] {
  return mockStaff.filter((s) => s.status === status);
}

export function getAvailableStaff(): Staff[] {
  return mockStaff.filter((s) => s.status === "active" && s.role !== "admin");
}

export function getKitchenStaff(): Staff[] {
  return mockStaff.filter((s) => s.role === "kitchen" && s.status === "active");
}

export function getStaffById(id: string): Staff | undefined {
  return mockStaff.find((s) => s.id === id);
}

export function updateStaffStatus(id: string, status: StaffStatus): void {
  const staff = mockStaff.find((s) => s.id === id);
  if (staff) {
    staff.status = status;
  }
}

export function updateStaffActiveOrders(id: string, delta: number): void {
  const staff = mockStaff.find((s) => s.id === id);
  if (staff) {
    staff.activeOrders = Math.max(0, staff.activeOrders + delta);
    if (delta > 0) {
      staff.totalOrdersCompleted += delta;
    }
  }
}

export function addStaff(staff: Staff): void {
  mockStaff.push(staff);
}

export function removeStaff(id: string): void {
  const index = mockStaff.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStaff.splice(index, 1);
  }
}