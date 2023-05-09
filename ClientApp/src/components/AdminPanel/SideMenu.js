/** @format */

import React from "react";
import SideBarElement from "./SideBarElement";
import Reservations from "./Reservations";

const SideMenu = () => {
  return (
    <div className=" container max-w-sm bg-gray-100 flex flex-col">
      <SideBarElement title="Ev ekle " />
      <Reservations />
    </div>
  );
};

export default SideMenu;
