const fallbackApiUrl = "http://localhost:8080/api";

const configuredApiUrl = import.meta.env.VITE_API_URL || fallbackApiUrl;

export const apiBaseUrl = configuredApiUrl.replace(/\/$/, "");
export const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "");

export function getUploadUrl(fileName) {
  if (!fileName) {
    return "";
  }

  const normalizedFileName = fileName.replace(/^\/+/, "");

  if (/^https?:\/\//i.test(normalizedFileName)) {
    return normalizedFileName;
  }

  if (normalizedFileName.startsWith("uploads/")) {
    return `${apiOrigin}/${normalizedFileName}`;
  }

  return `${apiOrigin}/uploads/${normalizedFileName}`;
}