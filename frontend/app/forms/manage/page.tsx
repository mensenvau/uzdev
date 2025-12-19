"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { GeneralTab } from "@/app/forms/tabs/general";
import { FieldsTab } from "@/app/forms/tabs/fields";
import { AccessTab } from "@/app/forms/tabs/access";
import { ResponsesTab } from "@/app/forms/tabs/responses";
import { StatsTab } from "@/app/forms/tabs/stats";
import { PreviewTab } from "@/app/forms/tabs/preview";

type TabKey = "general" | "fields" | "access" | "responses" | "stats" | "preview";

function ManageFormPageContent() {
  const { user, checking, handleLogout } = useAuthGuard();
  const router = useRouter();
  const searchParams = useSearchParams();
  const formId = searchParams.get("id");
  const [activeTab, setActiveTab] = useState<TabKey>(() => (searchParams.get("tab") as TabKey) || "general");

  const tabItems = useMemo(
    () => [
      { key: "general", label: "General" },
      { key: "fields", label: "Fields" },
      { key: "access", label: "Access" },
      { key: "stats", label: "Stats" },
      { key: "responses", label: "Responses" },
      { key: "preview", label: "Preview" },
    ],
    []
  );

  useEffect(() => {
    const requestedTab = searchParams.get("tab");
    if (requestedTab && tabItems.some((tab) => tab.key === requestedTab)) {
      setActiveTab(requestedTab as TabKey);
    } else {
      setActiveTab("general");
    }
  }, [searchParams, tabItems]);

  const handleTabChange = (tabKey: TabKey) => {
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
    <DashboardShell user={user} onLogout={handleLogout} title="Manage form" subtitle="Configure details, questions, and sharing.">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Form builder</h2>
            <p className="text-sm text-muted-foreground">Google-forms style flow.</p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs>
              <TabsList className="bg-muted">
                {tabItems.map((tab) => (
                  <TabsTrigger key={tab.key} active={activeTab === tab.key} onClick={() => handleTabChange(tab.key as any)}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="rounded-xl border bg-white/80 backdrop-blur p-6 space-y-6">
          {activeTab === "general" && <GeneralTab formId={formId} />}
          {activeTab === "fields" && <FieldsTab formId={formId} />}
          {activeTab === "access" && <AccessTab formId={formId} />}
          {activeTab === "responses" && <ResponsesTab formId={formId} />}
          {activeTab === "stats" && <StatsTab formId={formId} />}
          {activeTab === "preview" && <PreviewTab formId={formId} />}
        </div>
      </div>
    </DashboardShell>
  );
}

export default function ManageFormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <ManageFormPageContent />
    </Suspense>
  );
}
