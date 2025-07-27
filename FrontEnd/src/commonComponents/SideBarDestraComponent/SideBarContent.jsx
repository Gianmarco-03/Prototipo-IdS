import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfo from "./UtenteInfo";
import GroupInfo from "./GruppoInfo";
import EventInfo from "./EventoInfo";
import { getGruppoInfo, getEventoInfo } from "./SideBarService";

const SidebarContent = () => {
  const location = useLocation();
   const [gruppo, setGruppo] = useState(null);
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    setGruppo(null);
    setEvento(null);
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts[0] === "gruppo") {
      const nomeGruppo = decodeURIComponent(parts[1]);
      getGruppoInfo(nomeGruppo).then(setGruppo);
    } else if (parts[0] === "evento") {
      const nomeGruppo = decodeURIComponent(parts[1]);
      const nomeEvento = decodeURIComponent(parts[2]);
      getEventoInfo(`${nomeGruppo}/${nomeEvento}`).then(setEvento);
    } else if (parts[0] === "chat") {
      if (parts.length === 2) {
        const nomeGruppo = decodeURIComponent(parts[1]);
        getGruppoInfo(nomeGruppo).then(setGruppo);
      } else if (parts.length >= 3) {
        const nomeGruppo = decodeURIComponent(parts[1]);
        const nomeEvento = decodeURIComponent(parts[2]);
        getEventoInfo(`${nomeGruppo}/${nomeEvento}`).then(setEvento);
      }
    }
  }, [location]);

  if (evento) return <EventInfo evento={evento} />;
  if (gruppo) return <GroupInfo gruppo={gruppo} />;
  const username = sessionStorage.getItem('username');
  return <UserInfo user={{ username }} />;
};

export default SidebarContent;
