"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormViewer } from "@/components/forms/form-viewer";
import { getPublicFormStructure, submitPublicForm, getCredentials, type FormStructure } from "@/lib/forms-api";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PublicFormPage() {
  const params = useParams();
  const form_id = params.id as string;

  const [form, setForm] = useState<FormStructure | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        setError(null);

        const credentials = getCredentials();

        if (!credentials) {
          setError("Form configuration error. Please contact the form owner.");
          return;
        }

        const response = await getPublicFormStructure(form_id, credentials);
        setForm(response.form);
      } catch (err: any) {
        console.error("Failed to fetch form:", err);
        setError(err.response?.data?.message || "Failed to load form. Please try again.");
        toast.error("Failed to load form");
      } finally {
        setLoading(false);
      }
    };

    if (form_id) {
      fetchForm();
    }
  }, [form_id]);

  const handleSubmit = async (answers: any[]) => {
    try {
      setSubmitting(true);

      const credentials = getCredentials();

      if (!credentials) {
        toast.error("Form configuration error");
        return;
      }

      await submitPublicForm(form_id, credentials, answers);
      setSubmitted(true);
      toast.success("Form submitted successfully!");
    } catch (err: any) {
      console.error("Failed to submit form:", err);
      toast.error(err.response?.data?.message || "Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Form Submitted Successfully!</CardTitle>
            <CardDescription>
              Thank you for completing this form. Your response has been recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false);
                window.location.reload();
              }}
            >
              Submit Another Response
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="container mx-auto max-w-4xl space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!error && form && (
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {form.title}
              </h1>
              {form.description && (
                <p className="text-muted-foreground text-lg">
                  {form.description}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                * Required fields
              </p>
            </div>

            <FormViewer
              form={form}
              loading={loading}
              error={error}
              showSubmit={true}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        {loading && !error && (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-muted-foreground">
              Loading form...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
