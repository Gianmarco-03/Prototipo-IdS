import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UtenteCard from "./UtenteCard";

const BACKEND_URL = "http://localhost:3000";

const EventoInfo = ({ evento, getUtenteInfo }) => {
  
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  if (!evento) return null;


  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.$values || [];
  };

  const partecipanti = toArray(evento.partecipanti).map((p) =>
    typeof p === "string" ? p : p.username
  );
  const organizzatori = toArray(evento.organizzatori).map((o) =>
    typeof o === "string" ? o : o.username
  );

  const gotoGruppo = () => {
      if (evento.gruppoId) {
      navigate(`/gruppo/${encodeURIComponent(evento.gruppoId)}`);
    }
  };

  const toggleBanner = () => setShowBanner(!showBanner);

  return (
    <div className="sidebar-section">
      {evento.gruppoId && (
          <div className="gruppo-card" onClick={gotoGruppo} style={{ cursor: "pointer" }}>
            <span className="utente-card-name">{evento.gruppoId}</span>
        </div>
      )}
       <div className="username-box info-box">
        <span className="field-label">{evento.nome.split("/").pop()}</span>
      </div>
       
      <div className="profile-border-wrapper">
        <div className="profile-image-container">
          <img
            src={evento.immagineProfilo || `${BACKEND_URL}/images/Def_gropic.png`}
            alt="evento"
            className="sidebar-image"
          />
        </div>
      </div>
     
      <div className="bio-box info-box">
        <span className="field-label">Descrizione</span>
        <span className="field-value">{evento.descrizione}</span>
      </div>
     
      {evento.dataInizio && (
        <div className="periodo-box info-box">
          <span className="field-label">Periodo</span>
          <span className="field-value">
            start: {new Date(evento.dataInizio).toLocaleDateString()}
            {evento.dataFine &&
              ` - ${new Date(evento.dataFine).toLocaleDateString()}`}
          </span>
        </div>
      )}
      {partecipanti.length > 0 && (
        <div>
         <div className="hashtags-box info-box" onClick={toggleBanner}>
            <ul>
              {partecipanti.slice(0, 5).map((p) => (
                <UtenteCard key={p} username={p} getInfo={getUtenteInfo} />
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
                <UtenteCard key={p} username={p} getInfo={getUtenteInfo} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoInfo;