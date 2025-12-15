"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatApiError } from "@/lib/format-api-error";
import { useRouter } from "next/navigation";

export function GeneralTab({ formId }: { formId: string | null }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!formId) return;
      setLoading(true);
      try {
        const data = await api.get(`/forms/${formId}`).then((res) => res.data.form || res.data);
        setForm({ name: data.name || "", description: data.description || "" });
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load form"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      if (formId) {
        await api.put(`/forms/${formId}`, form);
        toast.success("Form updated");
      } else {
        const created = await api.post("/forms", form).then((res) => res.data.form || res.data);
        toast.success("Form created. Add your questions next.");
        if (created?.id) {
          router.push(`/forms/manage?id=${created.id}&tab=fields`);
          return;
        }
      }
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Form name</label>
        <Input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} disabled={loading} />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={loading}>
          {formId ? "Save changes" : "Create form"}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/forms")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
