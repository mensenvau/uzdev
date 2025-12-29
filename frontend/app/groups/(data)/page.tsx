"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { toast } from "sonner";
import api from "@/lib/api";

type Group = { id: number; name: string; description?: string };

export default function GroupsListPage() {
  const router = useRouter();
  const { user, checking, handleLogout } = useAuthGuard();
  const [groups, setGroups] = useState<Group[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const { groups: dataGroups, total: dataTotal } = await api.get("/groups", { params: { page, limit, search } }).then((res) => res.data);
      setGroups(dataGroups || []);
      setTotal(dataTotal || 0);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load groups");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this group?")) return;
    try {
      await api.delete(`/groups/${id}`);
      toast.success("Group deleted");
      fetchGroups();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading groups...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Groups" subtitle="Group list with detail tabs.">
      <Card className="border bg-white/80 backdrop-blur">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Groups</CardTitle>
            <CardDescription>Browse groups, then manage details.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Search groups..."
              className="md:w-64"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <Button onClick={() => router.push("/groups/manage")}>
              <Plus className="h-4 w-4 mr-2" />
              New group
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
                  <th className="px-3 py-2 w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => (
                  <tr key={group.id} className="border-t">
                    <td className="px-3 py-2 font-medium capitalize">{group.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{group.description || "—"}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" className="px-2" onClick={() => router.push(`/groups/manage?id=${group.id}`)}>
                          Manage
                        </Button>
                        <Button size="sm" variant="destructive" className="px-2" onClick={() => handleDelete(group.id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {groups.length === 0 && !loading && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
                      No groups found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={3} className="px-3 py-6 text-center text-muted-foreground">
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
