import React, { useEffect, useState } from "react";
import "../styles/UtenteCard.css";

const BACKEND_URL = "http://localhost:3000";


const UtenteCard = ({ username, getInfo }) => {
      const [utente, setUtente] = useState(null);
    useEffect(() => {
    if (username && getInfo) {
        getInfo(username).then(setUtente);
    }
    }, [username, getInfo]);
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