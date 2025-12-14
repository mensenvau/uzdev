"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatApiError } from "@/lib/format-api-error";

type Field = {
  id?: number;
  field_key: string;
  label: string;
  field_type: string;
  options?: string[];
};

const FIELD_TYPES = ["text", "textarea", "number", "select", "checkbox", "radio", "table_select", "score"];

export function FieldsTab({ formId }: { formId: string | null }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setFields([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/forms/${formId}`).then((res) => res.data.form || res.data);
        setFields(Array.isArray(data.fields) ? data.fields : []);
      } catch {
        setFields([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId]);

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { field_key: `field_${prev.length + 1}`, label: "Untitled question", field_type: "text", options: [] },
    ]);
  };

  const updateField = (index: number, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  };

  const saveFields = async () => {
    if (!formId) return toast.error("Create form first");
    try {
      await api.put(`/forms/${formId}`, { fields });
      toast.success("Fields saved");
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed (backend must support fields payload)"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Add questions and table options.</p>
        <Button size="sm" onClick={addField}>
          Add field
        </Button>
      </div>
      <div className="space-y-4">
        {fields.map((field, idx) => (
          <div key={idx} className="rounded-xl border p-4 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Label</label>
                <Input value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Type</label>
                <select
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  value={field.field_type}
                  onChange={(e) => updateField(idx, { field_type: e.target.value })}
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Options (for select/checkbox/radio/table)</label>
              <Input
                placeholder="Comma separated"
                value={(field.options || []).join(",")}
                onChange={(e) => updateField(idx, { options: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
              />
            </div>
          </div>
        ))}
        {fields.length === 0 && <p className="text-sm text-muted-foreground">No fields yet. Add your first question.</p>}
      </div>
      <Button onClick={saveFields} disabled={loading || !formId}>
        Save fields
      </Button>
      {!formId && <p className="text-xs text-muted-foreground">Create the form first to persist fields.</p>}
    </div>
  );
}
