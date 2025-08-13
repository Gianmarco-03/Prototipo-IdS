import React, { useEffect, useState } from "react";
import { getEventoInfo } from "../../service/SideBarService";
import { partecipaEvento, abbandonaEvento } from "../../service/EventoService";
import "./styles/EventoPage.css";import { useNavigate, useParams } from "react-router-dom";
import "./styles/EventoPage.css"


const BACKEND_URL = "http://localhost:3000";

const EventoPage = () => {
  const navigate = useNavigate();
  const { nomeEvento, nomeGruppo } = useParams();
  const [evento, setEvento] = useState(null);
  const [isPartecipante, setIsPartecipante] = useState(false);

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    getEventoInfo(nomeEvento, nomeGruppo).then((ev) => {
      setEvento(ev);
      const list = ev?.partecipanti?.$values || ev?.partecipanti || [];
      const names = list.map((p) => (typeof p === "string" ? p : p.username));
      setIsPartecipante(names.includes(username));
    });
  }, [nomeEvento, nomeGruppo]);


  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(nomeEvento)}`);
   };

  const handlePartecipa = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await partecipaEvento(nomeEvento, username);
    setIsPartecipante(true);
  };

  const handleAbbandona = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await abbandonaEvento(nomeEvento, username);
    setIsPartecipante(false);
  };

  const nome = evento?.nome?.split("/").pop() || nomeEvento;
  const img = evento?.immagineProfilo || evento?.ImmagineProfilo;
  const descr = evento?.descrizione || evento?.Descrizione;


  return (
   <div className="evento-page">
      <div className="evento-header">
        <div className="evento-title-box">
          <h1>{nome}</h1>
        </div>
        {isPartecipante ? (
          <button className="evento-action" onClick={handleAbbandona}>
            Abbandona
          </button>
        ) : (
          <button className="evento-action" onClick={handlePartecipa}>
            Partecipa
          </button>
        )}
      </div>

      <div className="evento-image-container">
        <img
          src={img || `${BACKEND_URL}/images/Def_gropic.png`}
          alt="evento"
          className="evento-image"
        />
      </div>

      <div className="evento-description-box">
        {descr}
      </div>
      <div className="chat-button-conteiner">
        <div className="chat-button-mask"></div>
        <div className="angolo-alto-filler">
          <div className="angolo-alto"></div>
        </div>
        <button className="chat-button" onClick={goToChat}>
            Vai alla Chat
        </button>
      </div>
    </div>
  );
};

export default EventoPage;
