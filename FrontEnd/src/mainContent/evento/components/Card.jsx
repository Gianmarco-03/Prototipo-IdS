import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardE.css";

const Card = ({ nome, descrizione, imgUrl,gruppo,stato }) => {
  const navigate = useNavigate();

  const gotoEvento = () => {
    navigate(`/evento/${gruppo}/${nome}`);
  };
   const gotoGruppo = () => {
    navigate(`/gruppo/${gruppo}`);
  };
  
    var statoVal = stato == 0 ? "da valutare" : stato == 1 ? "approvato" : "rifiutato"
  return (

    <>
    <div className="cardE">
      <div className="cardE-image" style={{ backgroundImage: `url(${imgUrl})` }}></div>
      <div className="card-overlay gradient-border">
        <div className="card-content" onClick={gotoEvento} >
          <input
            type="text"
            id="nome"
            className="card-title"
            value={nome}
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
              className={`status-dot ${
                (stato || "da valutare").toLowerCase().replace(/\s+/g, "")
              }`}
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
