import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/EventoPage.css"

const GruppoPage = () => {
  const navigate = useNavigate();
  const { nomeEvento } = useParams();
  const { nomeGruppo } = useParams();

  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(nomeEvento)}`)
  };

  return (
    <div className="GruppoPage">
      <h1>Evento: {nomeEvento}</h1>
      {/* Altri contenuti del gruppo */}

      <button 
        onClick={goToChat} 
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "linear-gradient(90deg, #A73EE7, #00EBFF)",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Vai alla Chat
      </button>
    </div>
  );
};

export default GruppoPage;
