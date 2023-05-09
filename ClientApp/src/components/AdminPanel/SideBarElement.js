/** @format */

import React from "react";
import { Link } from "react-router-dom";

const SideBarElement = ({ title, onClick }) => {
  return (
    <div className=" m-6 border-b p-3 border-gray-300">
      <Link to="/admin-panel/add-house">
        <button
          onClick={onClick}
          className="bg-violet-700 w-full text-white min-h-[40px] rounded-xl font-semibold hover:bg-violet-800 transition"
        >
          {title}
        </button>
      </Link>
    </div>
  );
};

export default SideBarElement;
