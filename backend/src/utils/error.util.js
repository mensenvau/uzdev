export function formatApiError(error, fallback = "Unexpected error") {
  if (!error?.response?.data) return fallback;
  const { message, errors } = error.response.data;
  const details =
    errors && typeof errors === "object"
      ? Object.values(errors)
          .flat()
          .join(" ")
      : "";
  return `${message || fallback}${details ? `: ${details}` : ""}`;
}

export default {
  formatApiError,
};
