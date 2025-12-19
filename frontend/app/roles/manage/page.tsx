"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { GeneralTab } from "@/app/roles/tabs/general";
import { UsersTab } from "@/app/roles/tabs/users";
import { PoliciesTab } from "@/app/roles/tabs/policies";

function ManageRolePageContent() {
  const { user, checking, handleLogout } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<"general" | "users" | "policies">("general");
  const searchParams = useSearchParams();
  const roleId = searchParams.get("id");

  const title = roleId ? "Edit role" : "Create role";
  const tabs = useMemo(
    () => [
      { key: "general", label: "General" },
      { key: "users", label: "Users" },
      { key: "policies", label: "Policies" },
    ],
    []
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.key === tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams, tabs]);

  const handleTabChange = (tabKey: "general" | "users" | "policies") => {
    setActiveTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);
    if (roleId) params.set("id", roleId);
    window.history.replaceState(null, "", `/roles/manage?${params.toString()}`);
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title={title} subtitle="Role details with tabs">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Role details</h2>
            <p className="text-sm text-muted-foreground">Edit metadata or manage memberships.</p>
          </div>
          <Tabs>
            <TabsList className="bg-muted">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.key} active={activeTab === tab.key} onClick={() => handleTabChange(tab.key as any)}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="rounded-xl border bg-white/80 backdrop-blur p-6 space-y-6">
          {activeTab === "general" && <GeneralTab roleId={roleId} />}
          {activeTab === "users" && <UsersTab roleId={roleId} />}
          {activeTab === "policies" && <PoliciesTab roleId={roleId} />}
        </div>
      </div>
    </DashboardShell>
  );
}

export default function ManageRolePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ManageRolePageContent />
    </Suspense>
  );
}
