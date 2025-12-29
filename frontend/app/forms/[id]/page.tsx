"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormViewer } from "@/components/forms/form-viewer";
import { getFormStructure, getCredentials, type FormStructure } from "@/lib/forms-api";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FormDetailPage() {
  const { user, checking, handleLogout } = useAuthGuard();

  const params = useParams();
  const router = useRouter();
  const form_id = params.id as string;

  const [form, setForm] = useState<FormStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        setError(null);

        const credentials = getCredentials();

        if (!credentials) {
          setError("Google Forms credentials not configured. Please contact administrator.");
          return;
        }

        const response = await getFormStructure(form_id, credentials);
        setForm(response.form);
      } catch (err: any) {
        console.error("Failed to fetch form:", err);
        setError(err.response?.data?.message || "Failed to fetch form. Please try again.");
        toast.error("Failed to fetch form");
      } finally {
        setLoading(false);
      }
    };

    if (form_id) {
      fetchForm();
    }
  }, [form_id]);

  const copyPublicLink = () => {
    const link = `${window.location.origin}/forms/public/${form_id}`;
    navigator.clipboard.writeText(link);
    toast.success("Public link copied to clipboard");
  };

  const openInGoogle = () => {
    window.open(`https://docs.google.com/forms/d/${form_id}/edit`, "_blank");
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

        <Tabs defaultValue="preview" className="w-full">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-6">
            {form && (
              <FormViewer form={form} loading={loading} error={error} showSubmit={false} />
            )}
          </TabsContent>

          <TabsContent value="responses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Responses</CardTitle>
                <CardDescription>
                  View and analyze responses from this form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Responses feature coming soon...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>
                  Configure access and sharing settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Public Access</h3>
                      <p className="text-sm text-muted-foreground">
                        Anyone with the link can fill this form
                      </p>
                    </div>
                    <Button variant="outline" onClick={copyPublicLink}>
                      Copy Link
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Form ID</h3>
                      <p className="text-sm text-muted-foreground font-mono">
                        {form_id}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
