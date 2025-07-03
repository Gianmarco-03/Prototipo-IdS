import React from "react";
import { useParams } from "react-router-dom";

const GruppoPage = () => {
  const { nomeGruppo } = useParams();

  return (
    <div>
      <h1>Dettagli gruppo: {nomeGruppo}</h1>
      {/* Qui metti il contenuto dinamico per il gruppo */}
    </div>
  );
};

export default GruppoPage;
