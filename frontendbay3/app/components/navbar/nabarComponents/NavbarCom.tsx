"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Categories from "./Categories";
import PostAd from "./PostAd";
import SearchNav from "./SearchNav";
import { MdOutlineLanguage } from "react-icons/md";
import { useEffect, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import Link from "next/link";

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
          className={`navbar-components bg-white md:!p-0 !p-4 h-auto flex  gap-4 md:flex-row flex-col items-center justify-end ${isMobile ? "w-full !px-4  absolute top-16 right-2 z-50" : ""} `}
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
          <Link className="border-b-2 !px-3 hover:text-[var(--primary-color)]" href={"/login"}>
            <span>{t("navbar.login")}</span>
          </Link>
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
