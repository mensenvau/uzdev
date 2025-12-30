"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type GeneralTabProps = {
  userId: string | null;
  initialUser?: any;
  onUserChange?: (user: any) => void;
};

export function GeneralTab({ userId, initialUser, onUserChange }: GeneralTabProps) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", first_name: "", last_name: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      if (initialUser) {
        setForm({
          email: initialUser.email || "",
          first_name: initialUser.first_name || "",
          last_name: initialUser.last_name || "",
          phone: initialUser.phone || "",
          password: "",
        });
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/users/${userId}`).then((res) => res.data.user || res.data);
        setForm({
          email: data.email || "",
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          phone: data.phone || "",
          password: "",
        });
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load user"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const handleSave = async () => {
    if (!form.email || !form.first_name || !form.last_name || !form.phone || (!userId && !form.password)) {
      toast.error("Fill required fields");
      return;
    }

    setLoading(true);
    try {
      if (userId) {
        await api.put(`/users/${userId}`, {
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
        });
        onUserChange?.({
          ...(initialUser || {}),
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone,
        });
        toast.success("User updated");
      } else {
        const created = await api.post("/users", form).then((res) => res.data.user || res.data);
        onUserChange?.(created);
        toast.success("User created");
      }
      router.push("/users");
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Edit the basic details for this user.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} required disabled={loading} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} required disabled={loading} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">First name</label>
          <Input value={form.first_name} onChange={(e) => setForm((prev) => ({ ...prev, first_name: e.target.value }))} required disabled={loading} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last name</label>
          <Input value={form.last_name} onChange={(e) => setForm((prev) => ({ ...prev, last_name: e.target.value }))} required disabled={loading} />
        </div>
      </div>

      {!userId && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} required disabled={loading} />
        </div>
      )}

      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={loading}>
          {userId ? "Save changes" : "Create user"}
        </Button>
        <Button variant="ghost" onClick={() => router.push("/users")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
