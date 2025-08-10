import React, { useState, useEffect } from "react";
import UtenteCard from "./UtenteCard";
import { checkAdmin } from "../../service/GruppoService";

const BACKEND_URL = "http://localhost:3000";


const GroupInfo = ({ gruppo}) => {

  const partecipantiArray = gruppo.partecipanti?.$values || gruppo.partecipanti || [];
  const amministratoriArray = gruppo.amministratori?.$values || gruppo.amministratori || [];

  const partecipanti = partecipantiArray.map((p) =>
    typeof p === "string" ? p : p.username
  );
  const amministratori = amministratoriArray.map((a) =>
    typeof a === "string" ? a : a.username
  );

  const [showBanner, setShowBanner] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    checkAdmin(gruppo.nome, username).then(setIsAdmin);
  }, [gruppo.nome]);

  const toggleBanner = () => setShowBanner(!showBanner);

  if (!gruppo) return null;

  return (
    <div className="sidebar-section">
      <div className="username-box ">
        <span className="field-label">{gruppo.nome}</span>
      </div>
      
     <div className="profile-border-wrapper">
        <div className="profile-image-container">
          <img
            src={gruppo.immagineProfilo || `${BACKEND_URL}/images/Def_gropic.png`}
            className="sidebar-image"
            alt="profilo"
          />
        </div>
      </div>
     
      <div className="bio-box">
        <span className="field-label">Descrizione</span>
        <span className="field-value">{gruppo.descrizione}</span>
      </div>

      {partecipanti.length > 0 && (
        <div>
          <strong>Partecipanti:</strong>
   <div className="hashtags-box" onClick={toggleBanner}>
            <ul>
              {partecipanti.slice(0, 5).map((p) => (
                <UtenteCard className="u-card" key={p} username={p} gruppo={gruppo.nome} 
                  isAdmin={amministratori.includes(p)} showActions={isAdmin} onAction={() => window.location.reload()} />
              ))}
            </ul>
          </div>
        </div>
      )}

      {showBanner && (
        <div className="partecipanti-banner" onClick={toggleBanner}>
          <div className="banner-content">
            <h3>Partecipanti</h3>
            <ul>
              {partecipanti.map((p) => (
                <UtenteCard key={p} username={p} gruppo={gruppo.nome}
                 isAdmin={amministratori.includes(p)} showActions={isAdmin} onAction={() => window.location.reload()} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
