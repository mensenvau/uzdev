"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormDetail } from "@/components/forms/form-detail";
import { isAuthenticated, logout } from "@/lib/auth";
import TopNav from "@/components/layout/top-nav";
import Link from "next/link";

export default function FormDetailPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.id as string;

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNav onLogout={handleLogout} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <Link href="/forms">
              <Button variant="ghost" className="mb-4">
                ← Back to Forms
              </Button>
            </Link>
          </div>

          <FormDetail formId={formId} />
        </div>
      </main>
    </div>
  );
}
