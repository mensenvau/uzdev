"use client";

import { useEffect, useState } from "react";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type ResponseRow = { id: number; user_id?: number; status?: string; created_at?: string; total_score?: number };

export function ResponsesTab({ formId }: { formId: string | null }) {
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setResponses([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/forms/${formId}/responses`).then((res) => res.data.responses || res.data);
        setResponses(Array.isArray(data) ? data : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load responses"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId]);

  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="px-3 py-2">ID</th>
            <th className="px-3 py-2">User</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Score</th>
            <th className="px-3 py-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="px-3 py-2 font-medium">{r.id}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.user_id ?? "-"}</td>
              <td className="px-3 py-2 text-muted-foreground capitalize">{r.status || "-"}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.total_score ?? "-"}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.created_at || "-"}</td>
            </tr>
          ))}
          {responses.length === 0 && !loading && (
            <tr>
              <td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">
                No responses yet.
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
