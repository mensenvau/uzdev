"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatApiError } from "@/lib/format-api-error";

type ResponseRow = { id: number; user_id?: number; status?: string; created_at?: string; total_score?: number };

export function StatsTab({ formId }: { formId: string | null }) {
  const [responses, setResponses] = useState<ResponseRow[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setResponses([]);
        return;
      }
      try {
        const data = await api.get(`/forms/${formId}/responses`).then((res) => res.data.responses || res.data);
        setResponses(Array.isArray(data) ? data : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load stats"));
        setResponses([]);
      }
    };
    load();
  }, [formId]);

  const stats = useMemo(() => {
    const total = responses.length;
    const submitted = responses.filter((r) => r.status === "submitted").length;
    const draft = responses.filter((r) => r.status === "draft").length;
    const totalScore = responses.reduce((sum, r) => sum + (Number(r.total_score) || 0), 0);
    const averageScore = total > 0 ? Math.round((totalScore / total) * 100) / 100 : 0;
    return { total, submitted, draft, averageScore };
  }, [responses]);

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Total responses</p>
        <p className="text-2xl font-semibold">{stats.total}</p>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Submitted</p>
        <p className="text-2xl font-semibold">{stats.submitted}</p>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Draft</p>
        <p className="text-2xl font-semibold">{stats.draft}</p>
      </div>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Avg score</p>
        <p className="text-2xl font-semibold">{stats.averageScore}</p>
      </div>
    </div>
  );
}
