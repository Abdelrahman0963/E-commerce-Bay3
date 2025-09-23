import Image from "next/image";
import React from "react";
import NavbarCom from "./nabarComponents/NavbarCom";
import Link from "next/link";
const Navbar = () => {
  return (
    <header id="header" className=" bg-white fixed top-0 left-0 right-0 z-50 shadow-md !px-6 md:!px-20 !py-5">
      <nav className="flex items-center relative justify-between w-full">
        <Link href="/" className="logo md:block w-full lg:w-auto">
          <div>
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
            />
          </div>
        </Link>
        <NavbarCom />
      </nav>
    </header>
  );
};

export default Navbar;
