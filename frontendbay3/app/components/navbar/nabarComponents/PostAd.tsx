import { useTranslations } from "next-intl";
import React from "react";

const PostAd = () => {
  const t = useTranslations();
  return (
    <button className="bg-[var(--primary-color)] text-white w-auto !px-4 !py-2 !text-sm rounded-lg hover:bg-[#c33a3b] transition-colors ">
      <span className="text-white font-bold">{t("navbar.postbtn")}</span>
    </button>
  );
};

export default PostAd;
