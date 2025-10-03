"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

type Product = {
  title: string;
  slug: string;
};

const SearchNav = () => {
  const [dirction, setDirction] = useState<"ltr" | "rtl">("ltr");
  const { products: data, isLoading } = useProducts();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const products: Product[] = data?.data || [];

  const filteredProducts = products.filter(
    (p) =>
      p.title &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );

  const focasInput = () => {
    setIsOpen(true);
    searchRef.current?.focus();
  };

  useEffect(() => {
    setDirction(document.documentElement.dir as "ltr" | "rtl");
  }, []);

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

  const t = useTranslations();

  return (
    <div
      ref={containerRef}
      className="SearchNav flex items-center justify-center w-96 md:w-3xl h-10 relative"
    >
      <div className="md:h-10 h-12 md:w-96 w-80 !py-2 flex items-center justify-between rounded-lg relative">
        <input
          ref={searchRef}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          type="text"
          placeholder={t("navbar.searchbar")}
          className="h-full w-full bg-white rounded-lg !px-2 text-black focus:outline-[var(--primary-color)] border border-gray-300"
        />
        <div className="searchicon flex items-center justify-center h-full">
          <MdOutlineSearch
            onClick={focasInput}
            className={`text-2xl text-[var(--primary-color)] cursor-pointer absolute top-3 md:top-2 ${dirction === "ltr" ? "right-2" : "left-2"
              }`}
          />
        </div>
      </div>

      {isOpen && search.trim() !== "" && (
        <div className="SearchList absolute top-16 left-0 w-full bg-white shadow-lg !p-4 rounded-lg z-50 transition-all duration-300">
          <ul>
            {isLoading ? (
              <li className="text-center">Loading...</li>
            ) : (
              filteredProducts.map((item, index) => (
                <li
                  key={index}
                  className="!py-2 hover:bg-gray-100 px-2"
                  onClick={() => setIsOpen(false)} // يقفل لما تختار
                >
                  <Link
                    className="hover:text-[var(--primary-color)] capitalize"
                    href={`/product/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchNav;
