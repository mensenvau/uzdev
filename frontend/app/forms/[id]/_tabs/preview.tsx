import { FormViewer } from "@/components/forms/form-viewer";
import { FormStructure } from "@/lib/forms-api";

interface PreviewTabProps {
  form: FormStructure | null;
  loading: boolean;
  error: string | null;
}

export function PreviewTab({ form, loading, error }: PreviewTabProps) {
  if (!form) return null;

  return <FormViewer form={form} loading={loading} error={error} showSubmit={false} />;
}
