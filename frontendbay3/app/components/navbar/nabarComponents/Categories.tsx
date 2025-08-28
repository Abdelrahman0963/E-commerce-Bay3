"use client";
import { useTranslations } from "next-intl";
import React from "react";
import CategoriesList from "./CategoriesList";
import { IoIosArrowDown } from "react-icons/io";

const Categories = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations();

  return (
    <div className="Categories flex flex-col items-center justify-center relative md:w-64 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="items-center justify-center bg-white text-black py-2 px-4 rounded-lg  cursor-pointer"
      >
        <span className="text-black flex items-center gap-1">
          {t("navbar.navdrop")} <IoIosArrowDown />
        </span>
      </button>
      {isOpen && (
        <div onMouseLeave={() => setIsOpen(false)} className="navcategories">
          <CategoriesList />
        </div>
      )}
    </div>
  );
};

export default Categories;
