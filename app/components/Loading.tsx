"use client";
import React from "react";
import { RiImageCircleLine } from "react-icons/ri";

const SkeletonLoader: React.FC = () => {
  const skeletonArray = Array.from({ length: 18 });

  return (
    <div className="container !mx-auto !py-26 md:!py-30 md:!px-6 !px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonArray.map((_, index) => (

        <div key={index} className="border border-gray-300 !p-4 rounded-md animate-pulse">
          <div className="w-full h-48 bg-gray-200 !mb-2 rounded">
            <RiImageCircleLine className="w-full h-full text-gray-700" />
          </div>
          <div className="h-4 bg-gray-200 !mb-2 w-1/2 rounded"></div>
          <div className="h-4 bg-gray-200 !mb-2 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-200 w-full rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
export const ProductSkeleton: React.FC = () => (
  <section className="container mx-auto !py-26 md:!py-30 md:!px-6 !px-4 flex flex-col md:flex-row gap-4 items-center animate-pulse">
    <div className="w-full md:w-3xs h-64 bg-gray-200 rounded">
      <RiImageCircleLine className="w-full h-full text-gray-700" />
    </div>
    <div className="info max-w-md w-full">
      <div className="h-6 bg-gray-200 mb-4 w-3/4 rounded"></div>
      <div className="h-4 bg-gray-200 mb-2 w-full rounded"></div>
      <div className="h-4 bg-gray-200 mb-2 w-2/3 rounded"></div>
      <div className="h-4 bg-gray-200 mb-2 w-1/2 rounded"></div>
      <div className="h-4 bg-gray-200 w-1/3 rounded"></div>
    </div>
  </section>
);

export const CategoriesSkeleton: React.FC = () => {
  return (
    <div className="CategoriesList lg:absolute top-16 left-0 w-auto bg-white lg:shadow-lg !p-4 rounded-lg z-50">
      <ul>
        {[...Array(5)].map((_, index) => (
          <li key={index} className="!py-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
