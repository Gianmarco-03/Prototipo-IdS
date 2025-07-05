import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GruppoPage = () => {
  const navigate = useNavigate();
  const { nomeGruppo } = useParams();

  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}`)
  };

  return (
    <div style={{ padding: "20px", color: "#fff", backgroundColor: "#1D203E", minHeight: "100vh" }}>
      <h1>Gruppo: {nomeGruppo}</h1>
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
