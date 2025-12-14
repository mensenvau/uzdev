export function formatApiError(error: any, fallback: string) {
  const apiErrors = error?.response?.data?.errors
  const details =
    apiErrors && typeof apiErrors === "object"
      ? Object.values(apiErrors)
          .flat()
          .join(" ")
      : ""
  const message = error?.response?.data?.message || fallback
  return `${message}${details ? `: ${details}` : ""}`
}

export default formatApiError
