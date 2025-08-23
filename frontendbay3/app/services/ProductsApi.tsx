export const CATEGORIES_API_URL_EN =
  "http://localhost:1337/api/products?locale=en";
export const CATEGORIES_API_URL_AR =
  "http://localhost:1337/api/products?locale=ar";
export async function fetchProducts() {
  if (document.documentElement.lang === "ar") {
    const resAr = await fetch(CATEGORIES_API_URL_AR);
    return resAr.json();
  } else {
    const resEn = await fetch(CATEGORIES_API_URL_EN);
    return resEn.json();
  }
}
