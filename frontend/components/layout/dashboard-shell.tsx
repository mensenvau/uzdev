"use client";

import * as React from "react";
import { Sidebar, NAV_ITEMS_BY_ROLE } from "./sidebar";
import { useRolePreference } from "@/lib/use-role-preference";
import { Menu } from "lucide-react";

type DashboardShellProps = {
  user: { id?: string | number; username?: string; first_name?: string; last_name?: string; role?: string; roles?: string[]; email?: string };
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onLogout?: () => void;
  children: React.ReactNode;
};

export function DashboardShell({ user, title, subtitle, actions, onLogout, children }: DashboardShellProps) {
  const { activeRole } = useRolePreference(user);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const role = activeRole || "user";
  const navItems = NAV_ITEMS_BY_ROLE[role] || NAV_ITEMS_BY_ROLE.user;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid h-screen lg:grid-cols-[260px_1fr]">
        <Sidebar role={role} onLogout={onLogout} userName={user?.first_name || user?.last_name ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim() : user?.email || user?.username} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

        <div className="relative overflow-hidden flex flex-col min-h-0">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.08),transparent_30%),radial-gradient(circle_at_30%_70%,rgba(52,211,153,0.1),transparent_30%)]" />
          </div>

          <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="px-4 py-4 md:px-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-white lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  {/* <p className="text-sm text-muted-foreground">Hello, {user?.first_name || user?.last_name ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim() : user?.email || "there"}</p> */}
                  {/* <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
                  {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>} */}
                </div>
              </div>
              <div className="flex items-center gap-2">{actions && <div className="flex items-center gap-2">{actions}</div>}</div>
            </div>
          </header>

          <main className="relative z-10 px-4 py-6 md:px-8 md:py-10 space-y-6 flex-1 overflow-y-auto min-h-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
