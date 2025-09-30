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
  id?: string;
  documentId?: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
  location?: string;
  phone?: string;
  slug: string;
  url?: string;

  // مهم: لازم تيجي الصور بالـ documentId
  images?: { documentId: string }[] | string[];

  // مهم: اليوزر لازم يكون documentId
  user?: { documentId: string } | string;
};

export async function postProducts(product: Product, token?: string) {
  // جهز الـ documentIds 
  let imageDocumentIds: string[] = [];
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    imageDocumentIds = product.images.map((img: any) =>
      typeof img === "string" ? img : img.url
    );
  }

  // جهز اليوزر
  const userDocumentId =
    typeof product.user === "string" ? product.user : product.user?.documentId;

  const productPayload = {
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    location: product.location,
    images: imageDocumentIds,
    phone: product.phone,
    slug: product.slug,
    user: userDocumentId ? { connect: [userDocumentId] } : undefined,
  };

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ data: productPayload }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Error details:", responseData);
    throw new Error(responseData?.error?.message || "Unknown error");
  }

  return responseData;
}
