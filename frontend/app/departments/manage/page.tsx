"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralTab } from "@/app/departments/tabs/general";
import { UsersTab } from "@/app/departments/tabs/users";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function ManageDepartmentPage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<"general" | "users">("general");
  const searchParams = useSearchParams();
  const departmentId = searchParams.get("id");

  const tabs = useMemo(
    () => [
      { key: "general", label: "General" },
      { key: "users", label: "Users" },
    ],
    []
  );

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title={departmentId ? "Edit department" : "Create department"} subtitle="Department details with tabs">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Department details</h2>
            <p className="text-sm text-muted-foreground">Edit metadata or view users.</p>
          </div>
          <Tabs>
            <TabsList className="bg-muted">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key as any)}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="rounded-xl border bg-white/80 backdrop-blur p-6 space-y-6">
          {activeTab === "general" && <GeneralTab departmentId={departmentId} />}
          {activeTab === "users" && <UsersTab departmentId={departmentId} />}
        </div>
      </div>
    </DashboardShell>
  );
}
