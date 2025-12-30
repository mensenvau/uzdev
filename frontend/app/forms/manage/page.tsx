"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { PreviewTab } from "../tabs/preview";
import { DataTab } from "../tabs/data";
import { SettingsTab } from "../tabs/settings";
import { getFormStructure, getFormResponses } from "@/lib/forms-api";
import { toast } from "sonner";

export default function FormsManagePage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const searchParams = useSearchParams();
  const router = useRouter();

  const formId = searchParams.get("id");
  const tabs = useMemo(
    () => [
      { key: "preview", label: "Preview" },
      { key: "data", label: "Data" },
      { key: "settings", label: "Settings" },
    ],
    []
  );
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);
  const [form, setForm] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responsesError, setResponsesError] = useState<string | null>(null);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.key === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams, tabs]);

  useEffect(() => {
    if (!formId) return;
    const loadForm = async () => {
      try {
        setLoadingForm(true);
        setError(null);
        const response = await getFormStructure(formId);
        setForm(response.form);
      } catch (err: any) {
        const message = err?.response?.data?.message || "Unable to load form details.";
        setError(message);
        toast.error(message);
      } finally {
        setLoadingForm(false);
      }
    };
    loadForm();
  }, [formId]);

  const fetchResponses = async () => {
    if (!formId) return;
    try {
      setLoadingResponses(true);
      setResponsesError(null);
      const response = await getFormResponses(formId);
      const payload = (response as any)?.data || response || {};
      const list = payload.data?.responses ?? payload.responses ?? [];
      setResponses(list);
      toast.success(`Loaded ${list.length} responses`);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to load responses.";
      setResponsesError(message);
      toast.error(message);
    } finally {
      setLoadingResponses(false);
    }
  };

  useEffect(() => {
    if (activeTab === "data" && responses.length === 0) {
      fetchResponses();
    }
  }, [activeTab]);

  const handleTabChange = (tabKey: string) => {
    setActiveTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);
    if (formId) params.set("id", formId);
    router.replace(`/forms/manage?${params.toString()}`);
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Form management" subtitle={`Tabs to create or edit forms${formId ? ` (ID: ${formId})` : ""}.`}>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Form tabs</h2>
            <p className="text-sm text-muted-foreground">{form ? form.title : error || "Structured tabs to manage this form."}</p>
          </div>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.key} value={tab.key}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="preview" className="mt-2">
          <PreviewTab form={form} loading={loadingForm} error={error} />
        </TabsContent>
        <TabsContent value="data" className="mt-2">
          <DataTab
            formId={formId || ""}
            form={form}
            responses={responses}
            loading_responses={loadingResponses}
            error={responsesError}
            on_refresh={fetchResponses}
            on_export_csv={() => {}}
          />
        </TabsContent>
        <TabsContent value="settings" className="mt-2">
          <SettingsTab
            form_id={formId || "N/A"}
            on_copy_public_link={() => {
              if (!formId) return;
              const link = `https://docs.google.com/forms/d/${formId}/viewform`;
              navigator.clipboard.writeText(link);
              toast.success("Form link copied to clipboard");
            }}
            on_open_in_google={() => {
              if (!formId) return;
              window.open(`https://docs.google.com/forms/d/${formId}/edit`, "_blank");
            }}
          />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
