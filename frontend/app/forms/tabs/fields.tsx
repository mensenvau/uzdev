"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "sonner";
import { formatApiError } from "@/lib/format-api-error";

type Option = { id?: number; label?: string; value: string; score?: number; option_order?: number };
type TableSource = { source_table: string; source_value_column: string; source_label_column: string };
type Field = {
  id?: number;
  field_key: string;
  label: string;
  field_type: string;
  is_required?: boolean;
  field_order?: number;
  options?: Option[];
  settings?: Record<string, any>;
  table_source?: TableSource | null;
};

const FIELD_TYPES = ["text", "textarea", "number", "select", "checkbox", "radio", "table_select", "score"];
const OPTION_TYPES = ["select", "checkbox", "radio", "score"];

const createField = (index: number): Field => ({
  field_key: `question_${Date.now()}_${index}`,
  label: "Untitled question",
  field_type: "text",
  is_required: false,
  options: [],
  settings: { description: "" },
});

const requiresOptions = (type: string) => OPTION_TYPES.includes(type);

export function FieldsTab({ formId }: { formId: string | null }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!formId) {
        setFields([]);
        return;
      }
      setLoading(true);
      try {
        const data = await api.get(`/forms/${formId}`).then((res) => res.data.form || res.data);
        const normalized = Array.isArray(data.fields)
          ? data.fields.map((f: any, idx: number) => ({
              ...f,
              options: Array.isArray(f.options) ? f.options : [],
              settings: f.settings || {},
              field_order: f.field_order ?? idx,
              table_source: f.table_source || null,
            }))
          : [];
        setFields(normalized);
      } catch (error: any) {
        toast.error(formatApiError(error, "Failed to load fields"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [formId]);

  const addField = () => {
    setFields((prev) => [...prev, createField(prev.length)]);
  };

  const updateField = (index: number, patch: Partial<Field>) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const duplicateField = (index: number) => {
    setFields((prev) => {
      const copy = { ...prev[index], id: undefined, field_key: `${prev[index].field_key}_copy_${Date.now()}` };
      return [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)];
    });
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

  const saveFields = async () => {
    if (!formId) return toast.error("Create and save form details first");
    setSaving(true);
    try {
      const payload = fields.map((field, index) => ({
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
      }));
      await api.put(`/forms/${formId}`, { fields: payload });
      toast.success("Fields saved");
    } catch (error: any) {
      toast.error(formatApiError(error, "Save failed"));
    } finally {
      setSaving(false);
    }
  };

  const fieldCount = useMemo(() => fields.length, [fields.length]);

  if (!formId) {
    return <p className="text-sm text-muted-foreground">Create the form in the General tab to start adding questions.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Dynamic questions</p>
          <p className="text-xs text-muted-foreground">{fieldCount} total</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={addField}>
            Add question
          </Button>
          <Button onClick={saveFields} disabled={saving || loading}>
            {saving ? "Saving..." : "Save fields"}
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading fields...</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, idx) => {
            const showOptions = requiresOptions(field.field_type);
            const showTableSource = field.field_type === "table_select";
            return (
              <div key={field.id || field.field_key} className="rounded-xl border bg-white/80 p-4 shadow-sm space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Question</label>
                    <Input value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border px-3 py-2 text-sm"
                      value={field.field_type}
                      onChange={(e) => updateField(idx, { field_type: e.target.value, options: requiresOptions(e.target.value) ? field.options || [] : [] })}
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="text-xs text-muted-foreground" onClick={() => moveField(idx, Math.max(0, idx - 1))} disabled={idx === 0}>
                      ↑
                    </button>
                    <button
                      type="button"
                      className="text-xs text-muted-foreground"
                      onClick={() => moveField(idx, Math.min(fields.length - 1, idx + 1))}
                      disabled={idx === fields.length - 1}
                    >
                      ↓
                    </button>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Field key</label>
                    <Input value={field.field_key} onChange={(e) => updateField(idx, { field_key: e.target.value })} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">Description (optional)</label>
                    <textarea
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      rows={2}
                      value={field.settings?.description || ""}
                      onChange={(e) => updateField(idx, { settings: { ...field.settings, description: e.target.value } })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={Boolean(field.is_required)} onChange={(e) => updateField(idx, { is_required: e.target.checked })} />
                  <span className="text-sm">Required</span>
                  <Button variant="ghost" size="sm" onClick={() => duplicateField(idx)}>
                    Duplicate
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeField(idx)}>
                    Remove
                  </Button>
                </div>

                {showOptions && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Options</p>
                      <Button size="sm" variant="secondary" onClick={() => addOption(idx)}>
                        Add option
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(field.options || []).map((option, optionIndex) => (
                        <div key={option.id || option.value || optionIndex} className="grid gap-2 md:grid-cols-12">
                          <Input
                            className="md:col-span-4"
                            placeholder="Label"
                            value={option.label || ""}
                            onChange={(e) => updateOption(idx, optionIndex, { label: e.target.value })}
                          />
                          <Input
                            className="md:col-span-4"
                            placeholder="Value"
                            value={option.value || ""}
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
                      {field.options?.length === 0 && <p className="text-xs text-muted-foreground">Add choices for select, radio, checkbox, or score fields.</p>}
                    </div>
                  </div>
                )}

                {showTableSource && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Table source</p>
                    <div className="grid gap-2 md:grid-cols-3">
                      <Input
                        placeholder="Table name"
                        value={field.table_source?.source_table || ""}
                        onChange={(e) => updateField(idx, { table_source: { ...(field.table_source || {}), source_table: e.target.value } as TableSource })}
                      />
                      <Input
                        placeholder="Value column"
                        value={field.table_source?.source_value_column || ""}
                        onChange={(e) =>
                          updateField(idx, { table_source: { ...(field.table_source || {}), source_value_column: e.target.value } as TableSource })
                        }
                      />
                      <Input
                        placeholder="Label column"
                        value={field.table_source?.source_label_column || ""}
                        onChange={(e) =>
                          updateField(idx, { table_source: { ...(field.table_source || {}), source_label_column: e.target.value } as TableSource })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {fields.length === 0 && <p className="text-sm text-muted-foreground">No questions yet. Start with "Add question".</p>}
        </div>
      )}
    </div>
  );
}
