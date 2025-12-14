"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/format-api-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";

export function GeneralTab({ roleId }: { roleId: string | null }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!roleId) return;
      setLoading(true);
      try {
        const data = await api.get(`/roles/${roleId}`).then((res) => res.data.role || res.data);
        setForm({ name: data.name || "", description: data.description || "" });
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load role"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [roleId]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      if (roleId) {
        await api.put(`/roles/${roleId}`, form);
        toast.success("Role updated");
      } else {
        await api.post("/roles", form);
        toast.success("Role created");
      }
      router.push("/roles");
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
          {roleId ? "Save changes" : "Create role"}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/roles")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
