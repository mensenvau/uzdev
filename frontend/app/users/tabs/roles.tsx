"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type Role = { id: number; name: string };

export function RolesTab({ userId, initialUser, onUserChange }: { userId: string | null; initialUser?: any; onUserChange?: (u: any) => void }) {
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [userRoles, setUserRoles] = useState<Role[]>(initialUser?.roles || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { roles } = await api.get("/roles", { params: { limit: 100 } }).then((res) => res.data);
        setRoleOptions(Array.isArray(roles) ? roles : []);
        if (initialUser && initialUser.roles) {
          setUserRoles(initialUser.roles);
        }
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load roles"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, initialUser]);

  const addRole = async (roleId: number) => {
    if (!userId) return toast.error("Save user first");
    try {
      await api.post("/roles/assign", { role_id: roleId, user_id: Number(userId) });
      setUserRoles((prev) => (prev.some((r) => r.id === roleId) ? prev : [...prev, roleOptions.find((r) => r.id === roleId)!]));
      onUserChange?.({ ...(initialUser || {}), roles: userRoles.some((r) => r.id === roleId) ? userRoles : [...userRoles, roleOptions.find((r) => r.id === roleId)!] });
      toast.success("Role assigned");
    } catch (error: any) {
      toast.error(formatApiError(error, "Assign failed"));
    }
  };

  const removeRole = async (roleId: number) => {
    if (!userId) return;
    if (userRoles.length <= 1) {
      toast.error("At least one role must remain");
      return;
    }
    try {
      await api.post("/roles/remove", { role_id: roleId, user_id: Number(userId) });
      setUserRoles((prev) => prev.filter((r) => r.id !== roleId));
      onUserChange?.({ ...(initialUser || {}), roles: userRoles.filter((r) => r.id !== roleId) });
      toast.success("Role removed");
    } catch (error: any) {
      toast.error(formatApiError(error, "Remove failed"));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Assign or remove roles. At least one role is required.</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <select
            className="w-full md:w-64 rounded-md border px-3 py-2 text-sm"
            onChange={(e) => {
              const roleId = Number(e.target.value);
              if (roleId) addRole(roleId);
              e.target.value = "";
            }}
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled>
              Add role...
            </option>
            {roleOptions.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">Select to assign immediately.</p>
        </div>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRoles.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="px-3 py-2 capitalize font-medium">{r.name}</td>
                  <td className="px-3 py-2">
                    <Button size="sm" variant="outline" onClick={() => removeRole(r.id)} disabled={userRoles.length <= 1 || loading}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {userRoles.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                    No roles assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
