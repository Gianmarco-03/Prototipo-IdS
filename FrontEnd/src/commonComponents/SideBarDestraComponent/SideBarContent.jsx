import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserInfo from "./UtenteInfo";
import GroupInfo from "./GruppoInfo";
import EventInfo from "./EventoInfo";
import {
  getGruppoInfo,
  getEventoInfo,
  getUtenteInfo,
} from "../../service/SideBarService";


const SidebarContent = () => {
  const location = useLocation();
  const [gruppo, setGruppo] = useState(null);
  const [evento, setEvento] = useState(null);
  const [utente, setUtente] = useState(null);

  useEffect(() => {
    setGruppo(null);
    setEvento(null);
    setUtente(null);

    const parts = location.pathname.split("/").filter(Boolean);
    const storedGruppo = sessionStorage.getItem("gruppo");
    const storedEvento = sessionStorage.getItem("evento");
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username");

    if (parts[0] === "gruppo") {
      const nomeGruppo = decodeURIComponent(parts[1]);
      sessionStorage.setItem("gruppo", nomeGruppo);
      sessionStorage.removeItem("evento");
      getGruppoInfo(nomeGruppo).then(setGruppo);
    } else if (parts[0] === "evento") {
      const nomeGruppo = decodeURIComponent(parts[1]);
      const nomeEvento = decodeURIComponent(parts[2]);
      sessionStorage.setItem("evento", nomeEvento);
      if (storedGruppo !== nomeGruppo) {
        sessionStorage.setItem("gruppo", nomeGruppo);
      }
      getEventoInfo(nomeEvento, nomeGruppo).then(setEvento);
    } else if (parts[0] === "chat") {
      if (parts.length >= 3) {
        const nomeGruppo = decodeURIComponent(parts[1]);
        const nomeEvento = decodeURIComponent(parts[2]);
        sessionStorage.setItem("gruppo", nomeGruppo);
        sessionStorage.setItem("evento", nomeEvento);
        getEventoInfo(nomeEvento, nomeGruppo).then(setEvento);
      } else if (parts.length === 2) {
        const nomeGruppo = decodeURIComponent(parts[1]);
        sessionStorage.setItem("gruppo", nomeGruppo);
        sessionStorage.removeItem("evento");
        getGruppoInfo(nomeGruppo).then(setGruppo);
      } else if (storedEvento && storedGruppo) {
        getEventoInfo(storedEvento, storedGruppo).then(setEvento);
      } else if (storedGruppo) {
        getGruppoInfo(storedGruppo).then(setGruppo);
      } else if (username) {
        getUtenteInfo(username).then(setUtente);
      }
    } else if (username) {
      getUtenteInfo(username).then(setUtente);
    }
  }, [location]);

  if (evento) return <EventInfo evento={evento} />;
  if (gruppo) return <GroupInfo gruppo={gruppo} />;
  if (utente) return <UserInfo user={utente} />;
  return null;
};

export default SidebarContent;