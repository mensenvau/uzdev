import api from "./api";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Credentials (should be stored securely or fetched from backend)
// For demo purposes, this would typically come from env vars or backend
export interface GoogleCredentials {
  type?: string;
  project_id?: string;
  private_key_id?: string;
  private_key?: string;
  client_email?: string;
  client_id?: string;
  auth_uri?: string;
  token_uri?: string;
  auth_provider_x509_cert_url?: string;
  client_x509_cert_url?: string;
  access_token?: string;
  refresh_token?: string;
}

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
}

// Get credentials from environment or backend
// NOTE: Credentials are now handled by backend from .env file
// Frontend doesn't need to send credentials anymore
export const getCredentials = (): GoogleCredentials | null => {
  // Credentials are handled by backend
  // Return empty object to indicate credentials are available
  return {} as GoogleCredentials;
};

// List all Google Forms
export const listForms = async (
  credentials: GoogleCredentials,
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
  form_id: string,
  credentials: GoogleCredentials
): Promise<{ form: FormStructure }> => {
  const response = await api.post(`/forms/${form_id}`, {});
  return response.data;
};

// Get form structure (public - no auth)
export const getPublicFormStructure = async (
  form_id: string,
  credentials: GoogleCredentials
): Promise<{ form: FormStructure }> => {
  // Use axios directly without auth interceptor
  const response = await axios.post(`${BASE_URL}/forms/public/${form_id}`, {});

  // Extract data from success wrapper
  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return response.data.data;
  }

  return response.data;
};

// Submit form (public - no auth)
export const submitPublicForm = async (
  form_id: string,
  credentials: GoogleCredentials,
  answers: Array<{ field_id: string; value: any }>
): Promise<{ submitted: boolean; form_id: string }> => {
  const response = await axios.post(`${BASE_URL}/forms/public/${form_id}/submit`, {
    answers,
  });

  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return response.data.data;
  }

  return response.data;
};

// Get form responses (authenticated)
export const getFormResponses = async (
  form_id: string,
  credentials: GoogleCredentials,
  page_size: number = 100,
  page_token: string | null = null
) => {
  const response = await api.post(`/forms/${form_id}/responses`, {
    page_size,
    page_token,
  });
  return response.data;
};

// Get form responses with custom columns (authenticated)
export const getFormResponsesWithColumns = async (
  form_id: string,
  credentials: GoogleCredentials,
  visible_columns: string[] = [],
  calculate_columns: Array<{
    name: string;
    type: "sum" | "concat" | "count" | "average";
    fields: string[];
    separator?: string;
  }> = []
) => {
  const response = await api.post(`/forms/${form_id}/responses/columns`, {
    visible_columns,
    calculate_columns,
  });
  return response.data;
};
