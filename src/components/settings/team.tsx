"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  mockStaff,
  addStaff,
  removeStaff,
  updateStaffStatus,
} from "@/data/mock-staff";
import type { Staff, StaffRole, StaffStatus } from "@/types";
import { ROLE_LABELS, STAFF_STATUS_LABELS, ROLE_COLORS, STAFF_STATUS_COLORS } from "@/types";
import {
  Shield,
  Plus,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  UserX,
  Phone,
  Mail,
  ChefHat,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const roleOptions = [
  { value: "kitchen", label: "Kitchen" },
  { value: "cashier", label: "Cashier" },
  { value: "staff", label: "Staff" },
  { value: "admin", label: "Admin" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "offline", label: "Offline" },
  { value: "on-break", label: "On Break" },
  { value: "busy", label: "Busy" },
];

export function TeamPermissions() {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [showInvite, setShowInvite] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "kitchen" as StaffRole,
  });

  const handleInvite = () => {
    if (!inviteForm.name || !inviteForm.email) return;
    const newStaff: Staff = {
      id: `staff-${Date.now()}`,
      name: inviteForm.name,
      email: inviteForm.email,
      phone: inviteForm.phone || undefined,
      role: inviteForm.role,
      status: "active",
      specialties: [],
      activeOrders: 0,
      totalOrdersCompleted: 0,
      joinedAt: new Date(),
      permissions: ["view_orders"],
    };
    addStaff(newStaff);
    setStaff([...mockStaff]);
    setInviteForm({ name: "", email: "", phone: "", role: "kitchen" });
    setShowInvite(false);
  };

  const handleRemoveStaff = (id: string) => {
    removeStaff(id);
    setStaff([...mockStaff]);
  };

  const handleStatusChange = (id: string, status: StaffStatus) => {
    updateStaffStatus(id, status);
    setStaff([...mockStaff]);
  };

  const filteredStaff =
    filterRole === "all"
      ? staff
      : staff.filter((s) => s.role === filterRole);

  const staffSummary = {
    total: staff.length,
    active: staff.filter((s) => s.status === "active").length,
    kitchen: staff.filter((s) => s.role === "kitchen").length,
    busy: staff.filter((s) => s.status === "busy" || s.status === "on-break").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Team & Permissions</h3>
          <p className="text-xs text-text-muted mt-0.5">
            Manage staff accounts, roles, and order assignments
          </p>
        </div>
        <Button size="sm" onClick={() => setShowInvite(!showInvite)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Add Staff
        </Button>
      </div>

      {/* Staff Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total Staff", value: staffSummary.total, color: "bg-accent" },
          { label: "Active Now", value: staffSummary.active, color: "bg-status-ready" },
          { label: "Kitchen", value: staffSummary.kitchen, color: "bg-status-processing" },
          { label: "Unavailable", value: staffSummary.busy, color: "bg-status-cancelled" },
        ].map((item) => (
          <Card key={item.label} className="p-3 text-center">
            <p className="text-xs text-text-muted">{item.label}</p>
            <p className={cn("text-lg font-semibold mt-0.5", item.color.replace("bg-", "text-"))}>
              {item.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Invite Form */}
      {showInvite && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-accent-light">
                <Plus className="w-4 h-4 text-accent" />
              </div>
              <p className="text-sm font-medium text-text-primary">Add New Staff Member</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                placeholder="Enter staff name"
              />
              <Input
                label="Email Address"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="staff@shawarma.com"
              />
              <Input
                label="Phone Number"
                value={inviteForm.phone}
                onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                placeholder="+234 800 XXX XXXX"
              />
              <Select
                label="Role"
                value={inviteForm.role}
                onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value as StaffRole })}
                options={roleOptions}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setShowInvite(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleInvite}>
                Add Staff Member
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-border/50">
        {[
          { value: "all", label: `All (${staff.length})` },
          { value: "kitchen", label: `Kitchen (${staff.filter((s) => s.role === "kitchen").length})` },
          { value: "cashier", label: `Cashier (${staff.filter((s) => s.role === "cashier").length})` },
          { value: "staff", label: `Staff (${staff.filter((s) => s.role === "staff").length})` },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterRole(tab.value)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
              filterRole === tab.value
                ? "bg-accent text-accent-foreground"
                : "text-text-secondary hover:bg-surface-hover"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Staff List */}
      <div className="space-y-3">
        {filteredStaff.map((member) => (
          <Card key={member.id} className="p-4 hover:border-border transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3.5">
                {/* Avatar with status */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                    <span className="text-sm font-semibold text-accent">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-surface",
                      STAFF_STATUS_COLORS[member.status]
                    )}
                  />
                </div>

                {/* Staff Info */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-text-primary">{member.name}</p>
                    <span
                      className={cn(
                        "text-[10px] font-medium px-1.5 py-0.5 rounded-sm",
                        ROLE_COLORS[member.role]
                      )}
                    >
                      {ROLE_LABELS[member.role]}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {member.email}
                    </span>
                    {member.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {member.phone}
                      </span>
                    )}
                  </div>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <Star className="w-3 h-3 text-status-processing" />
                      {member.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-[10px] px-1.5 py-0.5 rounded-sm bg-surface-secondary text-text-tertiary"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right side: stats and actions */}
              <div className="flex items-start gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-text-muted">Active Orders</p>
                  <p className="text-sm font-semibold text-text-primary">
                    {member.activeOrders}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">
                    {member.totalOrdersCompleted} completed
                  </p>
                </div>

                {/* Status badge */}
                <div className="flex flex-col items-end gap-2">
                  <Select
                    value={member.status}
                    onChange={(e) =>
                      handleStatusChange(member.id, e.target.value as StaffStatus)
                    }
                    options={statusOptions}
                    className="w-28 text-xs"
                  />
                  <button
                    onClick={() => handleRemoveStaff(member.id)}
                    className="text-xs text-text-muted hover:text-status-cancelled transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredStaff.length === 0 && (
          <div className="text-center py-8">
            <UserX className="w-8 h-8 text-text-muted mx-auto mb-2" />
            <p className="text-sm text-text-muted">No staff members found</p>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}