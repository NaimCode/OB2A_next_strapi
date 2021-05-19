export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_190829973FDE1886";
export const getImageUrlSmall = (image) => {
  const img = image[0] ?? image;
  if (!img) return;
  ("/images/placeholder.png");
  if (img.formats.small.url.indexOf("/") === 0) {
    return `${API_URL}${img.formats.small.url}`;
  }

  return img.url;
};

export const getImageUrl = (image) => {
  const img = image[0] ?? image;
  if (!img) return;
  ("/images/placeholder.png");
  if (img.url.indexOf("/") === 0) {
    return `${API_URL}${img.url}`;
  }

  return img.url;
};
