"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

type FormRow = { id: number; name: string; description?: string; field_count?: number; is_active?: boolean };

export default function FormsDataPage() {
  const router = useRouter();
  const { user, checking, handleLogout } = useAuthGuard();
  const [forms, setForms] = useState<FormRow[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchForms = async () => {
    setLoading(true);
    try {
      const { forms: list, total: totalCount } = await api.get("/forms", { params: { page, limit, search } }).then((res) => res.data);
      setForms(list || []);
      setTotal(totalCount || 0);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load forms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this form?")) return;
    try {
      await api.delete(`/forms/${id}`);
      toast.success("Form deleted");
      fetchForms();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading forms...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Forms" subtitle="List and manage forms.">
      <Card className="border bg-white/80 backdrop-blur">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Forms</CardTitle>
            <CardDescription>Browse forms, then manage details.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search forms..."
              className="md:w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button onClick={() => router.push("/forms/manage")}>
              <Plus className="h-4 w-4 mr-2" />
              New form
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Description</th>
                  <th className="px-3 py-2">Fields</th>
                  <th className="px-3 py-2 w-40">Actions</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((f) => (
                  <tr key={f.id} className="border-t">
                    <td className="px-3 py-2 font-medium">{f.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{f.description || "-"}</td>
                    <td className="px-3 py-2 text-muted-foreground">{f.field_count ?? "-"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" className="px-2" onClick={() => router.push(`/forms/manage?id=${f.id}`)}>
                          Manage
                        </Button>
                        <Button size="sm" variant="destructive" className="px-2" onClick={() => handleDelete(f.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {forms.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                      No forms found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={4} className="px-3 py-6 text-center text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Prev
              </Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
