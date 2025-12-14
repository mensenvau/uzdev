"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthGuard } from "@/lib/use-auth-guard"
import { toast } from "sonner"

type Field = {
  id: number
  label: string
  name: string
  type: string
  required: boolean
}

export default function FormBuilderPage() {
  const { user, checking, handleLogout } = useAuthGuard()
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [fields, setFields] = useState<Field[]>([])
  const [fieldDraft, setFieldDraft] = useState<Omit<Field, "id">>({
    label: "",
    name: "",
    type: "text",
    required: true,
  })

  const addField = () => {
    if (!fieldDraft.label.trim() || !fieldDraft.name.trim()) {
      toast.error("Field label and name are required")
      return
    }
    setFields((prev) => [...prev, { id: Date.now(), ...fieldDraft }])
    setFieldDraft({ label: "", name: "", type: "text", required: true })
  }

  const removeField = (id: number) => {
    setFields((prev) => prev.filter((f) => f.id !== id))
  }

  const handlePublish = () => {
    if (!formName.trim() || fields.length === 0) {
      toast.error("Add a name and at least one field")
      return
    }
    toast.success("Form draft ready. Hook this to backend to save.")
  }

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Preparing form builder...</p>
      </div>
    )
  }

  return (
    <DashboardShell
      user={user}
      onLogout={handleLogout}
      title="Form builder"
      subtitle="Create dynamic forms and preview them instantly."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2 border bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Form meta</CardTitle>
            <CardDescription>Name and describe your form.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Form name</label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input value={formDescription} onChange={(e) => setFormDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New field</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Label"
                  value={fieldDraft.label}
                  onChange={(e) => setFieldDraft((prev) => ({ ...prev, label: e.target.value }))}
                />
                <Input
                  placeholder="Name (slug)"
                  value={fieldDraft.name}
                  onChange={(e) => setFieldDraft((prev) => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Type (text, number, email)"
                  value={fieldDraft.type}
                  onChange={(e) => setFieldDraft((prev) => ({ ...prev, type: e.target.value }))}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={fieldDraft.required}
                    onChange={(e) => setFieldDraft((prev) => ({ ...prev, required: e.target.checked }))}
                  />
                  <span className="text-sm">Required</span>
                </div>
              </div>
              <Button type="button" variant="secondary" onClick={addField}>
                Add field
              </Button>
            </div>
            <Button onClick={handlePublish} className="w-full">
              Save draft
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>Form renders as you add fields.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-lg font-semibold">{formName || "Untitled form"}</p>
              <p className="text-sm text-muted-foreground">
                {formDescription || "Describe the purpose of this form."}
              </p>
            </div>
            <div className="space-y-3">
              {fields.map((field) => (
                <div key={field.id} className="rounded-xl border bg-white p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{field.label}</p>
                      <p className="text-xs text-muted-foreground">{field.name}</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => removeField(field.id)}>
                      Remove
                    </Button>
                  </div>
                  <Input placeholder={field.label} required={field.required} />
                  <p className="text-xs text-muted-foreground mt-1">
                    Type: {field.type} • {field.required ? "Required" : "Optional"}
                  </p>
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-sm text-muted-foreground">Add fields to see them here.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
