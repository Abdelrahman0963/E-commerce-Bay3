"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useProducts } from "@/app/hooks/UseProducts";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

const SearchNav = () => {
  const [dirction, setDirction] = useState<string>("ltr");
  const { products: data, isLoading } = useProducts();
  const [search, setSearch] = useState("");

  const products = data?.data || [];
  const title = products.map((p: any) => p.title).filter(Boolean);
  const uniqueTitle = Array.from(new Set(title));

  const filteredTitles = uniqueTitle.filter((item: any) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setDirction(document.documentElement.dir);
  }, []);

  const t = useTranslations();

  return (
    <div className="SearchNav  relative  w-64 md:w-3xl  h-10">
      <search className="h-10 items-center justify-between rounded-lg relative">
        <input
          onChange={(e) => setSearch(e.target.value)} // تحديث حالة البحث
          type="text"
          placeholder={t("navbar.searchbar")}
          className="h-full w-full bg-white rounded-lg px-2 text-black focus:outline-[var(--primary-color)]  border border-gray-300"
        />
        <div className="searchicon flex items-center justify-center h-full">
          <MdOutlineSearch
            className={`text-2xl text-[var(--primary-color)] absolute top-2 ${
              dirction === "ltr" ? "right-2" : "left-2"
            }`}
          />
        </div>
      </search>
      {search.trim() !== "" && (
        <div className="SearchList absolute top-16 left-0 w-full bg-white shadow-lg !p-4 rounded-lg z-50 transition-all duration-300">
          <ul>
            {isLoading ? (
              <li className="text-center">Loading...</li>
            ) : (
              filteredTitles.map((item: any, index: number) => (
                <Link
                  key={index}
                  className="hover:text-[var(--primary-color)] capitalize"
                  href={`/product/${item}`}
                >
                  <li className="!py-2 hover:bg-gray-100 px-2">{item}</li>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchNav;
