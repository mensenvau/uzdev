"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type Group = { id: number; name: string; description?: string };

export function GroupsTab({ userId, initialUser }: { userId: string | null; initialUser?: any }) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [membership, setMembership] = useState<number[]>(() => (Array.isArray(initialUser?.groups) ? initialUser.groups.map((g: any) => g.id) : []));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { groups: opts } = await api.get("/groups", { params: { limit: 100 } }).then((res) => res.data);
        setGroups(Array.isArray(opts) ? opts : []);
        if (initialUser?.groups) {
          setMembership(Array.isArray(initialUser.groups) ? initialUser.groups.map((g: any) => g.id) : []);
        }
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load groups"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, initialUser]);

  const toggleGroup = async (groupId: number) => {
    if (!userId) return toast.error("Save user first");
    const isMember = membership.includes(groupId);
    try {
      if (isMember) {
        await api.post("/groups/remove", { group_id: groupId, user_id: Number(userId) });
        setMembership((prev) => prev.filter((id) => id !== groupId));
        toast.success("Removed from group");
      } else {
        await api.post("/groups/assign", { group_id: groupId, user_id: Number(userId) });
        setMembership((prev) => [...prev, groupId]);
        toast.success("Added to group");
      }
    } catch (error: any) {
      toast.error(formatApiError(error, "Update group failed"));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Manage memberships in groups.</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <select
            className="w-full md:w-64 rounded-md border px-3 py-2 text-sm"
            onChange={(e) => {
              const groupId = Number(e.target.value);
              if (groupId) toggleGroup(groupId);
              e.target.value = "";
            }}
            defaultValue=""
            disabled={loading}
          >
            <option value="" disabled>
              Add to group...
            </option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground">Select to add/remove immediately.</p>
        </div>
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground">
                <th className="px-3 py-2">Group</th>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2 w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups
                .filter((g) => membership.includes(g.id))
                .map((g) => (
                  <tr key={g.id} className="border-t">
                    <td className="px-3 py-2 font-medium">{g.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{g.description || ""}</td>
                    <td className="px-3 py-2">
                      <Button size="sm" variant="outline" onClick={() => toggleGroup(g.id)} disabled={loading}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              {membership.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-muted-foreground">
                    Not a member of any group.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
