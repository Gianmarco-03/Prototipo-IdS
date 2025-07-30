import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/GruppoPage.css";
import Card from "../evento/components/Card";
import { checkAdmin, getEventiGruppo } from "../../service/GruppoService";


const GruppoPage = () => {
  const navigate = useNavigate();
  const { nomeGruppo } = useParams();
  const [eventi, setEventi] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDaValutare, setShowDaValutare] = useState(false);

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

    getEventiGruppo(nomeGruppo).then((d) => {
      const list = d.$values || d || [];
      const filtered = list.filter(
        (ev) => (ev.GruppoId || ev.gruppoId || ev.gruppo) === nomeGruppo
      );
      setEventi(filtered);
    });

    checkAdmin(nomeGruppo,username).then((g) => {
      setIsAdmin(g);
    });
  }, [nomeGruppo]);

  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}`);
  };

  const filteredEventi = eventi.filter((ev) => {
    const stato = ev.Stato || ev.stato;
    if (!isAdmin) return stato === "Approvato" || stato === "approvato";
    if (showDaValutare)
      return stato === "DaValutare" || stato === "daValutare" || stato === "da valutare";
    return true;
  });


  return (
    <div className="GruppoPage">
      <h1>Gruppo: {nomeGruppo}</h1>
      {/* Altri contenuti del gruppo */}

        {isAdmin && (
        <button
          onClick={() => setShowDaValutare(!showDaValutare)}
          style={{ marginBottom: "20px" }}
        >
          {showDaValutare ? "Mostra tutti" : "Mostra da valutare"}
        </button>
      )}

      <div className="eventi-grid">
        {filteredEventi.map((ev, index) => (
          <Card
            key={ev.Nome || ev.nome || index}
            nome={ev.Nome || ev.nome}
            descrizione={ev.Descrizione || ev.descrizione}
            imgUrl={ev.ImmagineProfilo || ev.immagineProfilo}
            gruppo={nomeGruppo}
            stato={ev.Stato || ev.stato}
          />
        ))}
      </div>

      <button className="chat-button"onClick={goToChat}>Vai alla Chat</button>
    </div>
  );
};

export default GruppoPage;
