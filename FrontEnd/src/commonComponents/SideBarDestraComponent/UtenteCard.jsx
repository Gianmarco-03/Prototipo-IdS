import React, { useEffect, useState } from "react";
import "../styles/UtenteCard.css";
import { getUtenteInfo } from "../../service/SideBarService";

const BACKEND_URL = "http://localhost:3000";


const UtenteCard = ({ username }) => {
      const [utente, setUtente] = useState(null);
    useEffect(() => {
    if (username) {
        getUtenteInfo(username).then(setUtente);
    }
    }, [username]);
    if (!utente) return null;
    
  

  return (
    <div className="utente-card">
    <img
        src={utente.immagineProfilo || `${BACKEND_URL}/images/Def_propic.png`}
        alt={username}
        className="utente-card-image"
      />      <span className="utente-card-name">{utente.username}</span>
    </div>
  );
};

export default UtenteCard;