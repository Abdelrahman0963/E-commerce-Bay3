import { create } from "zustand";

export type AdStatus = "all" | "new" | "pending" | "rejected" | "active";

export type Ad = {
  id: string;
  title: string;
  description?: string;
  price?: number;
  category?: string;
  location?: string;
  phone?: string;
  status: AdStatus;
  user?: { id?: number | string; username?: string };
  createdAt: string;
};

type AdsState = {
  ads: Ad[];
  addAd: (ad: Omit<Ad, "id" | "createdAt">) => void;
  updateAdStatus: (id: string, status: AdStatus) => void;
  clearAds: () => void;
};

export const useAdsStore = create<AdsState>((set, get) => ({
  ads: [],
  addAd: (ad) => {
    const newAd: Ad = {
      ...ad,
      id: String(Date.now()) + "-" + Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ ads: [newAd, ...s.ads] }));
  },
  updateAdStatus: (id, status) =>
    set((s) => ({ ads: s.ads.map(a => (a.id === id ? { ...a, status } : a)) })),
  clearAds: () => set({ ads: [] }),
}));