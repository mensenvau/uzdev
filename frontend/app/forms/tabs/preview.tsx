"use client";

import { FormDetail } from "@/components/forms/form-detail";

export function PreviewTab({ formId }: { formId: string | null }) {
  if (!formId) {
    return <p className="text-sm text-muted-foreground">Save the form first, then preview.</p>;
  }
  return (
    <div className="space-y-4">
      <FormDetail formId={formId} />
    </div>
  );
}
