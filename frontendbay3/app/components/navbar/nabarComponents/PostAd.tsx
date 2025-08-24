import { useTranslations } from "next-intl";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";

const PostAd = () => {
  const t = useTranslations();
  return (
    <button className="bg-[var(--primary-color)] md:relative  text-white w-auto !px-4 !py-2 md:w-12 md:h-12 md:flex items-center justify-center !text-sm rounded-lg md:rounded-full hover:bg-[#c33a3b] cursor-pointer transition-colors ">
      <span className="text-white font-bold  md:hidden">
        {t("navbar.postbtn")}
      </span>
      <HiOutlinePlus
        size={30}
        className="hidden md:block  md:absolute z-20 w-12"
      />
    </button>
  );
};

export default PostAd;
