import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/GruppoPage.css";
import Card from "../evento/components/Card";
import "../evento/styles/SearchBar.css";
import SearchBar from "../evento/components/SearchBar";
import { checkAdmin, getEventiGruppo, findEventiGruppo } from "../../service/GruppoService";

const GruppoPage = () => {
  const navigate = useNavigate();
  const { nomeGruppo } = useParams();
  const [eventi, setEventi] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDaValutare, setShowDaValutare] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

    const fetchData = async () => {
      const d =
        search.trim() === ""
          ? await getEventiGruppo(nomeGruppo)
          : await findEventiGruppo(nomeGruppo, search);
        const list = d.$values || d || [];
       setEventi(list);
    };

    fetchData();

    checkAdmin(nomeGruppo, username).then((g) => {
      setIsAdmin(g);
    });
  }, [nomeGruppo, search]);

  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}`);
  };

  const filteredEventi = eventi.filter((ev) => {
    const approvato = ev.Approvato ?? ev.approvato;
    if (!isAdmin) return approvato;
    if (showDaValutare) return approvato === false;
    return true;
  });


  return (
    <div className="GruppoPage">
      <h1>Gruppo: {nomeGruppo}</h1>
      <SearchBar search={search} setSearch={setSearch} filter="" setFilter={() => {}} />
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
            nomeEvento={ev.nome}
            descrizione={ev.Descrizione || ev.descrizione}
            imgUrl={ev.ImmagineProfilo || ev.immagineProfilo}
            gruppo={nomeGruppo}
            approvato={ev.Approvato ?? ev.approvato}
          />
        ))}
      </div>

      <button className="chat-button"onClick={goToChat}>Vai alla Chat</button>
    </div>
  );
};

export default GruppoPage;
