"use client";

import { useEffect, useState } from "react";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type DeptUser = { id: number; email: string; first_name?: string; last_name?: string };

export function UsersTab({ departmentId }: { departmentId: string | null }) {
  const [users, setUsers] = useState<DeptUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!departmentId) {
        setUsers([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/departments/${departmentId}`).then((res) => res.data.department || res.data);
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load department users"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [departmentId]);

  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-3 py-2 font-medium">{u.first_name || u.last_name ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : "—"}</td>
              <td className="px-3 py-2 text-muted-foreground">{u.email}</td>
            </tr>
          ))}
          {users.length === 0 && !loading && (
            <tr>
              <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                No users assigned to this department.
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
