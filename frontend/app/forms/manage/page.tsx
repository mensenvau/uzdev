"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { GeneralTab } from "@/app/forms/tabs/general";
import { FieldsTab } from "@/app/forms/tabs/fields";
import { ResponsesTab } from "@/app/forms/tabs/responses";
import { StatsTab } from "@/app/forms/tabs/stats";

export default function ManageFormPage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"general" | "fields" | "responses" | "stats">("general");
  const searchParams = useSearchParams();
  const formId = searchParams.get("id");

  const tabs = useMemo(
    () => [
      { key: "general", label: "General" },
      { key: "fields", label: "Fields" },
      { key: "responses", label: "Responses" },
      { key: "stats", label: "Stats" },
    ],
    []
  );

  useEffect(() => {
    const requestedTab = searchParams.get("tab");
    if (requestedTab && tabs.some((tab) => tab.key === requestedTab)) {
      setActiveTab(requestedTab as any);
    }
  }, [searchParams, tabs]);

  const handleTabChange = (tabKey: "general" | "fields" | "responses" | "stats") => {
    setActiveTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);
    if (formId) params.set("id", formId);
    router.replace(`/forms/manage?${params.toString()}`, { scroll: false });
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title={formId ? "Edit form" : "Create form"} subtitle="Form builder tabs">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Form builder</h2>
            <p className="text-sm text-muted-foreground">Google-forms style flow.</p>
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
          {activeTab === "general" && <GeneralTab formId={formId} />}
          {activeTab === "fields" && <FieldsTab formId={formId} />}
          {activeTab === "responses" && <ResponsesTab formId={formId} />}
          {activeTab === "stats" && <StatsTab formId={formId} />}
        </div>
      </div>
    </DashboardShell>
  );
}
