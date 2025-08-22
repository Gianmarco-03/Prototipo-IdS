import "./styles/SideBarDestra.css";
import React from "react";
import SideBarContent from "./SideBarDestraComponent/SideBarContent";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";


const Sidebar = () => {

  const navigate = useNavigate();
  const gotoProfilo = () => {
    navigate(`/profilo`);
  };

  return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <button
            className="sidebar-icon-button"
            onClick={gotoProfilo}
            title="Modifica profilo"
          >
          <UserIcon className="event-icon" width={30} height={30} />          </button>
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