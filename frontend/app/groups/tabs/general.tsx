"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

export function GeneralTab({ groupId }: { groupId: string | null }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!groupId) return;
      setLoading(true);
      try {
        const data = await api.get(`/groups/${groupId}`).then((res) => res.data.group || res.data);
        setForm({ name: data.name || "", description: data.description || "" });
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load group"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [groupId]);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setLoading(true);
    try {
      if (groupId) {
        await api.put(`/groups/${groupId}`, form);
        toast.success("Group updated");
      } else {
        await api.post("/groups", form);
        toast.success("Group created");
      }
      router.push("/groups");
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Edit the basic details for this group.</p>
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
          {groupId ? "Save changes" : "Create group"}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/groups")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
