import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutProvider;
