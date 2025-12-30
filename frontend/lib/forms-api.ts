import api from "./api";

export interface FormField {
  field_id: string;
  field_order: number;
  label: string;
  description?: string;
  is_required: boolean;
  field_type: string;
  options?: Array<{
    option_id: string;
    label: string;
    value: string;
    option_order: number;
  }>;
  scale_min?: number;
  scale_max?: number;
  scale_min_label?: string;
  scale_max_label?: string;
}

export interface FormStructure {
  form_id: string;
  title: string;
  description?: string;
  document_title?: string;
  fields: FormField[];
}

export interface GoogleForm {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  owners?: Array<{
    displayName?: string;
    emailAddress?: string;
  }>;
}

export interface FormsListResponse {
  forms: GoogleForm[];
  next_page_token: string | null;
  service_account_email?: string;
}

// List all Google Forms
export const listForms = async (
  page_size: number = 10,
  page_token: string | null = null
): Promise<FormsListResponse> => {
  const response = await api.post("/forms/list", {
    page_size,
    page_token,
  });
  return response.data;
};

// Get form structure (authenticated)
export const getFormStructure = async (
  form_id: string
): Promise<{ form: FormStructure }> => {
  const response = await api.post(`/forms/${form_id}`, {});
  return response.data;
};

// Get form responses (authenticated)
export const getFormResponses = async (
  form_id: string,
  page_size: number = 100,
  page_token: string | null = null
) => {
  const payload: any = { page_size };
  if (page_token) payload.page_token = page_token;

  const response = await api.post(`/forms/${form_id}/responses`, payload);
  return response.data;
};

// Get form responses with custom columns (authenticated)
export const getFormResponsesWithColumns = async (
  form_id: string,
  visible_columns: string[] = [],
  calculate_columns: Array<{
    name: string;
    type: "sum" | "concat" | "count" | "average";
    fields: string[];
    separator?: string;
  }> = []
) => {
  const payload: any = {};
  if (visible_columns.length) payload.visible_columns = visible_columns;
  if (calculate_columns.length) payload.calculate_columns = calculate_columns;

  const response = await api.post(`/forms/${form_id}/responses/columns`, payload);
  return response.data;
};
