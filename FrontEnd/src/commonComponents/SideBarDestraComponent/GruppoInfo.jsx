import React from "react";
import UtenteCard from "./UtenteCard";

const BACKEND_URL = "http://localhost:3000";


const GroupInfo = ({ gruppo, getUtenteInfo }) => {
  if (!gruppo) return null;

  const partecipantiArray = gruppo.partecipanti?.$values || gruppo.partecipanti || [];
  const amministratoriArray = gruppo.amministratori?.$values || gruppo.amministratori || [];

  const partecipanti = partecipantiArray.map((p) =>
    typeof p === "string" ? p : p.username
  );
  const amministratori = amministratoriArray.map((a) =>
    typeof a === "string" ? a : a.username
  );

  return (
    <div className="sidebar-section">
     <div className="profile-border-wrapper">
        <div className="profile-image-container">
          <img
            src={gruppo.immagineProfilo || `${BACKEND_URL}/images/Def_gropic.png`}
            className="sidebar-image"
            alt="profilo"
          />
        </div>
      </div>
      <div className="username-box info-box">
        <span className="field-label">{gruppo.nome}</span>
      </div>
      <div className="bio-box info-box">
        <span className="field-label">Descrizione</span>
        <span className="field-value">{gruppo.descrizione}</span>
      </div>

      {partecipanti.length > 0 && (
        <div>
          <strong>Partecipanti:</strong>
          <div className="hashtags-box info-box">
              <ul>
                {partecipanti.slice(0, 5).map((p) => (
                  <UtenteCard className="u-card" key={p} username={p} getInfo={getUtenteInfo}/>
                ))}
              </ul>
          </div>  
        </div>
      )}
    </div>
  );
};

export default GroupInfo;
