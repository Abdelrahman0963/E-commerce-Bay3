"use client";
import React from "react";
import { useProductBySlug } from "../hooks/UseProducts";
import Carousel from "../components/Carousel";
import Notfound from "../components/Notfound";
import { ProductSkeleton } from "../components/Loading";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslations } from "next-intl";
import { MdOutlineMyLocation } from "react-icons/md";

export default function Homeslug({ slug }: { slug: string }) {
  const [show, setShow] = React.useState(false);
  const { product, isLoading, isError } = useProductBySlug(slug);
  const { token } = useAuthStore();
  const t = useTranslations();
  if (isLoading) return <ProductSkeleton />;
  if (isError || !product) return <Notfound />;
  const { title, description, price, company, location, images, phone, createdAt } = product;
  function formatRelativeTime(date: string) {
    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} ${t("product.days")}`;
    if (days > 7) return `${days} ${t("product.week")}`;
    if (hours > 0) return `${hours} ${t("product.hours")}`;
    if (minutes > 0) return `${minutes} ${t("product.minutes")}`;
    return "الآن";
  }

  const createdAtFormated = createdAt ? formatRelativeTime(createdAt) : "";
  const copyclick = () => {
    navigator.clipboard.writeText(phone);
    toast.success("Copied to clipboard");
  }
  const notTokin = () => {
    toast.error("You need to login first");
  }
  type Ad = {
    id: string;
    title: string;
    description?: string;
    price?: number;
    category?: string;
    location?: string;
    phone?: string;
    images?: string[];
    statu: "new" | "pending" | "rejected" | "accepted" | string;
    user?: {
      id?: number;
      username: string;
      email: string;
    };
    slug: string;
    createdAt: string;
  };

  const username = product.user ? product.user.username : "";

  return (
    <section className="container flex flex-col gap-10 !mx-auto !py-26 md:!py-36 md:!px-6 !px-4">
      <div className="flex md:justify-between gap-6 flex-col md:flex-row items-center w-full">
        <Carousel images={images} />
        <div className="flex flex-col gap-2 border border-gray-300 !p-4 rounded-md w-full h-full">
          <nav className="flex items-center gap-4 ">
            <strong className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--user-color)] text-[var(--primary-color)] border-2 border-gray-500 text-[1.8rem]">
              {username
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </strong>
            <p className="text-black">{username}</p>
          </nav>
          <div onClick={() => setShow(!show)} className="flex flex-col gap-4">
            <div onClick={token ? undefined : notTokin} className="flex items-center justify-between bg-[var(--primary-color)] text-white cursor-pointer w-full !p-4">
              <p className="capitalize">{t("product.showphone")}</p>
              <BiSolidDownArrow className="text-2xl" />
            </div>
            {token && show && <nav onClick={copyclick} className="flex items-center justify-between w-full cursor-pointer">
              <p className="text-black">{phone}</p>
              <IoCopy className="text-2xl cursor-pointer" />
            </nav>}
            <h1 className="!mb-2 text-lg font-semibold text-black">{t("MemberSafety.title")}</h1>
            <ul className="space-y-2 text-[0.9rem] text-black list-disc list-inside">
              <li>{t("MemberSafety.safety")}</li>
              <li>{t("MemberSafety.safety2")}</li>
              <li>{t("MemberSafety.safety3")}</li>
              <li>{t("MemberSafety.safety4")}</li>
              <li>{t("MemberSafety.safety5")}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="info max-w-md flex flex-col gap-4 w-full">
        <nav className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-black">{createdAtFormated}</p>
        </nav>
        <p className="text-gray-600">{description}</p>
        <p className="mt-2 font-semibold">{t("product.price")} {price}</p>
        <p>{company}</p>
        <nav className="flex items-center gap-2 hover:text-[var(--primary-color)] cursor-pointer"><p>{location}</p> <MdOutlineMyLocation /></nav>
      </div>
    </section>
  );
}
