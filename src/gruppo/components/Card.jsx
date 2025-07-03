import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Card.css";

const Card = ({ nome, descrizione, imgUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/gruppo/${encodeURIComponent(nome)}`);
  };

  return (
    <div className="card" onClick={handleClick} style={{ backgroundImage: `url(${imgUrl})` }}>
      <div className="card-image" >
        <div className="card-overlay gradient-border">
          <div className="card-content">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
