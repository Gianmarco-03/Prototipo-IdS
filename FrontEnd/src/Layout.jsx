import React from "react";
import Sidebar from "./commonComponents/SideBarDestra";
import Selector from "./commonComponents/SideBarSinistra";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {

    const location = useLocation();

  return (
    <>
    <div className="layout-container">
        <Selector />
        <Outlet/>
        <Sidebar key={location.pathname}/>
    </div>

    
    </>
  );
};

export default Layout;
