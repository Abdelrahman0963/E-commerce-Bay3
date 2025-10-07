import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";

import { useAuthStore } from "@/app/store/useAuthStore";


const PostAd = () => {
  const t = useTranslations();
  const { token, hydrated } = useAuthStore();

  if (!hydrated) return null;

  return (
    <Link
      href={token ? "/adsform" : "/login"}
      className="lg:flex items-center justify-center bg-[var(--primary-color)] text-white !py-2 !px-4 md:h-12 !text-sm rounded-lg hover:bg-[#c33a3b] cursor-pointer relative"
    >
      <span className="text-white whitespace-nowrap w-full font-bold lg:block hidden">
        {t("navbar.postbtn")}
      </span>
      <HiOutlinePlus
        size={30}
        className="lg:hidden block md:absolute z-20 w-12"
      />
    </Link>
  );
};

export default PostAd;
