import React from "react";
import { useNavigate } from "react-router-dom";
import UtenteCard from "./UtenteCard";

const BACKEND_URL = "http://localhost:3000";

const EventoInfo = ({ evento, getUtenteInfo }) => {
  
  const navigate = useNavigate();
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
    if (evento.gruppo) {
      navigate(`/gruppo/${encodeURIComponent(evento.gruppo)}`);
    }
  };

  return (
    <div className="sidebar-section">
      <div className="profile-border-wrapper">
        <div className="profile-image-container">
          <img
            src={evento.immagine || `${BACKEND_URL}/images/Def_evpic.png`}
            alt="evento"
            className="sidebar-image"
          />
        </div>
      </div>
      <div className="username-box info-box">
        <span className="field-label">{evento.nome}</span>
      </div>
      <div className="bio-box info-box">
        <span className="field-label">Descrizione</span>
        <span className="field-value">{evento.descrizione}</span>
      </div>
      {evento.gruppo && (
        <div className="info-box" onClick={gotoGruppo} style={{ cursor: "pointer" }}>
          <span className="field-label">Gruppo</span>
          <div className="utente-card">
            <span className="utente-card-name">{evento.gruppo}</span>
          </div>
        </div>
      )}
      {evento.dataInizio && (
        <div className="info-box">
          <span className="field-label">Periodo</span>
          <span className="field-value">
            {new Date(evento.dataInizio).toLocaleDateString()}
            {evento.dataFine &&
              ` - ${new Date(evento.dataFine).toLocaleDateString()}`}
          </span>
        </div>
      )}
      {organizzatori.length > 0 && (
        <div>
          <strong>Organizzatori:</strong>
          <div className="hashtags-box info-box">
            {organizzatori.slice(0, 5).map((o) => (
              <UtenteCard key={o} username={o} getInfo={getUtenteInfo} />
            ))}
          </div>
        </div>
      )}
      {partecipanti.length > 0 && (
        <div>
          <strong>Partecipanti:</strong>
          <div className="hashtags-box info-box">
            {partecipanti.slice(0, 5).map((p) => (
              <UtenteCard key={p} username={p} getInfo={getUtenteInfo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoInfo;