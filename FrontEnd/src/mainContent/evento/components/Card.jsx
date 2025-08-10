import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardE.css";
import { approvaEvento, bocciaEvento } from "../../../service/AmministratoreService";

const Card = ({ nomeEvento, descrizione, imgUrl, gruppo, approvato, isAdmin, onAction }) => {
  const navigate = useNavigate();
  const gotoEvento = () => {
    navigate(`/evento/${gruppo}/${nomeEvento}`);
  };
   const gotoGruppo = () => {
    navigate(`/gruppo/${gruppo}`);
  };
  
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => {
    if (!isAdmin || approvato) return;
    setPanelOpen((prev) => !prev);
  };

  const username =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const handleApprove = async () => {
    await approvaEvento(gruppo, nomeEvento, username);
    setPanelOpen(false);
    onAction && onAction();
  };

  const handleReject = async () => {
    await bocciaEvento(gruppo, nomeEvento, username);
    setPanelOpen(false);
    onAction && onAction();
  };
    const statoVal = approvato ? "approvato" : "da valutare";
    return (

    <>
    <div className="cardE">
      <div className="cardE-image" style={{ backgroundImage: `url(${imgUrl})` }}></div>
       {isAdmin && !approvato && (
        <>
          <div className={`card-action-panel ${panelOpen ? "open" : ""}`}>
            <button onClick={handleApprove}>approva</button>
            <button onClick={handleReject}>boccia</button>
          </div>
        </>
      )}
      <div className="card-overlay gradient-border">
      <button className="card-action-btn" onClick={togglePanel}>⋮</button>
        <div className="card-content" onClick={gotoEvento} >
          <input
            type="text"
            id="nome"
            className="card-title"
            value={nomeEvento}
            readOnly
          />
          <textarea
            id="descrizione"
            className="card-description"
            value={descrizione}
            readOnly
          />
          <div className="status-container">
            <span
            className={`status-dot ${approvato ? "approvato" : "davalutare"}`}
            ></span>
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
