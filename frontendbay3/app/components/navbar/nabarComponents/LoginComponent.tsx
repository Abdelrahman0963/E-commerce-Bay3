"use client";
import Login from "@/app/pages/Login";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const LoginComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whitespace-nowrap h-full cursor-pointer items-center justify-center bg-white  !px-4 text-black text-[1rem] border-b-2 border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:transform hover:scale-105 transition-all border-0"
      >
        {t("navbar.login")}
      </button>
      <div className="absolute top-[350%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl">
        {isOpen && <Login />}
        {isOpen && (
          <IoMdCloseCircleOutline
            onClick={() => setIsOpen(false)}
            className="absolute top-2 text-2xl text-[var(--primary-color)] right-2 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
