"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/ProductsApi";

export const useProducts = (slug?: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => fetchProducts(slug),
  });

  return { products: data, isLoading, isError, error };
};
