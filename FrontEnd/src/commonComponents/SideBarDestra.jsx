import "./styles/SideBarDestra.css";
import React from "react";
import SideBarContent from "./SideBarDestraComponent/SideBarContent"

const Sidebar = () => {
  
  return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <button
            className="sidebar-icon-button"
            onClick={() => alert("Modifica profilo")}
            title="Modifica profilo"
          >
            👤
          </button>
          <button
            className="sidebar-icon-button"
            onClick={() => alert("Impostazioni")}
            title="Impostazioni"
          >
            ⚙️
          </button>
        </div> 
        <SideBarContent/>        
      </aside>

  );
};

export default Sidebar;
