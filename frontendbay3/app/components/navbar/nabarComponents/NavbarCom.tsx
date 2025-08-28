"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Categories from "./Categories";
import PostAd from "./PostAd";
import Link from "next/link";
import SearchNav from "./SearchNav";
import { MdOutlineLanguage } from "react-icons/md";
import { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import LoginComponent from "./LoginComponent";

const NavbarCom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dirction, setDirction] = useState<string>("ltr");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split("/")[1];
  const pathnameWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
  const t = useTranslations();
  const handleLanguageChange = () => {
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
  };

  useEffect(() => {
    setDirction(document.documentElement.dir);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {(isMobile && isOpen) || !isMobile ? (
        <div
          className={`navbar-components bg-white md:w-[86%] w-[300px] md:!p-0 !p-4 h-auto flex md:flex-row flex-col items-center justify-start absolute md:static top-20  md:bg-transparent md:gap-8 gap-4 rounded-lg z-50 ${
            dirction === "ltr" ? "md:right-0 right-1" : "md:left-0 left-1"
          }`}
        >
          <SearchNav />

          <button
            onClick={handleLanguageChange}
            className="items-center justify-center bg-white text-black py-2 px-4 rounded-lg"
          >
            <span className="text-black cursor-pointer flex items-center gap-1">
              {locale === "en" ? "العربية" : "English"}
              <MdOutlineLanguage className="text-[1.2rem]" />
            </span>
          </button>

          <Categories />
          <LoginComponent />

          <PostAd />
        </div>
      ) : null}

      {isMobile && (
        <RiMenu4Fill
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-3xl md:hidden flex"
        />
      )}
    </>
  );
};

export default NavbarCom;
