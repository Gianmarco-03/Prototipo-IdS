import React, { useState } from "react";
import Sidebar from "./commonComponents/SideBarDestra";
import MainContent from "./mainContent/MainContent";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi"
import { Outlet } from "react-router-dom";

const Layout = () => {


  return (
    <>
    <div className="layout-container">
      <Outlet/>
      <Sidebar/>
    </div>

    
    </>
  );
};

export default Layout;
