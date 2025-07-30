import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NewGroupButton from "./components/NewGroupButton";
import Card from "./components/Card";
import "./styles/HomeEventi.css"; // solo per container e layout generale
import { creaEvento } from "../../service/EventoService";
import { getEventi } from "../../service/HomeService";
import { useNavigate } from "react-router-dom";



const HomeEventi = () => {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    getEventi(username)
      .then((d) => {
        setCardsData(d.$values || []);
        if (!d || d.$values.length === 0) setErrore("nessun evento disponibile");
      })
      .catch(() => setErrore("nessun evento disponibile"));
  }, []);useEffect(() => {
    const username = sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    getEventi(username)
      .then((d) => {
          setCardsData(Array.isArray(d.$values) ? d.$values : []);
      })
      .catch(() => setErrore("nessun evento disponibile"));
  }, []);

  const filteredCards = cardsData.filter((card) => {
    const name = (card.Nome || card.nome || "").toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesFilter = filter ? name === filter.toLowerCase() : true;
    return matchesSearch && matchesFilter;
  });

  const navigate = useNavigate();
  const handleNewGroup = () => {
    navigate("/nuovo-evento");
  };

  return (
    <div className="container">
      <div className="topBarWithButton">
        <div className="newGroupBar">
  <NewGroupButton onClick={handleNewGroup} />
</div>

  <SearchBar
    search={search}
    setSearch={setSearch}
    filter={filter}
    setFilter={setFilter}
  />
</div>



      <div className="cardsContainer">
        {filteredCards.length === 0 && errore && <p>{errore}</p>}
        {filteredCards.map((g, index) => (          
          <Card
            key={g.Nome || g.nome || index}
            nome={g.Nome || g.nome}
            descrizione={g.Descrizione || g.descrizione}
            imgUrl={g.ImmagineProfilo || g.immagineProfilo}
            gruppo={g.gruppoId}
            stato={g.stato}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeEventi;
