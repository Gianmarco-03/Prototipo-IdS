import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardE.css";
import { approvaEvento, bocciaEvento } from "../../../service/AmministratoreService";
import { rispondiInvitoEvento } from "../../../service/EventoService";

const Card = ({ nomeEvento, descrizione, imgUrl, gruppo, approvato, isAdmin, onAction, condiviso, isInvito, accettato }) => {
  const navigate = useNavigate();
  const gotoEvento = () => {
    navigate(`/evento/${gruppo}/${nomeEvento}`);
  };
   const gotoGruppo = () => {
    navigate(`/gruppo/${gruppo}`);
  };
  
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    if (isInvito) {
      if (accettato !== null && accettato !== undefined) return;
    } else {
      if (!isAdmin || approvato) return;
    }    setPanelOpen((prev) => !prev);
  };

  const username =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const handleApprove = async () => {
 if (isInvito) {
      const gruppoInvitato = sessionStorage.getItem("gruppo") || "";
      await rispondiInvitoEvento(nomeEvento, gruppo, gruppoInvitato, true, username);
    } else {
      await approvaEvento(gruppo, nomeEvento, username);
    }    setPanelOpen(false);
    onAction && onAction();
  };

  const handleReject = async () => {
    if (isInvito) {
      const gruppoInvitato = sessionStorage.getItem("gruppo") || "";
      await rispondiInvitoEvento(nomeEvento, gruppo, gruppoInvitato, false, username);
    } else {
      await approvaEvento(gruppo, nomeEvento, username);
    }    setPanelOpen(false);
    onAction && onAction();
  };
const statoVal = isInvito
    ? accettato === true
      ? "accettato"
      : accettato === false
      ? "rifiutato"
      : "da valutare"
    : approvato
    ? "approvato"
    : "da valutare";
    
  return (
    <>
    <div className="cardE">
      <div className="cardE-image" style={{ backgroundImage: `url(${imgUrl})` }}></div>
      {(isAdmin && !approvato) || (isInvito && (accettato === null || accettato === undefined)) ? (
        <>
          <div className={`card-action-panel ${panelOpen ? "open" : ""}`}>
            <button onClick={handleApprove}>{isInvito ? "accetta" : "approva"}</button>
            <button onClick={handleReject}>{isInvito ? "rifiuta" : "boccia"}</button>
          </div>
        </>
      ) : null}
      <div className="card-overlay gradient-border">
      <button className="card-action-btn" onClick={togglePanel}>⋮</button>
        <div className="card-content" onClick={gotoEvento} >
          <div className="card-titolo-box"> 
            {condiviso && <span className="shared-badge" title="Evento condiviso">🔗</span>}
            <input
              type="text"
              id="nome"
              className="card-title"
              value={nomeEvento}
              readOnly
            />
          </div>
          <textarea
            id="descrizione"
            className="card-description"
            value={descrizione}
            readOnly
          />
          <div className="status-container">
            {<span
              className={`status-dot ${statoVal}`}
            ></span>}
            <span className="status-text">{statoVal}</span>
          </div>


            

        </div>
        <textarea readonly className="gruppo" onClick={gotoGruppo}>
            {gruppo}
        </textarea>
      </div>
    </div>  
       </>
  );
};

export default Card;
