"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type AccessType = "user" | "group" | "role" | "link" | "public";
type AccessRow = { id: number; access_type: AccessType; access_value: string; expires_at?: string | null; created_at?: string };

export function AccessTab({ formId }: { formId: string | null }) {
  const [accessList, setAccessList] = useState<AccessRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [accessType, setAccessType] = useState<AccessType>("user");
  const [accessValue, setAccessValue] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setAccessList([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/forms/${formId}`).then((res) => res.data.form || res.data);
        setAccessList(Array.isArray(data.access) ? data.access : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load access list"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId]);

  const shareBase = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);

  const buildShareLink = (row: AccessRow) => {
    if (!formId || !shareBase) return "";
    if (row.access_type === "public") return `${shareBase}/forms/public/${formId}`;
    if (row.access_type === "link") return `${shareBase}/forms/public/${formId}?token=${row.access_value}`;
    return "";
  };

  const generateToken = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID().replace(/-/g, "");
    }
    return Math.random().toString(36).substring(2, 10);
  };

  const handleAdd = async () => {
    if (!formId) {
      toast.error("Save the form first");
      return;
    }
    const value = accessType === "public" ? "public" : accessValue.trim();
    if (!value) {
      toast.error("Access value is required");
      return;
    }

    setSaving(true);
    try {
      const payload = { access_type: accessType, access_value: value, expires_at: expiresAt || undefined };
      const created = await api.post(`/forms/${formId}/access`, payload).then((res) => res.data);
      setAccessList((prev) => [...prev, created]);
      toast.success("Access added");
      if (accessType === "link") {
        const link = `${shareBase}/forms/public/${formId}?token=${value}`;
        await navigator.clipboard?.writeText(link);
        toast.message("Share link copied", { description: link });
      }
      if (accessType === "public") {
        const link = `${shareBase}/forms/public/${formId}`;
        await navigator.clipboard?.writeText(link);
        toast.message("Public link copied", { description: link });
      }
      setAccessValue("");
      setExpiresAt("");
    } catch (error: any) {
      toast.error(formatApiError(error, "Failed to add access"));
    } finally {
      setSaving(false);
    }
  };

  if (!formId) {
    return <p className="text-sm text-muted-foreground">Create and save the form before configuring access.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm font-medium">Access type</label>
          <select
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={accessType}
            onChange={(e) => {
              const nextType = e.target.value as AccessType;
              setAccessType(nextType);
              if (nextType === "public") {
                setAccessValue("public");
              } else if (nextType === "link") {
                setAccessValue(generateToken());
              } else {
                setAccessValue("");
              }
            }}
          >
            <option value="user">User (ID or email)</option>
            <option value="group">Group</option>
            <option value="role">Role</option>
            <option value="link">Private link (token)</option>
            <option value="public">Public (no login)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Value</label>
          <div className="flex gap-2">
            <Input
              value={accessValue}
              disabled={accessType === "public"}
              placeholder={accessType === "link" ? "Auto token" : "Enter id/email/value"}
              onChange={(e) => setAccessValue(e.target.value)}
            />
            {accessType === "link" && (
              <Button type="button" variant="secondary" onClick={() => setAccessValue(generateToken())}>
                New token
              </Button>
            )}
          </div>
          {accessType === "public" && <p className="text-xs text-muted-foreground">Anyone with the link can view and submit.</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Expires at (optional)</label>
          <Input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleAdd} disabled={saving}>
          {saving ? "Saving..." : "Add access"}
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Expires</th>
              <th className="px-3 py-2">Share link</th>
            </tr>
          </thead>
          <tbody>
            {accessList.map((row) => {
              const link = buildShareLink(row);
              return (
                <tr key={row.id} className="border-t">
                  <td className="px-3 py-2 capitalize">{row.access_type}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.access_value}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.expires_at ? new Date(row.expires_at).toLocaleString() : "-"}</td>
                  <td className="px-3 py-2">
                    {link ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={async () => {
                          await navigator.clipboard?.writeText(link);
                          toast.success("Link copied");
                        }}
                      >
                        Copy link
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
            {accessList.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-muted-foreground">
                  No access rules yet.
                </td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-muted-foreground">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
