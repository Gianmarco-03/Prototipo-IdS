import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UtenteCard from "./UtenteCard";
import {
  eventoConnection,
  getEventoInfo,
  getGruppoInfo,
} from "../../service/SideBarService";

const BACKEND_URL = "http://localhost:3000";

const EventoInfo = ({ evento }) => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const [partecipanti, setPartecipanti] = useState([]);
  const [organizzatori, setOrganizzatori] = useState([]);
  const [gruppo, setGruppo] = useState(null);
  const [isOrganizzatore, setIsOrganizzatore] = useState(false);
  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val.$values || [];
  };

  useEffect(() => {
    if (!evento) return;
    const partecipantiArr = toArray(evento.partecipanti).map((p) =>
      typeof p === "string" ? p : p.username
    );
    const organizzatoriArr = toArray(evento.organizzatori).map((o) =>
      typeof o === "string" ? o : o.username
    );
    setPartecipanti(partecipantiArr);
    setOrganizzatori(organizzatoriArr);

    if (evento.nomeGruppo) {
      getGruppoInfo(evento.nomeGruppo).then(setGruppo);
    }

    const username =
      sessionStorage.getItem("user") ||
      sessionStorage.getItem("username") ||
      "";
    setIsOrganizzatore(organizzatoriArr.includes(username));
  }, [evento]);

  const refreshEvento = () => {
    if (!evento) return;
    getEventoInfo(evento.nome, evento.nomeGruppo).then((ev) => {
      const partecipantiArr = toArray(ev.partecipanti).map((p) =>
        typeof p === "string" ? p : p.username
      );
      const organizzatoriArr = toArray(ev.organizzatori).map((o) =>
        typeof o === "string" ? o : o.username
      );
      setPartecipanti(partecipantiArr);
      setOrganizzatori(organizzatoriArr);
    });
  };

  useEffect(() => {
    if (!evento) return;
    eventoConnection.on("PartecipantiAggiornati", refreshEvento);
    return () => {
      eventoConnection.off("PartecipantiAggiornati", refreshEvento);
    };
  }, [evento]);

  const gotoGruppo = () => {
    if (evento?.nomeGruppo) {
      navigate(`/gruppo/${encodeURIComponent(evento.nomeGruppo)}`);
    }
  };

  const toggleBanner = () => setShowBanner(!showBanner);

  if (!evento) return null;

  return (
    <div className="sidebar-section">
      <div className="username-box info-box">
        <span className="field-label">{evento.nome.split("/").pop()}</span>
      </div>

      {gruppo && (
        <div
          className="profile-border-wrapper"
          onClick={gotoGruppo}
          style={{ cursor: "pointer" }}
        >
          <div className="profile-image-container">
            <img
              src={gruppo.immagineProfilo || `${BACKEND_URL}/images/Def_gropic.png`}
              alt="gruppo"
              className="sidebar-image"
            />
          </div>
        </div>
      )}

      {evento.dataInizio && (
        <div className="periodo-box info-box">
          <span className="field-label">Periodo</span>
          <span className="field-value">
            {new Date(evento.dataInizio).toLocaleDateString()}
            {evento.dataFine &&
              ` - ${new Date(evento.dataFine).toLocaleDateString()}`}
          </span>
        </div>
      )}

      {partecipanti.length > 0 && (
        <div>
          <h3>Partecipanti</h3>
          <div className="hashtags-box info-box" onClick={toggleBanner}>
            <ul>
              {partecipanti.slice(0, 5).map((p) => (
                <UtenteCard
                  key={p}
                  username={p}
                  gruppo={evento.nome}
                  isAdmin={organizzatori.includes(p)}
                  showActions={isOrganizzatore}
                  onAction={refreshEvento}
                />
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
                <UtenteCard className="user-card"
                  key={p}
                  username={p}
                  gruppo={evento.nome}
                  isAdmin={organizzatori.includes(p)}
                  showActions={isOrganizzatore}
                  onAction={refreshEvento}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventoInfo;