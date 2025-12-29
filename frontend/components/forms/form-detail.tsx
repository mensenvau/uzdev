"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";

type FormFieldOption = {
  id?: number;
  value: string;
  label?: string;
  score?: number;
};

type FormFieldType = "text" | "textarea" | "number" | "select" | "checkbox" | "radio" | "column" | "score" | "markdown" | "page_break";
type FormField = {
  id: number;
  field_key: string;
  label: string;
  field_type: FormFieldType;
  is_required?: boolean;
  options?: FormFieldOption[];
  settings?: Record<string, any> & { description?: string; content?: string };
  table_source?: { source_table: string; source_value_column: string; source_label_column: string } | null;
};

type FormData = {
  id: number;
  name: string;
  description?: string;
  fields: FormField[];
};

interface FormDetailProps {
  formId: string;
  accessToken?: string | null;
  publicMode?: boolean;
}

const NON_INPUT_TYPES = new Set<FormFieldType>(["markdown", "page_break"]);

export function FormDetail({ formId, accessToken }: FormDetailProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData | null>(null);
  const [formValues, setFormValues] = useState<Record<number, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [columnOptions, setColumnOptions] = useState<Record<number, FormFieldOption[]>>({});
  const [currentPage, setCurrentPage] = useState(0);

  const questionCount = useMemo(() => (form?.fields || []).filter((f) => !NON_INPUT_TYPES.has(f.field_type)).length, [form?.fields]);
  const sections = useMemo(() => {
    const pages: { title?: string; description?: string; fields: FormField[] }[] = [{ title: form?.name, description: "", fields: [] }];
    let current = pages[0];
    (form?.fields || []).forEach((field) => {
      if (field.field_type === "page_break") {
        current = { title: field.label || `Page ${pages.length + 1}`, description: field.settings?.description || "", fields: [] };
        pages.push(current);
        return;
      }
      current.fields.push(field);
    });
    return pages.filter((page) => page.fields.length || page.title);
  }, [form]);

  useEffect(() => {
    setCurrentPage(0);
  }, [formId]);

  useEffect(() => {
    if (sections.length && currentPage > sections.length - 1) {
      setCurrentPage(sections.length - 1);
    }
  }, [sections.length, currentPage]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const endpoint = accessToken ? `/forms/${formId}/public` : `/forms/${formId}`;
        const payload = await api.get(endpoint, accessToken ? { params: { token: accessToken } } : undefined).then((res) => res.data);
        const resolved = payload?.form || payload;
        if (!resolved) throw new Error("Form not found");
        const fields: FormField[] = Array.isArray(resolved.fields) ? resolved.fields : [];
        const initialValues: Record<number, any> = {};
        fields.forEach((field: FormField) => {
          if (NON_INPUT_TYPES.has(field.field_type)) return;
          initialValues[field.id] = field.field_type === "checkbox" ? [] : "";
        });
        setForm({ ...resolved, fields });
        setFormValues(initialValues);
        setCurrentPage(0);
        // preload column options for column fields
        const columnFields = fields.filter((f) => f.field_type === "column" && f.table_source);
        if (columnFields.length) {
          const loadColumns = async () => {
            const entries = await Promise.all(
              columnFields.map(async (f) => {
                try {
                  const rows = await api
                    .get("/forms/meta/column-values", {
                      params: {
                        table: f.table_source?.source_table,
                        value_column: f.table_source?.source_value_column,
                        label_column: f.table_source?.source_label_column,
                      },
                    })
                    .then((res) => res.data.rows || res.data || []);
                  const options: FormFieldOption[] = Array.isArray(rows)
                    ? rows.map((r: any) => ({
                        value: r.value ?? r[f.table_source?.source_value_column || ""] ?? "",
                        label: r.label ?? r[f.table_source?.source_label_column || ""] ?? r.value ?? "",
                      }))
                    : [];
                  return [f.id, options] as [number, FormFieldOption[]];
                } catch {
                  return [f.id, [] as FormFieldOption[]] as [number, FormFieldOption[]];
                }
              })
            );
            const map: Record<number, FormFieldOption[]> = {};
            entries.forEach(([id, opts]: any) => {
              map[id] = opts;
            });
            setColumnOptions(map);
          };
          loadColumns();
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId, accessToken]);

  const handleChange = (fieldId: number, value: any) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const toggleCheckbox = (fieldId: number, value: string) => {
    setFormValues((prev) => {
      const current = Array.isArray(prev[fieldId]) ? prev[fieldId] : [];
      if (current.includes(value)) {
        return { ...prev, [fieldId]: current.filter((v) => v !== value) };
      }
      return { ...prev, [fieldId]: [...current, value] };
    });
  };

  const isFieldFilled = (field: FormField) => {
    if (NON_INPUT_TYPES.has(field.field_type)) return true;
    const value = formValues[field.id];
    if (field.field_type === "checkbox") return Array.isArray(value) && value.length > 0;
    return value !== undefined && value !== null && String(value).trim() !== "";
  };

  const validateSection = (index: number) => {
    const section = sections[index];
    if (!section) return true;
    const missing = section.fields.filter((f) => f.is_required && !isFieldFilled(f));
    if (missing.length) {
      toast.error("Please fill required fields before continuing");
      return false;
    }
    return true;
  };

  const validateAll = () => sections.every((_, idx) => validateSection(idx));

  const handleNextPage = () => {
    if (!validateSection(currentPage)) return;
    setCurrentPage((prev) => Math.min(sections.length - 1, prev + 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateAll()) {
      return;
    }
    setSubmitting(true);

    try {
      const answers = (form?.fields || [])
        .filter((field) => !NON_INPUT_TYPES.has(field.field_type))
        .map((field) => ({
          field_id: field.id,
          value: formValues[field.id],
        }));
      await api.post(`/forms/${formId}/submit`, { answers });
      setSuccess(true);
      setTimeout(() => {
        router.push("/forms");
      }, 1500);
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to submit form";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading form...</p>
        </CardContent>
      </Card>
    );
  }

  if (error && !form) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!form) return null;

  if (success) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold">Form submitted</h3>
            <p className="text-muted-foreground">Thanks! Redirecting to forms.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const activeSection = sections[Math.min(currentPage, Math.max(0, sections.length - 1))] || { fields: [] };
  const totalPages = Math.max(1, sections.length || 1);

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">{form.name}</CardTitle>
        <CardDescription>{form.description || "Fill out the questions below."}</CardDescription>
        <p className="text-xs text-muted-foreground">
          Questions: {questionCount}
          {totalPages > 1 ? ` · Page ${currentPage + 1}/${totalPages}` : ""}
        </p>
        {activeSection.description && <p className="text-xs text-muted-foreground">{activeSection.description}</p>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}

          {(activeSection.fields || []).map((field) => (
            <div key={field.id} className="space-y-2 rounded-xl border p-4">
              <div className="flex items-start justify-between gap-3">
                <label htmlFor={field.field_key} className="text-sm font-medium">
                  {field.label}
                  {field.is_required && <span className="text-destructive ml-1">*</span>}
                </label>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{field.field_type}</span>
              </div>

              {["text", "textarea", "number"].includes(field.field_type) && (
                <>
                  {field.field_type === "textarea" ? (
                    <textarea id={field.field_key} className="w-full rounded-md border px-3 py-2 text-sm" rows={field.settings?.rows || 4} value={formValues[field.id] ?? ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.is_required} disabled={submitting} />
                  ) : (
                    <Input
                      id={field.field_key}
                      type={field.field_type === "number" ? "number" : "text"}
                      value={formValues[field.id] ?? ""}
                      onChange={(e) => handleChange(field.id, field.field_type === "number" ? Number(e.target.value) : e.target.value)}
                      required={field.is_required}
                      disabled={submitting}
                    />
                  )}
                </>
              )}

              {field.field_type === "markdown" && (
                <div
                  className="prose prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: (field.settings?.content || field.label || "").replace(/\n/g, "<br />") }}
                />
              )}

              {field.field_type === "select" &&
                ((field.options || []).length > 0 ? (
                  <select id={field.field_key} className="w-full rounded-md border px-3 py-2 text-sm" value={formValues[field.id] ?? ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.is_required} disabled={submitting}>
                    <option value="">Select an option</option>
                    {(field.options || []).map((option) => (
                      <option key={option.id || option.value} value={option.value}>
                        {option.label || option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input id={field.field_key} value={formValues[field.id] ?? ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.is_required} disabled={submitting} placeholder="Enter a value" />
                ))}

              {field.field_type === "column" && (
                <select id={field.field_key} className="w-full rounded-md border px-3 py-2 text-sm" value={formValues[field.id] ?? ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.is_required} disabled={submitting || !columnOptions[field.id]}>
                  <option value="">Select a value</option>
                  {(columnOptions[field.id] || []).map((option, idx) => (
                    <option key={`${option.value}-${idx}`} value={option.value}>
                      {option.label || option.value}
                    </option>
                  ))}
                </select>
              )}

              {["radio", "score"].includes(field.field_type) && (
                <div className="space-y-2">
                  {(field.options || []).map((option) => (
                    <label key={option.id || option.value} className="flex items-center gap-2 text-sm">
                      <input type="radio" name={field.field_key} value={option.value} checked={formValues[field.id] === option.value} onChange={(e) => handleChange(field.id, e.target.value)} required={field.is_required} disabled={submitting} />
                      <span>{option.label || option.value}</span>
                      {typeof option.score === "number" && <span className="text-xs text-muted-foreground">(score {option.score})</span>}
                    </label>
                  ))}
                </div>
              )}

              {field.field_type === "checkbox" && (
                <div className="space-y-2">
                  {(field.options || []).map((option) => {
                    const current = Array.isArray(formValues[field.id]) ? formValues[field.id] : [];
                    return (
                      <label key={option.id || option.value} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" value={option.value} checked={current.includes(option.value)} onChange={() => toggleCheckbox(field.id, option.value)} disabled={submitting} />
                        <span>{option.label || option.value}</span>
                        {typeof option.score === "number" && <span className="text-xs text-muted-foreground">(score {option.score})</span>}
                      </label>
                    );
                  })}
                </div>
              )}

              {field.settings?.description && <p className="text-xs text-muted-foreground">{field.settings.description}</p>}
            </div>
          ))}

          <div className="flex items-center justify-between gap-2">
            {totalPages > 1 && (
              <div className="text-xs text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </div>
            )}
            <div className="flex-1 flex items-center justify-end gap-2">
              {totalPages > 1 && (
                <>
                  <Button type="button" variant="outline" disabled={currentPage === 0 || submitting} onClick={handlePrevPage}>
                    Previous
                  </Button>
                  {currentPage < totalPages - 1 ? (
                    <Button type="button" disabled={submitting} onClick={handleNextPage}>
                      Next
                    </Button>
                  ) : null}
                </>
              )}
              {currentPage === totalPages - 1 && (
                <Button type="submit" className="min-w-[140px]" disabled={submitting || questionCount === 0}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              )}
              {totalPages === 1 && (
                <Button type="submit" className="min-w-[140px]" disabled={submitting || questionCount === 0}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
