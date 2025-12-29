"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormViewer } from "@/components/forms/form-viewer";
import { getFormStructure, getCredentials, type FormStructure, getFormResponses } from "@/lib/forms-api";
import { ArrowLeft, AlertCircle, ExternalLink, Copy, Download, RefreshCw } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      setResponses(response.data.responses || []);
      toast.success(`Loaded ${response.data.responses?.length || 0} responses`);
    } catch (err: any) {
      console.error("Failed to fetch responses:", err);
    } finally {
      setLoadingResponses(false);
    }
  };

  useEffect(() => {
    if (activeTab === "responses" && responses.length === 0) {
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

    // Create CSV header
    const headers = ["Response ID", "Submitted At", "Email", ...form.fields.map((f) => f.label)];
    const csvRows = [headers.join(",")];

    // Add data rows
    responses.forEach((response) => {
      const row = [
        response.response_id,
        new Date(response.created_at).toLocaleString(),
        response.respondent_email || "Anonymous",
      ];

      form.fields.forEach((field) => {
        const answer = response.answers.find((a) => a.field_id === field.field_id);
        const value = answer?.value || "";
        // Escape commas and quotes in CSV
        const escaped = typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
        row.push(escaped);
      });

      csvRows.push(row.join(","));
    });

    // Download CSV
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Form Responses</CardTitle>
                    <CardDescription>
                      View and analyze responses from this form ({responses.length} total)
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={fetchResponses} variant="outline" size="sm" disabled={loadingResponses}>
                      <RefreshCw className={`mr-2 h-4 w-4 ${loadingResponses ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                    <Button onClick={exportToCSV} variant="outline" size="sm" disabled={responses.length === 0}>
                      <Download className="mr-2 h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingResponses ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 mx-auto mb-2 animate-spin text-muted-foreground" />
                    <p className="text-muted-foreground">Loading responses...</p>
                  </div>
                ) : responses.length > 0 ? (
                  <div className="border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Submitted</TableHead>
                            <TableHead>Email</TableHead>
                            {form?.fields.map((field) => (
                              <TableHead key={field.field_id}>{field.label}</TableHead>
                            ))}
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {responses.map((response) => (
                            <TableRow key={response.response_id}>
                              <TableCell className="text-xs text-muted-foreground">
                                {new Date(response.created_at).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-sm">
                                {response.respondent_email || "Anonymous"}
                              </TableCell>
                              {form?.fields.map((field) => {
                                const answer = response.answers.find((a) => a.field_id === field.field_id);
                                return (
                                  <TableCell key={field.field_id} className="text-sm">
                                    {answer?.value || "-"}
                                  </TableCell>
                                );
                              })}
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">⋮</Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {
                                      navigator.clipboard.writeText(response.response_id);
                                      toast.success("Response ID copied");
                                    }}>
                                      Copy Response ID
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No responses yet. Share the form to start collecting responses.</p>
                  </div>
                )}
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
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="font-medium mb-2">Group Access</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share this form with specific groups to control who can access it
                    </p>
                    <Button variant="outline" size="sm">
                      Manage Group Access
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Coming soon: Assign forms to user groups
                    </p>
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
