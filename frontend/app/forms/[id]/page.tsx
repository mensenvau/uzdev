"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getFormStructure, getCredentials, type FormStructure, getFormResponses } from "@/lib/forms-api";
import { ArrowLeft, AlertCircle, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { PreviewTab } from "./_tabs/preview";
import { DataTab } from "./_tabs/data";
import { SettingsTab } from "./_tabs/settings";
import { AccessTab } from "./_tabs/access";

interface FormResponse {
  response_id: string;
  created_at: string;
  updated_at: string;
  respondent_email: string | null;
  answers: Array<{
    field_id: string;
    label: string;
    field_type: string;
    value: any;
  }>;
}

export default function FormDetailPage() {
  const { user, checking, handleLogout } = useAuthGuard();

  const params = useParams();
  const router = useRouter();
  const form_id = params.id as string;

  const [form, setForm] = useState<FormStructure | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("preview");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        setError(null);

        const credentials = getCredentials();
        const response = await getFormStructure(form_id, credentials);
        setForm(response.form);
      } catch (err: any) {
        console.error("Failed to fetch form:", err);
        setError(err.response?.data?.message || "Failed to fetch form. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (form_id) {
      fetchForm();
    }
  }, [form_id]);

  const fetchResponses = async () => {
    try {
      setLoadingResponses(true);
      const credentials = getCredentials();

      const response = await getFormResponses(form_id, credentials);
      setResponses(response.responses || []);
      toast.success(`Loaded ${response.responses?.length || 0} responses`);
    } catch (err: any) {
      console.error("Failed to fetch responses:", err);
    } finally {
      setLoadingResponses(false);
    }
  };

  useEffect(() => {
    if (activeTab === "data" && responses.length === 0) {
      fetchResponses();
    }
  }, [activeTab]);

  const copyPublicLink = () => {
    const link = `${window.location.origin}/forms/public/${form_id}`;
    navigator.clipboard.writeText(link);
    toast.success("Public link copied to clipboard");
  };

  const openInGoogle = () => {
    window.open(`https://docs.google.com/forms/d/${form_id}/edit`, "_blank");
  };

  const exportToCSV = () => {
    if (!form || responses.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = ["Response ID", "Submitted At", "Email", ...form.fields.map((f) => f.label)];
    const csvRows = [headers.join(",")];

    responses.forEach((response) => {
      const row = [
        response.response_id,
        new Date(response.created_at).toLocaleString(),
        response.respondent_email || "Anonymous",
      ];

      form.fields.forEach((field) => {
        const answer = response.answers.find((a) => a.field_id === field.field_id);
        const value = answer?.value || "";
        const escaped = typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
        row.push(escaped);
      });

      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.title}-responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Responses exported to CSV");
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell
      user={user}
      onLogout={handleLogout}
      title={loading ? "Loading..." : form?.title || "Form Details"}
      subtitle="View form structure and manage access"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button onClick={copyPublicLink} variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={openInGoogle} variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Google
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="access">Access</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            <PreviewTab form={form} loading={loading} error={error} />
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <DataTab
              form={form}
              responses={responses}
              loading_responses={loadingResponses}
              on_refresh={fetchResponses}
              on_export_csv={exportToCSV}
            />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SettingsTab
              form_id={form_id}
              on_copy_public_link={copyPublicLink}
              on_open_in_google={openInGoogle}
            />
          </TabsContent>

          <TabsContent value="access" className="mt-6">
            <AccessTab form_id={form_id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
