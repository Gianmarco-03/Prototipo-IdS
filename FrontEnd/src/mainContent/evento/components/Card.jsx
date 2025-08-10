import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardE.css";

const Card = ({ nomeEvento, descrizione, imgUrl, gruppo, approvato }) => {
  const navigate = useNavigate();
  const gotoEvento = () => {
    navigate(`/evento/${gruppo}/${nomeEvento}`);
  };
   const gotoGruppo = () => {
    navigate(`/gruppo/${gruppo}`);
  };
  
    const statoVal = approvato ? "approvato" : "da valutare";
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
