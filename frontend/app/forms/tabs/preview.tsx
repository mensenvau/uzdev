"use client";

import { useSearchParams } from "next/navigation";
import { FormDetail } from "@/components/forms/form-detail";

export function PreviewTab({ formId }: { formId: string | null }) {
  const params = useSearchParams();
  const id = formId || params.get("id");
  if (!id) {
    return <p className="text-sm text-muted-foreground">Save the form first, then preview.</p>;
  }
  return (
    <div className="space-y-4">
      <FormDetail formId={id} />
    </div>
  );
}
