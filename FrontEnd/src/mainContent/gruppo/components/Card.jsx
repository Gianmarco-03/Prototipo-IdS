import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CardG.css";

const Card = ({ nome, descrizione, imgUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gruppo/${encodeURIComponent(nome)}`);
  };

  return (
    <div className="cardG" onClick={handleClick}>
      <div className="cardG-image"  style={{ backgroundImage: `url(${imgUrl})` }}></div>
      <div className="cardG-overlay gradient-border">
        <div className="cardG-content">
          <input
            type="text"
            id="nome"
            className="cardG-title"
            value={nome}
            readOnly
          />
          <textarea
            id="descrizione"
            className="cardG-description"
            value={descrizione}
            readOnly
          />
        </div>
        </div>
    </div>
  );
};

export default Card;
