"use client";
import React from "react";

const SkeletonLoader: React.FC = () => {
  const skeletonArray = Array.from({ length: 18 });

  return (
    <div className="!py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonArray.map((_, index) => (
        <div
          key={index}
          className=" !p-4 border border-gray-200 rounded-lg shadow animate-pulse"
        >
          <div className="flex items-center justify-center h-48 !mb-4 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-[100%] h-12 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.6 90.59C231.9 80.64 242.8 74.66 254.6 74.66C266.4 74.66 277.3 80.64 283.6 90.59L400 271.5L433.1 218.4C439.3 208.6 449.9 202.9 461.4 202.7C472.9 202.6 483.7 208.2 490.3 217.8L631.4 426.4C637 435.3 640 445.6 640 456.1C640 486.1 615.1 512 584 512H56C24.94 512 0 486.1 0 456.1z" />
            </svg>
          </div>

          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48 !mb-4"></div>
          <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 !mb-2.5"></div>
          <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700 !mb-2.5"></div>
          <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-700"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
