"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type NavItem = { label: string; href: string };

const NAV_ITEMS_BY_ROLE: Record<string, NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Forms", href: "/forms" },
    { label: "Users", href: "/users" },
    { label: "Roles", href: "/roles" },
  ],
  manager: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Forms", href: "/forms" },
  ],
  user: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Forms", href: "/forms" },
  ],
};

export function TopNav({ role = "user", onLogout }: { role?: string; onLogout?: () => void }) {
  const pathname = usePathname();
  const items = NAV_ITEMS_BY_ROLE[role] || NAV_ITEMS_BY_ROLE.user;

  return (
    <nav className="border-b bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Core App</h1>
        <div className="flex items-center gap-2 md:gap-4">
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}>{item.label}</Button>
            </Link>
          ))}
          {onLogout && (
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
