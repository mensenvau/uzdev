"use client";

import { useEffect, useState } from "react";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type ResponseRow = { id: number; user_id?: number; status?: string; created_at?: string; total_score?: number };
type ResponseDetail = { response: ResponseRow; answers: { field_id: number; label: string; value: any; field_type: string; score?: number | null }[] };

export function ResponsesTab({ formId }: { formId: string | null }) {
  const [responses, setResponses] = useState<ResponseRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ResponseDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setResponses([]);
        setDetail(null);
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

  const loadDetail = async (responseId: number) => {
    if (!formId) return;
    setLoadingDetail(true);
    try {
      const data = await api.get(`/forms/${formId}/responses/${responseId}`).then((res) => res.data);
      setDetail(data as ResponseDetail);
    } catch (error: any) {
      toast.error(formatApiError(error, "Failed to load response detail"));
    } finally {
      setLoadingDetail(false);
    }
  };

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
            <th className="px-3 py-2 text-right">Actions</th>
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
              <td className="px-3 py-2 text-right">
                <button className="text-xs text-primary" onClick={() => loadDetail(r.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
          {responses.length === 0 && !loading && (
            <tr>
              <td colSpan={6} className="px-3 py-4 text-center text-muted-foreground">
                No responses yet.
              </td>
            </tr>
          )}
          {loading && (
            <tr>
              <td colSpan={6} className="px-3 py-4 text-center text-muted-foreground">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {detail && (
        <div className="border-t bg-muted/40 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Response #{detail.response.id}</p>
              <p className="text-xs text-muted-foreground">User: {detail.response.user_id ?? "n/a"} · Score: {detail.response.total_score ?? "-"}</p>
            </div>
            <button className="text-xs text-muted-foreground" onClick={() => setDetail(null)} disabled={loadingDetail}>
              Close
            </button>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {detail.answers.map((answer) => (
              <div key={answer.field_id} className="rounded-lg border bg-white p-3 space-y-1">
                <p className="text-sm font-medium">{answer.label}</p>
                <p className="text-xs uppercase text-muted-foreground">{answer.field_type}</p>
                <p className="text-sm text-muted-foreground break-words">
                  {Array.isArray(answer.value) ? answer.value.join(", ") : answer.value ?? "-"}
                </p>
                {typeof answer.score === "number" && <p className="text-xs text-muted-foreground">Score: {answer.score}</p>}
              </div>
            ))}
          </div>
          {loadingDetail && <p className="text-xs text-muted-foreground">Refreshing...</p>}
        </div>
      )}
    </div>
  );
}
