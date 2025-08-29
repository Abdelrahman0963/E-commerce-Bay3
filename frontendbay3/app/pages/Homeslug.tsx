"use client";
import React from "react";
import { useProductBySlug } from "../hooks/UseProducts";

export default function Homeslug({ slug }: { slug: string }) {
  const { product, isLoading, isError } = useProductBySlug(slug);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found</div>;

  const { title, description, price, company, location } = product;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Company: {company}</p>
      <p>Location: {location}</p>
      <p>Price: {price} EGP</p>
    </div>
  );
}
