"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUser, isAuthenticated, logout } from "./auth"
import { toast } from "sonner"

export function useAuthGuard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) {
      toast.error("Please sign in to continue.")
      router.push("/auth/login")
      return
    }

    const currentUser = getUser()
    if (!currentUser) {
      logout()
      toast.error("Session data missing. Please sign in again.")
      router.push("/auth/login")
      return
    }

    setUser(currentUser)
    setChecking(false)
  }, [router])

  const handleLogout = () => {
    logout()
    toast.success("Signed out.")
  }

  return { user, checking, handleLogout }
}
