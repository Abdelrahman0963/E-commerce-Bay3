"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/ProductsApi";

export const useProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { data, isLoading };
};
