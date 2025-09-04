"use client";
import React, { useEffect } from "react";
import { useProductBySlug } from "../hooks/UseProducts";
import Carousel from "../components/Carousel";
import Notfound from "../components/Notfound";
import { ProductSkeleton } from "../components/Loading";

export default function Homeslug({ slug }: { slug: string }) {
  const { product, isLoading, isError } = useProductBySlug(slug);


  if (isLoading) return <ProductSkeleton />;
  if (isError || !product) return <Notfound />;

  const { title, description, price, company, location, images } = product;

  return (
    <section className="container !mx-auto !py-26 md:!py-30 md:!px-6 !px-4 flex flex-col md:flex-row gap-4 items-center">
      <Carousel images={images} />
      <div className="info max-w-md">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600">{description}</p>
        <p className="mt-2 font-semibold">{price}</p>
        <p>{company}</p>
        <p>{location}</p>
      </div>
    </section>
  );
}
