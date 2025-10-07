"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Categories from "./Categories";
import PostAd from "./PostAd";
import { MdOutlineLanguage } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";
import AuthNav from "./AuthNav";
import SearchNav from "./SearchNav";
import WishList from "./WishList";


const NavbarCom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dirction, setDirction] = useState<string>("ltr");

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
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
      setIsMobile(window.innerWidth <= 1023);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {(isMobile && isOpen) || !isMobile ? (
        <div
          ref={dropdownRef}
          className={`bg-white max-h-screen flex  gap-4 md:flex-row flex-col items-center justify-center ${isMobile ? "w-full !p-4  absolute  top-16 md:right-2 z-50" : ""} `}
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
          <WishList />
          {!isLoggedIn ? (
            <Link className="border-b-2 !px-3  hover:text-[var(--primary-color)]" href={"/login"}>
              <span>{t("navbar.login")}</span>
            </Link>
          ) : (
            <AuthNav />
          )}

          <PostAd />
        </div>
      ) : null}
      {isMobile && (
        <RiMenu4Fill
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer text-3xl lg:hidden block"
        />
      )}
    </>
  );
};

export default NavbarCom;
