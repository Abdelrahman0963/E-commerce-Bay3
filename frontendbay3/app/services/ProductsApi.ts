export async function fetchProducts(slug?: string) {
  const baseUrl = `http://localhost:1337/api/products`;
  const url = slug
    ? `${baseUrl}?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
    : `${baseUrl}?populate=*`;

  console.log("Fetching from:", url);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}
