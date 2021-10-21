export const API_URL = process.env.API_URL || "https://ob2a.herokuapp.com";

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
