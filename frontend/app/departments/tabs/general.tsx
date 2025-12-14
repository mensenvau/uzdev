"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";

export function GeneralTab({ departmentId }: { departmentId: string | null }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!departmentId) return;
      setLoading(true);
      try {
        const data = await api.get(`/departments/${departmentId}`).then((res) => res.data.department || res.data);
        setForm({ name: data.name || "", description: data.description || "" });
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load department"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [departmentId]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      if (departmentId) {
        await api.put(`/departments/${departmentId}`, form);
        toast.success("Department updated");
      } else {
        await api.post("/departments", form);
        toast.success("Department created");
      }
      router.push("/departments");
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} disabled={loading} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Input value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} disabled={loading} />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={loading}>
          {departmentId ? "Save changes" : "Create department"}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/departments")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
