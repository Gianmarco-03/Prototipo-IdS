import React from "react";
import { useParams } from "react-router-dom";

const GruppoPage = () => {
  const { nomeGruppo } = useParams();

  return (
    <div>
      <h1>Sei nel gruppo: {decodeURIComponent(nomeGruppo)}</h1>
      {/* Qui metti contenuto dinamico */}
    </div>
  );
};

export default GruppoPage;
