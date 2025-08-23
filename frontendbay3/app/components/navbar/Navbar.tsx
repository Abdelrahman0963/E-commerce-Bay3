import Image from "next/image";
import React from "react";
import SearchNav from "./nabarComponents/SearchNav";
import NavbarCom from "./nabarComponents/NavbarCom";
import { RiMenu4Fill } from "react-icons/ri";
const Navbar = () => {
  return (
    <header className=" bg-white relative shadow-md !px-5 !py-5">
      <nav className="flex items-center justify-between max-w-full mx-auto">
        <div className="logo md:block w-full md:w-auto flex items-center justify-between gap-4">
          <Image
            src="/logo.png"
            alt="logo"
            priority
            quality={100}
            width={150}
            height={150}
          />
          <RiMenu4Fill className="cursor-pointer text-3xl md:hidden flex" />
        </div>
        <NavbarCom />
      </nav>
    </header>
  );
};

export default Navbar;
