


const newAdsUrl = "http://localhost:1337/api/news";

export async function fetchNewAds(slug?: string) {
  let filters: string[] = [];

  if (slug) {
    filters.push(`filters[slug][$eq]=${encodeURIComponent(slug)}`);
  }
  const query = filters.length > 0 ? `?${filters.join("&")}&populate=*` : `?populate=*`;
  const url = `${newAdsUrl}${query}`;

  const res = await fetch(url);
  let json: any = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    console.error("fetchNewAds failed:", res.status, res.statusText, json);
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = json?.data ?? json; // be flexible
  if (!Array.isArray(data)) {
    // try to handle items inside attributes (Strapi older shape)
    const maybe = Array.isArray(json) ? json : json?.data ?? [];
    if (!Array.isArray(maybe)) return [];
  }

  const items = Array.isArray(data) ? data : (json?.data ?? []);

  const formattedData = items.map((item: any) => {
    // support both item.attributes and direct fields
    const attrs = item.attributes ?? item;
    const imagesRaw = attrs.images ?? attrs.media ?? [];
    // images may be array of objects or { data: [...] }
    let imagesArr: any[] = [];
    if (Array.isArray(imagesRaw)) imagesArr = imagesRaw;
    else if (imagesRaw?.data && Array.isArray(imagesRaw.data)) imagesArr = imagesRaw.data;

    const images = imagesArr.map((img: any) => {
      const i = img.attributes ?? img;
      return { url: i.url ?? i?.formats?.thumbnail?.url ?? i?.preview_url ?? null };
    });

    const user = attrs.user ?? (item.user ? item.user : null);
    const userAttrs = user?.attributes ?? user;

    return {
      id: item.id ?? attrs.id,
      documentId: attrs.documentId ?? null,
      title: attrs.title ?? attrs.name ?? null,
      description: attrs.description ?? null,
      price: attrs.price ?? null,
      category: attrs.category ?? null,
      location: attrs.location ?? null,
      phone: attrs.phone ?? null,
      images: images.filter((x) => x.url),
      statu: attrs.statu ?? attrs.status ?? null,
      slug: attrs.slug ?? null,
      user: user ? {
        id: user.id ?? userAttrs?.id,
        username: userAttrs?.username ?? userAttrs?.name ?? null,
        email: userAttrs?.email ?? null,
      } : null,
      createdAt: attrs.createdAt ?? attrs.publishedAt ?? null,
    };
  });

  return formattedData;
}

export async function uploadImages(files: (File | Blob)[]): Promise<{ id: number }[]> {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("uploadImages failed:", errorText);
    throw new Error(`Upload failed: ${res.status} ${res.statusText}`);
  }

  return res.json(); // بيرجع [{ id, name, url }]
}

export async function postNewAds(newAd: any) {
  const url = `${newAdsUrl}?populate=user`;
  const token = newAd.token;
  const uploaded = newAd.images?.length ? await uploadImages(newAd.images) : [];
  const imageIds = uploaded.map((img: any) => img.id);
  const dataPayload: any = {
    title: newAd.title,
    description: newAd.description,
    location: newAd.location,
    phone: newAd.phone,
    price: newAd.price,
    category: newAd.category,
    user: newAd.user,
    images: imageIds,
    statu: newAd.statu || "new",
  };
  const payload = { data: dataPayload };

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  // flexible parse
  let responseBody: any = null;
  try {
    responseBody = await res.json();
  } catch (e) {
    try {
      responseBody = await res.text();
    } catch {
      responseBody = null;
    }
  }

  if (!res.ok) {
    console.error("❌ postNewAds failed:", {
      status: res.status,
      statusText: res.statusText,
      body: responseBody,
    });
    throw new Error(
      responseBody?.error?.message ||
      JSON.stringify(responseBody) ||
      `Unknown error ${res.status}`
    );
  }

  return responseBody;
}


export async function putNewAds({
  documentId,
  data,
}: {
  documentId: string;
  data: Partial<{
    title: string;
    description: string;
    location: string;
    phone: string;
    price: number;
    category: string;
    images: string[];
    statu: string;
  }>;
}) {
  const url = `${newAdsUrl}/${documentId}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  let responseData: any = null;
  try {
    responseData = await res.json();
  } catch {
    responseData = null;
  }

  if (!res.ok) {
    console.error("Error details:", res.status, responseData);
    throw new Error(
      responseData?.error?.message ||
      JSON.stringify(responseData) ||
      `Unknown error ${res.status}`
    );
  }

  return responseData;
}
