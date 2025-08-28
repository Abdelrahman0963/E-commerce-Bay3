export const CATEGORIES_API_URL_EN =
  "http://localhost:1337/api/products?populate=*&locale=en";
export const CATEGORIES_API_URL_AR =
  "http://localhost:1337/api/products?populate=*&locale=ar";

export async function fetchProducts(slug?: string) {
  const baseUrl =
    document.documentElement.lang === "ar"
      ? CATEGORIES_API_URL_AR
      : CATEGORIES_API_URL_EN;

  const url = slug ? `${baseUrl}&filters[slug][$eq]=${slug}` : baseUrl;

  const res = await fetch(url);
  return res.json();
}
