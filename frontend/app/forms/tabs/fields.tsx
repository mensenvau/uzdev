"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatApiError } from "@/lib/format-api-error";
import { toast } from "sonner";
import api from "@/lib/api";

type Option = { id?: number; label?: string; value: string; score?: number; option_order?: number };
type TableSource = { source_table: string; source_value_column: string; source_label_column: string };
type ColumnMeta = { table_name: string; column_name: string; data_type?: string };
type FieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "radio" | "column" | "score" | "markdown" | "page_break";
type Field = {
  id?: number;
  field_key?: string;
  label: string;
  field_type: FieldType;
  is_required?: boolean;
  field_order?: number;
  options?: Option[];
  settings?: Record<string, any>;
  table_source?: TableSource | null;
};

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "textarea", label: "Long text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Dropdown" },
  { value: "checkbox", label: "Checkboxes" },
  { value: "radio", label: "Multiple choice" },
  { value: "column", label: "Column (DB)" },
  { value: "score", label: "Score choices" },
  { value: "markdown", label: "Markdown / text" },
  { value: "page_break", label: "Page break" },
];

const OPTION_TYPES = ["select", "checkbox", "radio", "score"];
const DISPLAY_ONLY_TYPES: FieldType[] = ["markdown", "page_break"];

const createField = (index: number): Field => ({
  field_key: `field_${Date.now()}_${index}`,
  label: "",
  field_type: "text",
  is_required: false,
  options: [],
  settings: {},
});

const requiresOptions = (type: FieldType) => OPTION_TYPES.includes(type);
const canBeRequired = (type: FieldType) => !DISPLAY_ONLY_TYPES.includes(type);

export function FieldsTab({ formId }: { formId: string | null }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [columnQueries, setColumnQueries] = useState<Record<number, string>>({});
  const [columnResults, setColumnResults] = useState<Record<number, ColumnMeta[]>>({});

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
              field_type: (f.field_type as FieldType) || "text",
              options: Array.isArray(f.options) ? f.options : [],
              settings: f.settings || {},
              field_order: f.field_order ?? idx,
              table_source: f.table_source || null,
              field_key: f.field_key || `field_${idx + 1}`,
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
      const copy = { ...prev[index], id: undefined, field_key: `field_${Date.now()}_${index}` };
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
    setFields((prev) => prev.map((f, i) => (i === fieldIndex ? { ...f, options: [...(f.options || []), { label: "Option", value: "" }] } : f)));
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

  const searchColumns = async (fieldIndex: number) => {
    const term = columnQueries[fieldIndex] || "";
    try {
      const { columns } = await api.get("/forms/meta/columns", { params: { q: term } }).then((res) => res.data);
      const normalized = Array.isArray(columns)
        ? columns.map((col: any) => ({
            table_name: col.table_name || col.TABLE_NAME || "",
            column_name: col.column_name || col.COLUMN_NAME || "",
            data_type: col.data_type || col.DATA_TYPE || "",
          }))
        : [];
      setColumnResults((prev) => ({ ...prev, [fieldIndex]: normalized }));
    } catch (error: any) {
      toast.error(formatApiError(error, "Column search failed"));
    }
  };

  const selectColumn = (fieldIndex: number, column: ColumnMeta) => {
    updateField(fieldIndex, {
      table_source: {
        source_table: column.table_name,
        source_value_column: column.column_name,
        source_label_column: column.column_name,
      },
    });
  };

  const saveFields = async () => {
    if (!formId) return toast.error("Create and save form details first");
    setSaving(true);
    try {
      const payload = fields.map((field, index) => {
        const fieldKey = field.field_key || `field_${index + 1}_${Date.now()}`;
        const hasSource = field.table_source?.source_table && field.table_source?.source_value_column && field.table_source?.source_label_column;
        return {
          ...field,
          field_key: fieldKey,
          field_order: index,
          table_source: hasSource
            ? {
                source_table: field.table_source!.source_table,
                source_value_column: field.table_source!.source_value_column,
                source_label_column: field.table_source!.source_label_column,
              }
            : undefined,
          options: requiresOptions(field.field_type)
            ? (field.options || []).map((opt, optIndex) => ({
                ...opt,
                option_order: opt.option_order ?? optIndex,
                label: opt.label || opt.value || `Option ${optIndex + 1}`,
                value: opt.value || opt.label || `option_${optIndex + 1}`,
              }))
            : [],
        };
      });
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
    return <p className="text-sm text-muted-foreground">Create the form in the General tab to start adding fields.</p>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div>
          <p className="text-sm font-medium">Fields</p>
          <p className="text-xs text-muted-foreground">{fieldCount} total</p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading fields...</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field, idx) => {
            const showOptions = requiresOptions(field.field_type);
            const showColumnPicker = field.field_type === "column";
            const isMarkdown = field.field_type === "markdown";
            const isPageBreak = field.field_type === "page_break";
            const showRequiredToggle = canBeRequired(field.field_type);
            const columnList = columnResults[idx] || [];
            const selectedColumn = field.table_source;

            return (
              <div key={field.id || field.field_key || idx} className="rounded-xl border bg-white/80 p-4 shadow-sm space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-3">
                  <div className="flex-1">
                    <textarea className="w-full rounded-lg border px-3 py-2 text-sm" rows={1} placeholder="Field label" value={field.label} onChange={(e) => updateField(idx, { label: e.target.value })} />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border px-3 py-2 text-sm"
                      value={field.field_type}
                      onChange={(e) => {
                        const nextType = e.target.value as FieldType;
                        updateField(idx, {
                          field_type: nextType,
                          options: requiresOptions(nextType) ? field.options || [] : [],
                          is_required: canBeRequired(nextType) ? field.is_required : false,
                        });
                      }}
                    >
                      {FIELD_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    <button type="button" className="text-xs text-muted-foreground" onClick={() => moveField(idx, Math.max(0, idx - 1))} disabled={idx === 0}>
                      ↑
                    </button>
                    <button type="button" className="text-xs text-muted-foreground" onClick={() => moveField(idx, Math.min(fields.length - 1, idx + 1))} disabled={idx === fields.length - 1}>
                      ↓
                    </button>
                  </div>
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
                        <div key={optionIndex} className="grid gap-2 md:grid-cols-12">
                          <textarea className="md:col-span-6 rounded-md border px-3 py-2 text-sm" rows={2} placeholder="Label" value={option.label || ""} onChange={(e) => updateOption(idx, optionIndex, { label: e.target.value })} />
                          <Input className="md:col-span-4" placeholder="Value" value={option.value || ""} onChange={(e) => updateOption(idx, optionIndex, { value: e.target.value })} />
                          {field.field_type === "score" && <Input className="md:col-span-2" type="number" placeholder="Score" value={option.score ?? 0} onChange={(e) => updateOption(idx, optionIndex, { score: Number(e.target.value) })} />}
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

                {showColumnPicker && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search public_* table or column" value={columnQueries[idx] || ""} onChange={(e) => setColumnQueries((prev) => ({ ...prev, [idx]: e.target.value }))} />
                      <Button variant="secondary" size="sm" onClick={() => searchColumns(idx)}>
                        Search
                      </Button>
                    </div>
                    {selectedColumn && (
                      <div className="grid gap-2 md:grid-cols-2">
                        <Input
                          placeholder="Value column"
                          value={selectedColumn.source_value_column}
                          onChange={(e) =>
                            updateField(idx, {
                              table_source: {
                                ...(selectedColumn || {}),
                                source_value_column: e.target.value,
                              } as TableSource,
                            })
                          }
                        />
                        <Input
                          placeholder="Label column"
                          value={selectedColumn.source_label_column}
                          onChange={(e) =>
                            updateField(idx, {
                              table_source: {
                                ...(selectedColumn || {}),
                                source_label_column: e.target.value,
                              } as TableSource,
                            })
                          }
                        />
                      </div>
                    )}
                    {selectedColumn && (
                      <p className="text-xs text-muted-foreground">
                        Selected: {selectedColumn.source_table || ""}.{selectedColumn.source_value_column || ""}
                      </p>
                    )}
                    <div className="grid gap-2 md:grid-cols-2">
                      {columnList.map((col) => (
                        <button key={`${col.table_name}.${col.column_name}`} className="rounded-lg border px-3 py-2 text-left hover:border-primary" onClick={() => selectColumn(idx, col)} type="button">
                          <p className="text-sm font-medium">
                            {col.table_name}.{col.column_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{col.data_type}</p>
                        </button>
                      ))}
                      {columnList.length === 0 && <p className="text-xs text-muted-foreground">No columns yet. Search above.</p>}
                    </div>
                  </div>
                )}

                {isMarkdown && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Markdown content</label>
                    <textarea
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      rows={4}
                      placeholder="This content is displayed as read-only markdown to users."
                      value={field.settings?.content || ""}
                      onChange={(e) => updateField(idx, { settings: { ...(field.settings || {}), content: e.target.value } })}
                    />
                    <p className="text-xs text-muted-foreground">Use this for instructions, descriptions, or static blocks.</p>
                  </div>
                )}

                {isPageBreak && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Page description (optional)</label>
                    <textarea
                      className="w-full rounded-md border px-3 py-2 text-sm"
                      rows={3}
                      placeholder="Add context for the next page."
                      value={field.settings?.description || ""}
                      onChange={(e) => updateField(idx, { settings: { ...(field.settings || {}), description: e.target.value } })}
                    />
                    <p className="text-xs text-muted-foreground">A page break starts a new page. Everything after this block is shown on the next step.</p>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-1">
                  <Button variant="ghost" size="sm" onClick={() => duplicateField(idx)}>
                    Duplicate
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => removeField(idx)}>
                    Remove
                  </Button>
                  {showRequiredToggle ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={Boolean(field.is_required)} onChange={(e) => updateField(idx, { is_required: e.target.checked })} />
                      Required
                    </label>
                  ) : (
                    <span className="text-xs text-muted-foreground">Display-only</span>
                  )}
                </div>
              </div>
            );
          })}

          {fields.length === 0 && <p className="text-sm text-muted-foreground">No fields yet. Start with \"Add field\".</p>}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button onClick={saveFields} disabled={saving || loading}>
          {saving ? "Saving..." : "Save fields"}
        </Button>
        <Button variant="secondary" onClick={addField}>
          Add field
        </Button>
      </div>
    </div>
  );
}
