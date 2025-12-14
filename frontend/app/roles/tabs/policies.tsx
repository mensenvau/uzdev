"use client";

import { useEffect, useState } from "react";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type Policy = { id: number; name: string; description?: string };

export function PoliciesTab({ roleId }: { roleId: string | null }) {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!roleId) {
        setPolicies([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/roles/${roleId}`).then((res) => res.data.role || res.data);
        setPolicies(Array.isArray(data.policies) ? data.policies : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load policies"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roleId]);

  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="px-3 py-2">Policy</th>
            <th className="px-3 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2 font-medium">{p.name}</td>
              <td className="px-3 py-2 text-muted-foreground">{p.description || "—"}</td>
            </tr>
          ))}
          {policies.length === 0 && !loading && (
            <tr>
              <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                No policies for this role.
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
