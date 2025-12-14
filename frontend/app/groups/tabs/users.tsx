"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type GroupUser = { id: number; email: string; first_name?: string; last_name?: string };

export function UsersTab({ groupId }: { groupId: string | null }) {
  const [allUsers, setAllUsers] = useState<GroupUser[]>([]);
  const [members, setMembers] = useState<GroupUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [{ users }, groupDetail] = await Promise.all([api.get("/users", { params: { limit: 200 } }).then((res) => res.data), groupId ? api.get(`/groups/${groupId}`).then((res) => res.data.group || res.data) : Promise.resolve({ users: [] })]);
        setAllUsers(Array.isArray(users) ? users : []);
        setMembers(Array.isArray(groupDetail?.users) ? groupDetail.users : []);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load users"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [groupId]);

  const addUser = async (userId: number) => {
    if (!groupId) return toast.error("Save group first");
    try {
      await api.post("/groups/assign", { group_id: Number(groupId), user_id: userId });
      const found = allUsers.find((u) => u.id === userId);
      if (found) setMembers((prev) => (prev.some((m) => m.id === userId) ? prev : [...prev, found]));
      toast.success("User added");
    } catch (error: any) {
      toast.error(formatApiError(error, "Add failed"));
    }
  };

  const removeUser = async (userId: number) => {
    if (!groupId) return;
    try {
      await api.post("/groups/remove", { group_id: Number(groupId), user_id: userId });
      setMembers((prev) => prev.filter((m) => m.id !== userId));
      toast.success("User removed");
    } catch (error: any) {
      toast.error(formatApiError(error, "Remove failed"));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Assign or view users for this group.</p>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <select
          className="w-full md:w-64 rounded-md border px-3 py-2 text-sm"
          onChange={(e) => {
            const id = Number(e.target.value);
            if (id) addUser(id);
            e.target.value = "";
          }}
          defaultValue=""
          disabled={loading}
        >
          <option value="" disabled>
            Add user...
          </option>
          {allUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email}
            </option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground">Select to assign immediately.</p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="px-3 py-2">User</th>
              <th className="px-3 py-2 w-28">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="px-3 py-2 font-medium">{u.first_name || u.last_name ? `${u.first_name || ""} ${u.last_name || ""}`.trim() : u.email}</td>
                <td className="px-3 py-2">
                  <Button size="sm" variant="outline" onClick={() => removeUser(u.id)} disabled={loading}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={2} className="px-3 py-4 text-center text-muted-foreground">
                  No users in this group.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
