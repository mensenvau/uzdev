"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { listForms, type GoogleForm } from "@/lib/forms-api";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ExternalLink } from "lucide-react";

export default function FormsListPage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const router = useRouter();

  const [forms, setForms] = useState<GoogleForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [serviceAccountEmail, setServiceAccountEmail] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredForms = useMemo(() => {
    const term = search.toLowerCase();
    return forms.filter((f) => f.name.toLowerCase().includes(term));
  }, [forms, search]);

  const fetchForms = async (pageToken: string | null = null, append = false) => {
    try {
      setLoading(true);
      const response = await listForms(20, pageToken);
      setForms((prev) => (append ? [...prev, ...response.forms] : response.forms));
      setNextPageToken(response.next_page_token);
      setServiceAccountEmail(response.service_account_email || null);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to fetch forms. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleLoadMore = () => {
    if (nextPageToken) {
      fetchForms(nextPageToken, true);
    }
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Forms" subtitle="Browse and manage Google Forms.">
      <Card className="border bg-white/80 backdrop-blur">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Forms</CardTitle>
            <CardDescription>View and manage all Google Forms from your Drive.</CardDescription>
          </div>
          <Input
            placeholder="Search forms..."
            className="md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="px-3 py-2">Form Name</th>
                  <th className="px-3 py-2">Owner</th>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Modified</th>
                  <th className="px-3 py-2 w-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                )}
                {!loading &&
                  filteredForms.map((form) => (
                    <tr key={form.id} className="border-t">
                      <td className="px-3 py-2 font-medium">{form.name}</td>
                      <td className="px-3 py-2">
                        <div className="text-sm">
                          <div className="font-medium">{form.owners?.[0]?.displayName || "Unknown"}</div>
                          <div className="text-xs text-muted-foreground">{form.owners?.[0]?.emailAddress}</div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(form.createdTime), { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">
                        {formatDistanceToNow(new Date(form.modifiedTime), { addSuffix: true })}
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="px-2" onClick={() => router.push(`/forms/manage?id=${form.id}`)}>
                            Manage
                          </Button>
                          <Button size="sm" variant="ghost" className="px-2" onClick={() => window.open(form.webViewLink, "_blank")}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                {!loading && filteredForms.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-muted-foreground">
                      No forms found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!loading && nextPageToken && (
            <div className="flex justify-center">
              <Button onClick={handleLoadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}

          {!loading && filteredForms.length === 0 && serviceAccountEmail && (
            <div className="max-w-2xl mx-auto bg-muted/50 p-4 rounded-lg text-sm text-left space-y-2">
              <p className="font-medium">To see your Google Forms here:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Open your Google Form</li>
                <li>Click the "Send" button</li>
                <li>Click the "Add editor" icon</li>
                <li>
                  Add this email: <code className="bg-background px-2 py-0.5 rounded text-xs">{serviceAccountEmail}</code>
                </li>
              </ol>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
