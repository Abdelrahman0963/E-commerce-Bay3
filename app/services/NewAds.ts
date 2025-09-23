import { uploadImages } from "../services/mediaService";

const newAdsUrl = "http://localhost:1337/api/news";

export async function fetchNewAds(slug?: string) {
  let filters: string[] = [];

  if (slug) {
    filters.push(`filters[slug][$eq]=${encodeURIComponent(slug)}`);
  }
  const query =
    filters.length > 0 ? `?${filters.join("&")}&populate=*` : `?populate=*`;

  const url = `${newAdsUrl}${query}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();

  const formattedData = json.data.map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    category: item.category,
    location: item.location,
    phone: item.phone,
    images: item.images ? item.images.map((img: any) => ({
      url: img.url, // هيتبعت للـ Carousel
    }))
      : [],
    statu: item.statu,
    slug: item.slug,
    user: item.user
      ? {
        id: item.user.id,
        username: item.user.username,
        email: item.user.email,
      }
      : null,
    createdAt: item.createdAt,
  }));

  return formattedData;
}

export async function postNewAds(newAd: any) {
  let imageIds: number[] = [];

  if (Array.isArray(newAd.images) && newAd.images.length > 0) {
    const first = newAd.images[0];
    if (typeof first === "number") {
      imageIds = newAd.images as number[];
    } else if (first instanceof File || first instanceof Blob) {
      imageIds = await uploadImages(newAd.images as File[]);
    } else {
      imageIds = newAd.images.map((i: any) => Number(i)).filter((n: number) => !Number.isNaN(n));
    }
  }

  const adPayload = {
    title: newAd.title,
    description: newAd.description,
    location: newAd.location,
    phone: newAd.phone,
    price: newAd.price,
    category: newAd.category,
    images: imageIds,
    statu: newAd.statu || "new",
    user: newAd.user ?? undefined,
    email: newAd.email ?? undefined,

  };

  const res = await fetch(newAdsUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: adPayload }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    console.error("Error details:", responseData);
    throw new Error(responseData?.error?.message || JSON.stringify(responseData) || "Unknown error");
  }

  return responseData;
}