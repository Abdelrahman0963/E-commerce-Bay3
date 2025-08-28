import Image from "next/image";
import React from "react";
import NavbarCom from "./nabarComponents/NavbarCom";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className=" bg-white relative shadow-md !px-20 !py-5">
      <nav className="flex items-center justify-between max-w-full mx-auto">
        <Link href="/" className="logo md:block w-full md:w-auto">
          <div className="logo md:block w-full md:w-auto">
            <Image
              src="/logo.png"
              alt="logo"
              priority
              quality={100}
              width={150}
              height={150}
            />
          </div>
        </Link>
        <NavbarCom />
      </nav>
    </header>
  );
};

export default Navbar;
