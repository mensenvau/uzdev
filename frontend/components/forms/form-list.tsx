"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import api from "@/lib/api";

interface Form {
  _id: string;
  name: string;
  description: string;
  schema: any;
  createdAt: string;
}

export function FormList() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.get("/forms");
        const payload = response.data;
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
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form: any) => (
              <tr key={form._id || form.id} className="border-t">
                <td className="px-4 py-3 font-medium">{form.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{form.description || "No description"}</td>
                <td className="px-4 py-3">
                  <Link href={`/forms/${form._id || form.id}`}>
                    <Button size="sm" variant="secondary" className="w-full">
                      Open
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            {forms.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                  No forms available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
