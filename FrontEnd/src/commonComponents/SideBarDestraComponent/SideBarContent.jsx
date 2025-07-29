import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfo from "./UtenteInfo";
import GroupInfo from "./GruppoInfo";
import EventInfo from "./EventoInfo";
import { getGruppoInfo, getEventoInfo, getUtenteInfo } from "../../service/SideBarService";


const SidebarContent = () => {
  const location = useLocation();
  const [gruppo, setGruppo] = useState(null);
  const [evento, setEvento] = useState(null);
  const [utente, setUtente] = useState(null);

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
    } else {
      const username = sessionStorage.getItem("user") || sessionStorage.getItem("username");
      if (username) {
        getUtenteInfo(username).then(setUtente);
      }
    }
  }, [location]);

  if (evento) return <EventInfo evento={evento} />;
  if (gruppo) return <GroupInfo gruppo={gruppo} getUtenteInfo={getUtenteInfo}  />;
  if (utente) return <UserInfo user={utente} />;
  return null;
};

export default SidebarContent;
