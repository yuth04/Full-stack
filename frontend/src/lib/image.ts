const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

const SERVER_URL = API_URL.replace(/\/api\/v1\/?$/, "");

export function buildImageUrl(image?: string | null): string | null {
  if (!image || !image.trim()) {
    return null;
  }

  const trimmedImage = image.trim();

  // Already a full URL
  if (/^https?:\/\//i.test(trimmedImage)) {
    return trimmedImage;
  }

  // Remove leading slashes
  const cleanImage = trimmedImage.replace(/^\/+/, "");

  // Avoid duplicating uploads/
  const imagePath = cleanImage.startsWith("uploads/")
    ? cleanImage
    : `uploads/${cleanImage}`;

  return `${SERVER_URL}/${imagePath}`;
}