"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormsTable } from "@/components/forms/forms-table";
import { listForms, getCredentials, type GoogleForm } from "@/lib/forms-api";
import { RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuthGuard } from "@/lib/use-auth-guard";

export default function FormsListPage() {
  useAuthGuard();

  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  const fetchForms = async (pageToken: string | null = null) => {
    try {
      setLoading(true);
      setError(null);

      // Get credentials (this should be implemented based on your auth flow)
      const credentials = getCredentials();

      if (!credentials) {
        setError("Google Forms credentials not configured. Please contact administrator.");
        return;
      }

      const response = await listForms(credentials, 20, pageToken);
      setForms(pageToken ? [...forms, ...response.forms] : response.forms);
      setNextPageToken(response.next_page_token);
    } catch (err: any) {
      console.error("Failed to fetch forms:", err);
      setError(err.response?.data?.message || "Failed to fetch forms. Please try again.");
      toast.error("Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleRefresh = () => {
    setForms([]);
    setNextPageToken(null);
    fetchForms();
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchForms(nextPageToken);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Google Forms</h1>
          <p className="text-muted-foreground mt-1">
            Manage and view responses from your Google Forms
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Forms</CardTitle>
          <CardDescription>
            View and manage all Google Forms from your Drive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormsTable forms={forms} loading={loading} />

          {!loading && nextPageToken && (
            <div className="mt-4 flex justify-center">
              <Button onClick={handleLoadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}

          {!loading && forms.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No forms found. Create a form in Google Forms to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
