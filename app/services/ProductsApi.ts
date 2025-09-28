const baseUrl = `http://localhost:1337/api/products`;

export async function fetchProducts(slug?: string, category?: string) {

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

type Product = {
  id: string;
  documentId: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
  location?: string;
  phone?: string;
  images?: [];
  slug: string;
  user?: {
    id?: number;
    username: string;
    email: string;
  };
}
export async function postProducts(product: Product, token?: string) {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ data: product }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Error details:", responseData);
    throw new Error(responseData?.error?.message || "Unknown error");
  }

  return responseData;
}