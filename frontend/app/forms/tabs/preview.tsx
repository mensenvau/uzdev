"use client";

import { FormViewer } from "@/components/forms/form-viewer";

export function PreviewTab({ form, loading, error }: { form: any; loading: boolean; error: string | null }) {
  if (!form && !loading && !error) {
    return <div className="text-sm text-muted-foreground">No form data available.</div>;
  }

  return <FormViewer form={form} loading={loading} error={error} showSubmit={false} />;
}
