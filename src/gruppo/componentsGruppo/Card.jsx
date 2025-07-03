import React from "react";
import "./styles/Card.css";
import { useNavigate } from "react-router-dom";
const Card = ({ nome, descrizione, imgUrl }) => {
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");

  const navigate = useNavigate();  // <-- crea la funzione navigate


  const handleClick = () => {
    // usa nome "pulito" per l'url, eventualmente fai un encoding o slugify
    const slug = encodeURIComponent(nome.toLowerCase().replace(/\s+/g, "-"));
    navigate(`/gruppo/${slug}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter") handleClick();
      }}
    >
      <div
        className="cardBackground"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></div>
      <div className="overlayBox">
        <input
          type="text"
          id="nome"
          placeholder="Nome"
          value={nome}
          readOnly
          className="inputNome"
          tabIndex={-1}
        />
        <input
          type="text"
          id="descrizione"
          placeholder="Descrizione"
          value={descrizione}
          readOnly
          className="inputDescrizione"
          tabIndex={-1}
        />
      </div>
    </div>
  );
};

export default Card;
