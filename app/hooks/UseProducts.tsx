'use client';
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchProducts, postProducts } from "../services/ProductsApi";
import useSWR from "swr";
import toast from "react-hot-toast";

export const useProducts = (slug?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchProducts(slug),
  });

  return { products: data, isLoading, isError, error };
};

export function useProductBySlug(slug: string) {
  const { data, error, isLoading } = useSWR(
    slug ? `product-${slug}` : null,
    () => fetchProducts(slug)
  );

  return {
    product: data?.data?.[0],
    isLoading,
    isError: !!error,
  };
}

export function useCategoriesSlug(category?: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["categories", category],
    queryFn: () => fetchProducts(undefined, category),
    enabled: !!category,
  });

  return {
    categories: data?.data || [],
    isLoading,
    isError: !!error,
  };
}

// hook لإضافة منتج
export function usePostProduct() {
  return useMutation({
    mutationFn: (newProduct: any) => postProducts(newProduct),
    onSuccess: () => {
      toast.success("🎉 تم عرض المنتج بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.message || "❌ فشل الإرسال. تأكد من البيانات وحاول مرة أخرى.");
      console.log("Error details:", error);
    },
  });
}
