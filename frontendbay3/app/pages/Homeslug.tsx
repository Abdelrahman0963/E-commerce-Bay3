"use client";
import React from "react";
import { useProductBySlug } from "../hooks/UseProducts";
import Image from "next/image";
import 'flowbite';

export default function Homeslug({ slug }: { slug: string }) {
  const { product, isLoading, isError } = useProductBySlug(slug);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !product) return <div>Product not found</div>;

  const { title, description, price, company, location, images } = product;

  return (
    <section className="  !py-10 flex items-center justify-center gap-4">
      <div className="image">
        <Image
          src={
            product.images?.[0]?.url
              ? `http://localhost:1337${product.images?.[0]?.url}`
              : "/fallback.png"
          }
          alt={product.title}
          width={400}
          height={400}
          loading="lazy"
        />
      </div>
      <div className="info">
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{price}</p>
        <p>{company}</p>
        <p>{location}</p>
      </div>
    </section>
  );
}
