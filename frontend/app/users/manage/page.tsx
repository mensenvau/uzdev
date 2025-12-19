"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { GeneralTab } from "../tabs/general";
import { RolesTab } from "../tabs/roles";
import { GroupsTab } from "../tabs/groups";
import api from "@/lib/api";

export function ManageUserPage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const [activeTab, setActiveTab] = useState<"general" | "roles" | "groups">("general");
  const [loadedUser, setLoadedUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const title = userId ? "Edit user" : "Create user";
  const tabs = useMemo(
    () => [
      { key: "general", label: "General" },
      { key: "roles", label: "Roles" },
      { key: "groups", label: "Groups" },
    ],
    []
  );

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && tabs.some((t) => t.key === tabParam)) {
      setActiveTab(tabParam as any);
    }
  }, [searchParams, tabs]);

  const handleTabChange = (tabKey: "general" | "roles" | "groups") => {
    setActiveTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabKey);
    if (userId) params.set("id", userId);
    window.history.replaceState(null, "", `/users/manage?${params.toString()}`);
  };

  // Fetch user once for all tabs
  useEffect(() => {
    const load = async () => {
      if (!userId) {
        setLoadedUser(null);
        return;
      }
      setLoadingUser(true);
      try {
        const data = await api.get(`/users/${userId}`).then((res) => res.data.user || res.data);
        setLoadedUser(data);
      } catch (error) {
      } finally {
        setLoadingUser(false);
      }
    };
    load();
  }, [userId]);

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title={title} subtitle="Manage account, roles, and access">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">User details</h2>
            <p className="text-sm text-muted-foreground">Structured tabs to manage this user.</p>
          </div>
          <Tabs>
            <TabsList className="bg-muted">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.key} active={activeTab === tab.key} onClick={() => handleTabChange(tab.key as any)}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="rounded-xl border bg-white/80 backdrop-blur p-6 space-y-6">
          {loadingUser ? (
            <p className="text-muted-foreground text-sm">Loading user...</p>
          ) : (
            <>
              {activeTab === "general" && <GeneralTab userId={userId} initialUser={loadedUser} onUserChange={setLoadedUser} />}
              {activeTab === "roles" && <RolesTab userId={userId} initialUser={loadedUser} onUserChange={setLoadedUser} />}
              {activeTab === "groups" && <GroupsTab userId={userId} initialUser={loadedUser} />}
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

export default ManageUserPage;
