"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { isAuthenticated, logout, setUserInfo } from "@/lib/auth";
import { useRolePreference } from "@/lib/use-role-preference";
import { toast } from "sonner";
import Link from "next/link";
import api from "@/lib/api";

type RoleOption = { id: number; name: string };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      if (!isAuthenticated()) {
        toast.error("Session expired. Please sign in again.");
        router.push("/auth/login");
        return;
      }

      try {
        const fresh = await api.get("/auth/me").then((res) => res.data.user || res.data);
        const normalized = {
          ...fresh,
          roles: fresh.roles || [],
          role: fresh.default_role?.name || fresh.role,
          default_role_id: fresh.default_role?.id || fresh.default_role_id,
        };
        setUser(normalized);
        setUserInfo(normalized);
      } catch {
        toast.error("Could not load your profile");
        logout();
        router.push("/auth/login");
      }
    };
    load();
  }, [router]);

  const roleOptions: RoleOption[] = useMemo(() => {
    if (!user?.roles) return [];
    return (user.roles as any[])
      .map((r) => ({
        id: typeof r === "object" ? Number(r.id) : NaN,
        name: typeof r === "object" ? r.name : String(r),
      }))
      .filter((r) => r.id && r.name);
  }, [user?.roles]);

  const { activeRole, setActiveRole } = useRolePreference(user ? { id: user.id, role: user.role, roles: roleOptions.map((r) => r.name) } : null);

  const handleRoleChange = async (roleId: number) => {
    if (!user?.id || !roleId) return;
    const selected = roleOptions.find((r) => r.id === roleId);
    if (!selected) return;
    setActiveRole(selected.name);
    try {
      await api.put(`/users/${user.id}`, { default_role_id: roleId });
      const updated = { ...user, role: selected.name, default_role_id: roleId };
      setUser(updated);
      setUserInfo(updated);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Could not set default role");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading your workspace...</p>
      </div>
    );
  }

  const groups = Array.isArray(user?.groups) ? user.groups : [];

  return (
    <DashboardShell user={user} title="Your control center" subtitle="Track forms, manage access, and stay on top of your workflows." onLogout={logout}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Profile overview</CardTitle>
            <CardDescription>Key info at a glance</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p>
              <p className="mt-1 text-sm font-medium">{user.email}</p>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p>
              <p className="mt-1 text-sm font-medium">{user.first_name || user.last_name ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "—"}</p>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
              <p className="mt-1 text-sm font-medium">{user.phone || "—"}</p>
            </div>
            <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Role</p>
              {/* <p className="mt-1 text-sm font-medium capitalize">{activeRole || "user"}</p> */}
              <p className="mt-1 text-sm font-medium capitalize">
                <select className="h-10 rounded-md border bg-white px-3 text-sm capitalize shadow-sm" value={roleOptions.find((r) => r.name === activeRole)?.id ?? ""} onChange={(e) => handleRoleChange(Number(e.target.value))}>
                  {roleOptions.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border overflow-hidden bg-white/90 backdrop-blur shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400 px-6 py-4 text-white">
            <CardTitle className="text-white">Quick actions</CardTitle>
            <CardDescription className="text-white/80">Jump right into what matters.</CardDescription>
          </div>
          <CardContent className="space-y-3 p-6">
            <Link href="/forms">
              <Button variant="ghost" className="w-full justify-between border border-indigo-100 text-indigo-700 hover:bg-indigo-50">
                <span>Forms</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="border bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>User details</CardTitle>
            <CardDescription>Access and memberships</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-3 font-semibold text-muted-foreground w-32">Roles</td>
                  <td className="px-3 py-3">
                    {roleOptions.length === 0 ? (
                      <span className="text-muted-foreground">No roles assigned</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {roleOptions.map((r) => (
                          <span key={r.id} className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm text-indigo-800">
                            {r.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">Default: {activeRole || "user"}</p>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-3 py-3 font-semibold text-muted-foreground">Groups</td>
                  <td className="px-3 py-3">
                    {groups.length === 0 ? (
                      <span className="text-muted-foreground">No groups</span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {groups.map((g: any) => (
                          <span key={g.id} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm">
                            {g.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
