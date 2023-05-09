/** @format */

import React from "react";
import SideMenu from "../components/AdminPanel/SideMenu";
import Content from "../components/AdminPanel/Content";

const AdminPanel = () => {
  return (
    <div className="container flex min-h-[800px] w-full mx-auto">
      <div className="flex w-full">
        <SideMenu />
        <Content />
      </div>
    </div>
  );
};

export default AdminPanel;
