"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
}

interface Form {
  _id: string;
  name: string;
  description: string;
  schema: {
    fields: FormField[];
  };
}

interface FormDetailProps {
  formId: string;
}

export function FormDetail({ formId }: FormDetailProps) {
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await api.get(`/forms/${formId}`);
        setForm(response.data);

        const initialData: Record<string, any> = {};
        response.data.schema.fields.forEach((field: FormField) => {
          initialData[field.name] = "";
        });
        setFormData(initialData);
      } catch (err: any) {
        setError("Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [formId]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post(`/forms/${formId}/submit`, { data: formData });
      setSuccess(true);
      setTimeout(() => {
        router.push("/forms");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit form");
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
          <div className="text-center space-y-4">
            <div className="text-4xl">✓</div>
            <h3 className="text-xl font-semibold">Form Submitted Successfully</h3>
            <p className="text-muted-foreground">Redirecting...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{form.name}</CardTitle>
        <CardDescription>{form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>}

          {form.schema.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </label>
              <Input id={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name] || ""} onChange={(e) => handleChange(field.name, e.target.value)} required={field.required} disabled={submitting} />
            </div>
          ))}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
