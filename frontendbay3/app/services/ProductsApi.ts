export async function fetchProducts(slug?: string, category?: string) {
  const baseUrl = `http://localhost:1337/api/products`;

  let filters: string[] = [];

  if (slug) {
    filters.push(`filters[slug][$eq]=${encodeURIComponent(slug)}`);
  }

  if (category) {
    filters.push(`filters[category][$eq]=${encodeURIComponent(category)}`);
  }

  const query =
    filters.length > 0 ? `?${filters.join("&")}&populate=*` : `?populate=*`;

  const url = `${baseUrl}${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}
