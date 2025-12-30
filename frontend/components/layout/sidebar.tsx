"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard, ShieldCheck, Users, LogOut, Sparkles, ShieldHalf, PanelsTopLeft, UserPlus2, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: string;
};

export const NAV_ITEMS_BY_ROLE: Record<string, NavItem[]> = {
  super: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Forms", href: "/forms", icon: ClipboardList },
    { label: "Users", href: "/users", icon: Users },
    { label: "Groups", href: "/groups", icon: UserPlus2 },
    { label: "Roles", href: "/roles", icon: ShieldCheck },
    { label: "Policies", href: "/policies", icon: ShieldHalf },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Forms", href: "/forms", icon: ClipboardList },
    { label: "Users", href: "/users", icon: Users },
    { label: "Groups", href: "/groups", icon: UserPlus2 },
    { label: "Roles", href: "/roles", icon: ShieldCheck },
    { label: "Policies", href: "/policies", icon: ShieldHalf },
  ],
  manager: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Forms", href: "/forms", icon: ClipboardList },
    { label: "Groups", href: "/groups", icon: UserPlus2 },
  ],
  user: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Forms", href: "/forms", icon: ClipboardList },
  ],
};

export function Sidebar({ role = "user", onLogout, userName, mobileOpen = false, onMobileClose }: { role?: string; onLogout?: () => void; userName?: string; mobileOpen?: boolean; onMobileClose?: () => void }) {
  const pathname = usePathname();
  const items = NAV_ITEMS_BY_ROLE[role] || NAV_ITEMS_BY_ROLE.user;

  return (
    <>
      {/* Mobile overlay */}
      <div className={cn("fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden", mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")} onClick={onMobileClose} />
      <aside className={cn("fixed inset-y-0 left-0 z-40 w-64 translate-x-[-100%] border-r bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-transform lg:translate-x-0 lg:relative", mobileOpen ? "translate-x-0" : "", "flex flex-col")}>
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400" />
            <div>
              <p className="text-lg font-semibold tracking-tight">Uzdev</p>
              <p className="text-xs text-muted-foreground">Forms & Access</p>
            </div>
          </div>
          <button className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-md border bg-white" onClick={onMobileClose} aria-label="Close navigation">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={cn(buttonVariants({ variant: active ? "secondary" : "ghost", size: "sm" }), "w-full justify-start gap-2 rounded-xl")} onClick={onMobileClose}>
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 flex-shrink-0">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-400 text-white p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-full bg-white/20 p-2">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Smart forms</p>
                <p className="text-xs text-white/80">Secure access control and fast submissions in one beautiful dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex-shrink-0">
          <div className="mb-3">
            <p className="text-sm font-medium">{userName || "You"}</p>
            <p className="text-xs text-muted-foreground">Stay productive, stay secure</p>
          </div>
          {onLogout && (
            <Button variant="outline" className="w-full justify-center gap-2 rounded-xl" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
