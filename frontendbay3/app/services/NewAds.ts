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

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
}

export async function postNewAds(newAd: any) {

  const adPayload = {
    title: newAd.title,  
    description: newAd.description,
    location: newAd.location,
    phone: newAd.phone,
    price: newAd.price,
    images: Array.isArray(newAd.images) ? await uploadImages(newAd.images) : [],
    category: newAd.category,
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
    throw new Error(responseData?.error?.message || "Unknown error");
  }

  return responseData;
}
