"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Input as Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Store, Upload } from "lucide-react";

export function BusinessProfile() {
  const [form, setForm] = useState({
    name: "ShawarmaKing",
    email: "hello@shawarmaking.com",
    phone: "+234 800 SHAWARMA",
    address: "42 Food Street, Lagos",
    tagline: "The best shawarma in town",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-primary">Business Profile</h3>
        <p className="text-xs text-text-muted mt-0.5">
          Manage your restaurant information and branding
        </p>
      </div>

      {/* Logo Upload */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
              <Store className="w-7 h-7 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Restaurant Logo</p>
              <p className="text-xs text-text-muted mt-0.5">
                Upload your brand logo. Recommended size: 256x256px
              </p>
              <button className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Upload Logo
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Business Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your restaurant name"
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="hello@example.com"
        />
        <Input
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+234 800 XXX XXXX"
        />
        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Restaurant location"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
        <button className="px-4 py-2 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-surface-hover transition-colors">
          Cancel
        </button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}