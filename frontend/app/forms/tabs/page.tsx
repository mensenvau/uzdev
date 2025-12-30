"use client";

import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function FormsTabsPage() {
  const { user, checking, handleLogout } = useAuthGuard();

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Form Tabs" subtitle="Structured tabs for managing forms.">
      <div className="rounded-xl border bg-white/80 p-6">
        <p className="text-muted-foreground">Tabs view placeholder.</p>
      </div>
    </DashboardShell>
  );
}
