"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, ListChecks, RefreshCw, SlidersHorizontal, SortAsc, SortDesc } from "lucide-react";
import { FormField, FormStructure } from "@/lib/forms-api";

interface DataTabProps {
  formId: string;
  form: FormStructure | null;
  responses: any[];
  loading_responses: boolean;
  on_refresh: () => void;
  on_export_csv: () => void;
  error?: string | null;
}

type SortDir = "asc" | "desc";

const BASE_COLUMNS = [
  { key: "created_at", label: "Submitted" },
  { key: "respondent_email", label: "Email" },
];

export function DataTab({ formId, form, responses, loading_responses, on_refresh, on_export_csv, error }: DataTabProps) {
  const responseFieldMeta = useMemo(() => {
    const map: Record<string, { label: string; field_id: string; field_type?: string }> = {};
    responses.forEach((resp) => {
      resp.answers?.forEach((ans: any) => {
        if (!map[ans.field_id]) {
          map[ans.field_id] = { label: ans.label || ans.field_id, field_id: ans.field_id, field_type: ans.field_type };
        }
      });
    });
    return map;
  }, [responses]);

  const fieldMap = useMemo(() => {
    const map: Record<string, FormField> = { ...responseFieldMeta } as any;
    form?.fields?.forEach((f) => {
      map[f.field_id] = { ...map[f.field_id], ...f };
    });
    return map;
  }, [form, responseFieldMeta]);

  const validFieldIds = useMemo(() => {
    const ids: string[] = [];
    form?.fields?.forEach((f) => {
      if (!ids.includes(f.field_id)) ids.push(f.field_id);
    });
    Object.keys(responseFieldMeta).forEach((id) => {
      if (!ids.includes(id)) ids.push(id);
    });
    return ids;
  }, [form, responseFieldMeta]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [filterColumns, setFilterColumns] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [fieldFilters, setFieldFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [hideEmptyColumns] = useState(false);

  const prefsKey = useMemo(() => `form_responses_prefs_${formId}`, [formId]);

  // Load saved prefs
  useEffect(() => {
    if (!formId || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(prefsKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const savedVisible = parsed.visibleColumns || [];
        setVisibleColumns(savedVisible);
        setFilterColumns(parsed.filterColumns || savedVisible);
        setFieldFilters(parsed.fieldFilters || {});
        setSortBy(parsed.sortBy || "created_at");
        setSortDir(parsed.sortDir === "asc" ? "asc" : "desc");
        return;
      }
    } catch (e) {
      // ignore malformed prefs
    }

    if (form?.fields?.length) {
      const allIds = form.fields.map((f) => f.field_id);
      setVisibleColumns(allIds);
      setFilterColumns(allIds);
    }
  }, [formId, prefsKey, form]);

  // Clean up selections when form changes or stale ids exist
  useEffect(() => {
    if (!validFieldIds.length) return;
    setVisibleColumns((prev) => {
      const cleaned = prev.filter((id) => validFieldIds.includes(id));
      return cleaned.length ? cleaned : validFieldIds;
    });
    setFilterColumns((prev) => {
      const cleaned = prev.filter((id) => validFieldIds.includes(id));
      return cleaned.length ? cleaned : validFieldIds;
    });
    setSortBy((prev) => {
      if (prev === "created_at" || prev === "respondent_email" || prev === "response_id") return prev;
      return validFieldIds.includes(prev) ? prev : "created_at";
    });
  }, [validFieldIds]);

  // Persist prefs automatically
  useEffect(() => {
    if (!formId || typeof window === "undefined") return;
    const payload = { visibleColumns, filterColumns, fieldFilters, sortBy, sortDir };
    localStorage.setItem(prefsKey, JSON.stringify(payload));
  }, [formId, prefsKey, visibleColumns, filterColumns, fieldFilters, sortBy, sortDir]);

  const normalize = (val: string | undefined | null) => (val ? val.toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "") : "");

  const getAnswer = (resp: any, fieldId: string) => {
    if (!resp?.answers) return undefined;
    const byId = resp.answers.find((a: any) => String(a.field_id) === String(fieldId));
    if (byId) return byId;

    const targetLabel = fieldMap[fieldId]?.label || fieldId;
    const normTarget = normalize(targetLabel);

    // Try label match
    const byLabel = resp.answers.find((a: any) => normalize(a.label) === normTarget);
    if (byLabel) return byLabel;

    // Fallback: match by normalized value of field_id against normalized label
    const byIdNorm = resp.answers.find((a: any) => normalize(a.field_id) === normTarget);
    if (byIdNorm) return byIdNorm;

    return undefined;
  };

  const getAnswerText = (resp: any, fieldId: string) => {
    const ans = getAnswer(resp, fieldId);
    if (!ans) return "";
    if (Array.isArray(ans.value)) return ans.value.join(", ");
    if (ans.value !== undefined && ans.value !== null) return ans.value;
    if (ans.textAnswers?.answers?.length) return ans.textAnswers.answers.map((a: any) => a.value).join(", ");
    return "";
  };

  const handleColumnToggle = (fieldId: string, checked: boolean) => {
    setVisibleColumns((prev) => (checked ? [...prev, fieldId] : prev.filter((id) => id !== fieldId)));
  };

  const handleSelectAll = () => {
    const all = validFieldIds;
    setVisibleColumns(all);
  };

  const handleSelectNone = () => {
    setVisibleColumns([]);
  };

  const handleFilterColumnToggle = (fieldId: string, checked: boolean) => {
    setFilterColumns((prev) => (checked ? [...prev, fieldId] : prev.filter((id) => id !== fieldId)));
  };

  const handleFilterSelectAll = () => {
    setFilterColumns(visibleColumns);
  };

  const handleFilterSelectNone = () => {
    setFilterColumns([]);
  };

  const handleRefreshClick = () => {
    on_refresh();
  };

  const filteredAndSorted = useMemo(() => {
    const searchValue = search.toLowerCase();
    const rows = responses.filter((resp) => {
      if (searchValue) {
        const haystack = [resp.response_id, resp.respondent_email || "", resp.created_at, ...visibleColumns.map((id) => getAnswerText(resp, id))].join(" ").toLowerCase();
        if (!haystack.includes(searchValue)) return false;
      }

      for (const [fieldId, filterValue] of Object.entries(fieldFilters)) {
        if (!filterValue) continue;
        const ans = getAnswer(resp, fieldId);
        const field = fieldMap[fieldId];
        const valueText = Array.isArray(ans?.value) ? ans?.value.join(",") : ans?.value ?? "";
        const normalizedFilter = filterValue.toLowerCase();
        const fieldType = field?.field_type;

        if (!fieldType || !valueText) return false;

        if (fieldType === "radio" || fieldType === "select") {
          if (valueText.toLowerCase() !== normalizedFilter) return false;
        } else if (fieldType === "checkbox") {
          const parts = valueText
            .toLowerCase()
            .split(",")
            .map((p: any) => p.trim());
          if (!parts.includes(normalizedFilter)) return false;
        } else {
          if (!valueText.toLowerCase().includes(normalizedFilter)) return false;
        }
      }

      return true;
    });

    const sorters = [{ key: sortBy, dir: sortDir }];

    const sorted = [...rows].sort((a, b) => {
      for (const sorter of sorters) {
        const dir = sorter.dir === "asc" ? 1 : -1;
        if (sorter.key === "created_at") {
          const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          if (diff !== 0) return diff * dir;
          continue;
        }
        if (sorter.key === "respondent_email") {
          const diff = (a.respondent_email || "").localeCompare(b.respondent_email || "");
          if (diff !== 0) return diff * dir;
          continue;
        }
        if (sorter.key === "response_id") {
          const diff = (a.response_id || "").localeCompare(b.response_id || "");
          if (diff !== 0) return diff * dir;
          continue;
        }

        const aText = getAnswerText(a, sorter.key).toLowerCase();
        const bText = getAnswerText(b, sorter.key).toLowerCase();
        const diff = aText.localeCompare(bText);
        if (diff !== 0) return diff * dir;
      }
      return 0;
    });

    return sorted;
  }, [responses, search, visibleColumns, fieldFilters, sortBy, sortDir, fieldMap]);

  const columnsWithData = useMemo(() => {
    return visibleColumns;
  }, [visibleColumns]);

  const sortOptions = useMemo(() => {
    const fields = (form?.fields || []).filter((f) => visibleColumns.includes(f.field_id)).map((f) => ({ key: f.field_id, label: f.label || f.field_id }));
    return [{ key: "created_at", label: "Submitted" }, { key: "respondent_email", label: "Email" }, ...fields, { key: "response_id", label: "Response ID" }];
  }, [visibleColumns, form]);

  return (
    <Card className="border bg-white/80 backdrop-blur">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 items-center">
          <Input placeholder="Search across responses..." className="md:w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <ListChecks className="h-4 w-4 mr-2" />
                Table columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-72 overflow-y-auto">
              <DropdownMenuLabel>Select table columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={visibleColumns.length === validFieldIds.length && visibleColumns.length > 0} onCheckedChange={(checked) => (checked ? handleSelectAll() : handleSelectNone())} onSelect={(e) => e.preventDefault()}>
                Select all
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={visibleColumns.length === 0} onCheckedChange={handleSelectNone} onSelect={(e) => e.preventDefault()}>
                Hide all
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {validFieldIds.map((fieldId) => {
                const field = fieldMap[fieldId];
                return (
                  <DropdownMenuCheckboxItem key={fieldId} checked={visibleColumns.includes(fieldId)} onCheckedChange={(checked) => handleColumnToggle(fieldId, Boolean(checked))} onSelect={(e) => e.preventDefault()}>
                    {field?.label || fieldId}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filterable columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 max-h-72 overflow-y-auto">
              <DropdownMenuLabel>Select filterable columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={filterColumns.length === visibleColumns.length && filterColumns.length > 0} onCheckedChange={(checked) => (checked ? handleFilterSelectAll() : handleFilterSelectNone())} onSelect={(e) => e.preventDefault()}>
                Select all
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={filterColumns.length === 0} onCheckedChange={handleFilterSelectNone} onSelect={(e) => e.preventDefault()}>
                Hide all
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              {visibleColumns.map((fieldId) => {
                const field = fieldMap[fieldId];
                if (!field) return null;
                return (
                  <DropdownMenuCheckboxItem key={`filter-${fieldId}`} checked={filterColumns.includes(fieldId)} onCheckedChange={(checked) => handleFilterColumnToggle(fieldId, Boolean(checked))} onSelect={(e) => e.preventDefault()}>
                    {field.label}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                {sortOptions.find((o) => o.key === sortBy)?.label || "Sort"}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 max-h-72 overflow-y-auto">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((opt) => (
                <DropdownMenuCheckboxItem key={opt.key} checked={sortBy === opt.key} onCheckedChange={() => setSortBy(opt.key)} onSelect={(e) => e.preventDefault()}>
                  {opt.label}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={sortDir === "asc"} onCheckedChange={() => setSortDir("asc")} onSelect={(e) => e.preventDefault()}>
                Ascending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={sortDir === "desc"} onCheckedChange={() => setSortDir("desc")} onSelect={(e) => e.preventDefault()}>
                Descending
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" onClick={handleRefreshClick} disabled={loading_responses} className="ml-auto">
            <RefreshCw className={`h-4 w-4 ${loading_responses ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="sm" onClick={on_export_csv} disabled={responses.length === 0}>
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="rounded-md border p-3 bg-muted/30 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filters</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setFieldFilters({})}>
              Clear filters
            </Button>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filterColumns.map((fieldId) => {
              const field = fieldMap[fieldId];
              if (!field) return null;

              const filterValue = fieldFilters[fieldId] || "";
              const selectValue = filterValue === "" ? "any" : filterValue;
              const hasOptions = field.field_type === "radio" || field.field_type === "select" || field.field_type === "checkbox";

              return (
                <div key={fieldId} className="space-y-1">
                  <p className="text-sm font-medium">{field.label}</p>
                  {hasOptions && field.options && field.options.length > 0 ? (
                    <Select value={selectValue} onValueChange={(val) => setFieldFilters((prev) => ({ ...prev, [fieldId]: val === "any" ? "" : val }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any option</SelectItem>
                        {field.options.map((opt) => (
                          <SelectItem key={opt.option_id} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input placeholder="Search value..." value={filterValue} onChange={(e) => setFieldFilters((prev) => ({ ...prev, [fieldId]: e.target.value }))} />
                  )}
                </div>
              );
            })}
          </div>
          {filterColumns.length === 0 && <p className="text-xs text-muted-foreground">No filter columns selected. Use "Filter columns" to pick.</p>}
        </div>

        {loading_responses ? (
          <p className="text-muted-foreground text-sm">Loading responses...</p>
        ) : filteredAndSorted.length === 0 ? (
          <p className="text-muted-foreground text-sm">No responses match the current filters.</p>
        ) : (
          <div className="rounded-lg border bg-white overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  {BASE_COLUMNS.map((col) => (
                    <th key={col.key} className="px-4 py-3 whitespace-nowrap align-top">
                      {col.label}
                    </th>
                  ))}
                  {columnsWithData.map((fieldId) => {
                    const field = fieldMap[fieldId];
                    return (
                      <th key={fieldId} className="px-4 py-3 min-w-[180px] whitespace-normal break-words align-top text-muted-foreground">
                        {field?.label || fieldId}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.map((resp) => (
                  <tr key={resp.response_id} className="border-t">
                    <td className="px-4 py-3">{resp.created_at ? new Date(resp.created_at).toLocaleString() : "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{resp.respondent_email || "Anonymous"}</td>
                    {columnsWithData.map((fieldId) => (
                      <td key={`${resp.response_id}-${fieldId}`} className="px-4 py-3 text-sm text-muted-foreground whitespace-normal break-words align-top">
                        {getAnswerText(resp, fieldId) || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
