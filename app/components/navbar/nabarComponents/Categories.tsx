"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import CategoriesList from "./CategoriesList";
import { IoIosArrowDown } from "react-icons/io";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="Categories flex flex-col items-center justify-start relative md:w-64 w-full"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="items-center justify-center bg-white text-black py-2 px-4 rounded-lg cursor-pointer"
      >
        <span className="text-black flex items-center gap-1">
          {t("navbar.navdrop")} <IoIosArrowDown />
        </span>
      </button>

      {isOpen && (
        <div className="md:absolute md:top-0 left-0 w-full bg-white md:shadow-lg rounded-lg">
          <CategoriesList />
        </div>
      )}
    </div>
  );
};

export default Categories;
