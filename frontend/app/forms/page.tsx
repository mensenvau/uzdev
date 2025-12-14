"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FormList } from "@/components/forms/form-list"
import { getUser, isAuthenticated, logout } from "@/lib/auth"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { toast } from "sonner"

export default function FormsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please sign in to view forms.")
      router.push("/auth/login")
      return
    }

    const currentUser = getUser()
    if (!currentUser) {
      logout()
      toast.error("Session data is missing. Please sign in again.")
      router.push("/auth/login")
      return
    }

    setUser(currentUser)
  }, [router])

  const handleLogout = () => {
    logout()
    toast.success("Signed out.")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading forms...</p>
      </div>
    )
  }

  return (
    <DashboardShell
      user={user}
      title="Forms library"
      subtitle="Browse, preview, and submit available forms."
      onLogout={handleLogout}
    >
      <div className="space-y-6">
        <div className="rounded-2xl border bg-white/70 backdrop-blur px-5 py-4">
          <p className="text-sm text-muted-foreground">
            Choose a form to submit. Your access controls ensure only the right data reaches the right place.
          </p>
        </div>
        <FormList />
      </div>
    </DashboardShell>
  )
}
