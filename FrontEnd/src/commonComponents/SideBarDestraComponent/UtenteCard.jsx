import React, { useEffect, useState } from "react";
import "../styles/UtenteCard.css";
import { getUtenteInfo } from "../../service/SideBarService";
import { promuoviUtente, rimuoviUtente } from "../../service/AmministratoreService";
import { StarIcon } from "@heroicons/react/24/outline";

const BACKEND_URL = "http://localhost:3000";


  const UtenteCard = ({ username, isAdmin, showActions, gruppo, onAction }) => {
  const [utente, setUtente] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  useEffect(() => {
    if (username) {
      getUtenteInfo(username).then(setUtente);
    }
  }, [username]);
  if (!utente) return null;
    
  const handleContextMenu = (e) => {
    if (!showActions) return;
    e.preventDefault();
    setMenuPos({ x: e.clientX, y: e.clientY });
  };

  const adminUsername =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const handlePromuovi = async () => {
    await promuoviUtente(gruppo, username, adminUsername);
    setMenuPos(null);
    onAction && onAction();
  };

  const handleRimuovi = async () => {
    await rimuoviUtente(gruppo, username, adminUsername);
    setMenuPos(null);
    onAction && onAction();
  };

  return (
    <div className="utente-card" onContextMenu={handleContextMenu}>
    <img
        src={utente.immagineProfilo || `${BACKEND_URL}/images/Def_propic.png`}
        alt={username}
        className="utente-card-image"/>
      {isAdmin && <StarIcon className="admin-icon" width={20} height={20}  />}
      {menuPos && (
          <ul
            className="utente-context-menu"
            style={{ top: menuPos.y, left: menuPos.x }}
            onMouseLeave={() => setMenuPos(null)}>
            {!isAdmin && <li onClick={handlePromuovi}>Promuovi</li>}
            <li onClick={handleRimuovi}>Rimuovi</li>
          </ul>
      )}
      <span className="utente-card-name">{utente.username}</span>


    </div>
  );
};

export default UtenteCard;