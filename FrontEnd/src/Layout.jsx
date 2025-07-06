import React, { useState } from "react";
import Sidebar from "./commonComponents/SideBarDestra";
import Selector from "./commonComponents/SideBarSinistra";
import { Outlet } from "react-router-dom";

const Layout = () => {


  return (
    <>
    <div className="layout-container">
      <Selector />
      <Outlet/>
      <Sidebar/>
    </div>

    
    </>
  );
};

export default Layout;
