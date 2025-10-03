import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="w-full bg-black text-center !p-4 !mt-8 text-white">
      <div className="mb-2">
        <h1 className="text-xl font-bold">
          Bay3 <span className="text-sm font-normal">Project</span>
        </h1>
        <nav className="text-sm mt-1 flex gap-2 items-center justify-center">Abdelrahman Sayed <FaHeart /></nav>
      </div>
      <nav>
        <ul className="flex justify-center gap-4 text-sm">
          <li>A project born from passion and ideas</li>
          <li>© 2025 Bay3</li>
        </ul>
      </nav>
    </footer>

  );
};

export default Footer;
