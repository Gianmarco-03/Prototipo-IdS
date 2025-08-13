import "./styles/SideBarSinistra.css";
import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CalendarDateRangeIcon, UserGroupIcon } from "@heroicons/react/24/outline";




const Selector = () => {
    const location = useLocation();
    let current = "gruppo"
    if (location.pathname.startsWith("/evento")) {
        current = "evento"
    }
  const navigate = useNavigate();
  const gotoEventi = () => {
    navigate(`/eventi`);
  };
  const gotoGruppi = () => {
    navigate(`/`);
  };

  return (
      <aside className="selector">
        <button className="goto-Evento" onClick={gotoEventi}>
            <CalendarDateRangeIcon className="event-icon" width={30} height={30}  />
        </button>  
        <button className="goto-Gruppo" onClick={gotoGruppi}>
          <UserGroupIcon className="event-icon" width={30} height={30}  />
        </button>        
      </aside>

  );
};

export default Selector;
