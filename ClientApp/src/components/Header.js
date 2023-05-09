/** @format */

import React from "react";
import { Link } from "react-router-dom";
import GuvenEmlakLogo from "../assets/img/guvenEmlakLogo.png";

const Header = () => {
  return (
    <header className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img className=" max-h-[80px]" src={GuvenEmlakLogo} alt="" />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            className=" bg-violet-700 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"
            to="/admin-panel"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
