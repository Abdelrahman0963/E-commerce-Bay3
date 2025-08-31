import { useTranslations } from "next-intl";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";

const PostAd = () => {
  const t = useTranslations();
  return (
    <button className="bg-[var(--primary-color)] md:relative  text-white !py-2 !px-4 h-12 md:flex items-center justify-center !text-sm rounded-lg  hover:bg-[#c33a3b] cursor-pointer">
      <span className="text-white whitespace-nowrap w-full font-bold md:block  hidden">
        {t("navbar.postbtn")}
      </span>
      <HiOutlinePlus
        size={30}
        className="md:hidden block  md:absolute z-20 w-12"
      />
    </button>
  );
};

export default PostAd;
