"use client";
import React from "react";
import { useProducts } from "../hooks/UseProducts";

interface Product {
  attributes: {
    slug: string;
    title: string;
    description: string;
  };
}

interface HomeslugProps {
  slug: string;
}

export default function Homeslug({ slug }: HomeslugProps) {
  const decodedSlug = decodeURIComponent(slug);
  const { products, isLoading, isError } = useProducts(decodedSlug);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !products?.data || products.data.length === 0)
    return <div>Product not found</div>;

  const product = products.data.find(
    (p: Product) => p.attributes.slug === decodedSlug
  )?.attributes;

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
}
