"use client";

import { useMemo, useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthGuard } from "@/lib/use-auth-guard";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatApiError } from "@/lib/format-api-error";
import { useRouter } from "next/navigation";

type Option = { id?: number; label?: string; value: string; score?: number; option_order?: number };
type Field = {
  id?: number;
  field_key: string;
  label: string;
  field_type: string;
  is_required?: boolean;
  field_order?: number;
  options?: Option[];
  settings?: Record<string, any>;
};

const FIELD_TYPES = ["text", "textarea", "number", "select", "checkbox", "radio", "score"];
const OPTION_TYPES = ["select", "checkbox", "radio", "score"];

const requiresOptions = (type: string) => OPTION_TYPES.includes(type);
const createField = (index: number): Field => ({
  field_key: `question_${Date.now()}_${index}`,
  label: "Untitled question",
  field_type: "text",
  is_required: true,
  options: [],
  settings: { description: "" },
});

export default function FormBuilderPage() {
  const { user, checking, handleLogout } = useAuthGuard();
  const router = useRouter();
  const [formName, setFormName] = useState("Untitled form");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<Field[]>([createField(0)]);
  const [saving, setSaving] = useState(false);

  const fieldCount = useMemo(() => fields.length, [fields.length]);

  const addField = () => setFields((prev) => [...prev, createField(prev.length)]);

  const updateField = (index: number, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const moveField = (from: number, to: number) => {
    setFields((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const addOption = (fieldIndex: number) => {
    setFields((prev) =>
      prev.map((f, i) =>
        i === fieldIndex ? { ...f, options: [...(f.options || []), { label: "Option", value: `option_${Date.now()}` }] } : f
      )
    );
  };

  const updateOption = (fieldIndex: number, optionIndex: number, patch: Partial<Option>) => {
    setFields((prev) =>
      prev.map((f, i) => {
        if (i !== fieldIndex) return f;
        const opts = [...(f.options || [])];
        opts[optionIndex] = { ...opts[optionIndex], ...patch };
        return { ...f, options: opts };
      })
    );
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    setFields((prev) =>
      prev.map((f, i) => {
        if (i !== fieldIndex) return f;
        const opts = [...(f.options || [])];
        opts.splice(optionIndex, 1);
        return { ...f, options: opts };
      })
    );
  };

  const saveForm = async () => {
    if (!formName.trim()) {
      toast.error("Form name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: formName.trim(),
        description: formDescription.trim(),
        fields: fields.map((field, index) => ({
          ...field,
          field_order: index,
          options: requiresOptions(field.field_type)
            ? (field.options || []).map((opt, optIndex) => ({
                ...opt,
                option_order: opt.option_order ?? optIndex,
                label: opt.label || opt.value,
                value: opt.value || `option_${optIndex + 1}`,
              }))
            : [],
        })),
      };
      const created = await api.post("/forms", payload).then((res) => res.data.form || res.data);
      toast.success("Form saved");
      if (created?.id) {
        router.push(`/forms/manage?id=${created.id}&tab=fields`);
      } else {
        router.push("/forms");
      }
    } catch (error: any) {
      toast.error(formatApiError(error, "Failed to save form"));
    } finally {
      setSaving(false);
    }
  };

  if (checking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Preparing form builder...</p>
      </div>
    );
  }

  return (
    <DashboardShell user={user} onLogout={handleLogout} title="Form builder" subtitle="Create dynamic forms and preview them instantly.">
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
              <textarea
                className="w-full rounded-md border px-3 py-2 text-sm"
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Questions: {fieldCount}</span>
              <Button onClick={saveForm} disabled={saving}>
                {saving ? "Saving..." : "Save form"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>Build like Google Forms: add, require, and reorder.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" variant="secondary" onClick={addField}>
                Add question
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, idx) => (
                <div key={field.field_key} className="rounded-xl border p-4 space-y-3">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 space-y-2">
                      <label className="text-xs text-muted-foreground">Question</label>
                      <Input value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="rounded-md border px-3 py-2 text-sm"
                        value={field.field_type}
                        onChange={(e) => updateField(idx, { field_type: e.target.value, options: requiresOptions(e.target.value) ? field.options || [] : [] })}
                      >
                        {FIELD_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <input
                        type="checkbox"
                        checked={Boolean(field.is_required)}
                        onChange={(e) => updateField(idx, { is_required: e.target.checked })}
                        title="Required"
                      />
                      <Button size="sm" variant="ghost" onClick={() => moveField(idx, Math.max(0, idx - 1))} disabled={idx === 0}>
                        Up
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => moveField(idx, Math.min(fields.length - 1, idx + 1))} disabled={idx === fields.length - 1}>
                        Down
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeField(idx)}>
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">Field key</label>
                      <Input value={field.field_key} onChange={(e) => updateField(idx, { field_key: e.target.value })} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-muted-foreground">Description</label>
                      <Input
                        value={field.settings?.description || ""}
                        onChange={(e) => updateField(idx, { settings: { ...field.settings, description: e.target.value } })}
                      />
                    </div>
                  </div>

                  {requiresOptions(field.field_type) && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Options</p>
                        <Button size="sm" variant="secondary" onClick={() => addOption(idx)}>
                          Add option
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(field.options || []).map((option, optionIndex) => (
                          <div key={option.value} className="grid gap-2 md:grid-cols-12">
                            <Input
                              className="md:col-span-5"
                              placeholder="Label"
                              value={option.label || ""}
                              onChange={(e) => updateOption(idx, optionIndex, { label: e.target.value })}
                            />
                            <Input
                              className="md:col-span-5"
                              placeholder="Value"
                              value={option.value}
                              onChange={(e) => updateOption(idx, optionIndex, { value: e.target.value })}
                            />
                            {field.field_type === "score" && (
                              <Input
                                className="md:col-span-2"
                                type="number"
                                placeholder="Score"
                                value={option.score ?? 0}
                                onChange={(e) => updateOption(idx, optionIndex, { score: Number(e.target.value) })}
                              />
                            )}
                            <div className="md:col-span-2 flex items-center justify-end">
                              <Button size="sm" variant="ghost" onClick={() => removeOption(idx, optionIndex)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        {field.options?.length === 0 && <p className="text-xs text-muted-foreground">Add options for select, radio, checkbox, or score.</p>}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {fields.length === 0 && <p className="text-sm text-muted-foreground">No questions yet. Add your first question.</p>}
            </div>

            <div className="rounded-xl border bg-slate-50 p-4 space-y-3">
              <p className="text-sm font-medium">Live preview</p>
              <div className="space-y-3">
                <div>
                  <p className="text-base font-semibold">{formName || "Untitled form"}</p>
                  <p className="text-xs text-muted-foreground">{formDescription || "Describe the purpose of this form."}</p>
                </div>
                {fields.map((field) => (
                  <div key={`preview-${field.field_key}`} className="space-y-1">
                    <p className="text-sm font-medium">
                      {field.label} {field.is_required && <span className="text-destructive">*</span>}
                    </p>
                    <Input placeholder={field.settings?.description || "Your answer"} readOnly />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
