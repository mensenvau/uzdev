"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"

interface Form {
  _id: string
  name: string
  description: string
  schema: any
  createdAt: string
}

export function FormList() {
  const [forms, setForms] = useState<Form[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.get("/forms")
        setForms(response.data)
      } catch (err: any) {
        setError("Failed to load forms")
      } finally {
        setLoading(false)
      }
    }

    fetchForms()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading forms...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">
        {error}
      </div>
    )
  }

  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No forms available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <Card key={form._id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">{form.name}</CardTitle>
            <CardDescription className="line-clamp-2">
              {form.description || "No description"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <Link href={`/forms/${form._id}`}>
              <Button className="w-full">View Form</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
