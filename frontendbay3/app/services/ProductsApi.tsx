// lib/fetchProducts.ts
export async function fetchProducts(slug?: string) {
  const lang = document.documentElement.lang || "en";

  const baseUrl = `http://localhost:1337/api/products?populate=*&locale=${lang}`;
  const url = slug
    ? `${baseUrl}&filters[slug][$eq]=${encodeURIComponent(slug)}`
    : baseUrl;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}
