"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import api from "@/lib/api";

type FormRow = {
  id: number;
  name: string;
  description?: string;
  is_active?: boolean;
  field_count?: number;
};

export function FormList() {
  const [forms, setForms] = useState<FormRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const payload = await api.get("/forms").then((res) => res.data);
        const normalized = Array.isArray(payload?.forms) ? payload.forms : Array.isArray(payload) ? payload : [];
        setForms(normalized);
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to load forms";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading forms...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>;
  }

  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No forms available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-xl border bg-white/80 backdrop-blur">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Fields</th>
              <th className="px-4 py-3 w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="px-4 py-3 font-medium">{form.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{form.description || "No description"}</td>
                <td className="px-4 py-3 text-muted-foreground">{form.field_count ?? "-"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/forms/${form.id}`}>
                    <Button size="sm" variant="secondary">
                      Open
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
