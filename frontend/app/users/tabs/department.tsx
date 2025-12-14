"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type Department = { id: number; name: string; lead?: string; headcount?: number };

export function DepartmentTab({ userId, initialUser }: { userId: string | null; initialUser?: any }) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [membership, setMembership] = useState<number[]>(() => (Array.isArray(initialUser?.departments) ? initialUser.departments.map((d: any) => d.id) : []));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { departments: list } = await api.get("/departments", { params: { limit: 100 } }).then((res) => res.data);
        setDepartments(Array.isArray(list) ? list : []);
        if (initialUser?.departments) {
          const ids = Array.isArray(initialUser.departments) ? initialUser.departments.map((d: any) => d.id) : [];
          setMembership(ids);
        }
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load departments"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, initialUser]);

  const assignDepartment = async (deptId: number) => {
    if (!userId) return toast.error("Save user first");
    try {
      await api.post(`/departments/${deptId}/assign`, { user_id: Number(userId) });
      setMembership((prev) => (prev.includes(deptId) ? prev : [...prev, deptId]));
      toast.success("Department assigned");
    } catch (error: any) {
      toast.error(formatApiError(error, "Assign failed"));
    }
  };

  const removeDepartment = async (deptId: number) => {
    if (!userId) return;
    try {
      await api.post(`/departments/${deptId}/remove`, { user_id: Number(userId) });
      setMembership((prev) => prev.filter((id) => id !== deptId));
      toast.success("Department removed");
    } catch (error: any) {
      toast.error(formatApiError(error, "Remove failed"));
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Assign the user to a department.</p>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <select
          className="w-full md:w-64 rounded-md border px-3 py-2 text-sm"
          onChange={(e) => {
            const id = Number(e.target.value);
            if (id) assignDepartment(id);
          }}
          value=""
          disabled={loading}
        >
          <option value="">Add department...</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments
              .filter((d) => membership.includes(d.id))
              .map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{d.name}</td>
                  <td className="px-3 py-2">
                    <Button size="sm" variant="outline" onClick={() => removeDepartment(d.id)} disabled={loading}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            {membership.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                  No departments assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
