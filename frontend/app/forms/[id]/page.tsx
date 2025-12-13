"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FormDetail } from "@/components/forms/form-detail"
import { isAuthenticated, logout } from "@/lib/auth"

export default function FormDetailPage() {
  const router = useRouter()
  const params = useParams()
  const formId = params.id as string

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login")
    }
  }, [router])

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Core App</h1>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/forms">
              <Button variant="ghost">Forms</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

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
  )
}
