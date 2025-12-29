"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FormDetail } from "@/components/forms/form-detail";

function PublicFormContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;
  const token = searchParams.get("token");

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Missing form id</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <FormDetail formId={id} accessToken={token} />
      </div>
    </div>
  );
}

export default function PublicFormPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Loading form...</p>
        </div>
      }
    >
      <PublicFormContent />
    </Suspense>
  );
}
