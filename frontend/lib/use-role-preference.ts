"use client";

import { useEffect, useState } from "react";

type UserWithRoles = {
  id?: string | number;
  role?: string;
  roles?: string[];
};

export function useRolePreference(user: UserWithRoles | null) {
  const [activeRole, setActiveRole] = useState<string | undefined>(() => user?.role);
  const allRoles = user?.roles && user.roles.length > 0 ? user.roles : user?.role ? [user.role] : [];

  useEffect(() => {
    if (!user?.id) return;
    const stored = localStorage.getItem(`active_role_${user.id}`);
    if (stored) {
      setActiveRole(stored);
    } else if (user?.role) {
      setActiveRole(user.role);
    }
  }, [user?.id, user?.role]);

  useEffect(() => {
    if (user?.id && activeRole) {
      localStorage.setItem(`active_role_${user.id}`, activeRole);
    }
  }, [activeRole, user?.id]);

  return {
    activeRole: activeRole || allRoles[0] || "user",
    roles: allRoles,
    setActiveRole,
  };
}
