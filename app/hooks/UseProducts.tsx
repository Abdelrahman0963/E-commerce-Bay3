"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/ProductsApi";
import useSWR from "swr";
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