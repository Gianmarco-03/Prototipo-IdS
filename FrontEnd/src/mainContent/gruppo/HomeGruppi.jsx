import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NewGroupButton from "./components/NewGroupButton";
import Card from "./components/Card";
import "./styles/HomeGruppi.css"; // solo per container e layout generale
import { creaGruppo } from "../../service/GruppoService";
import { getGruppi } from "../../service/HomeService";
import { useNavigate } from "react-router-dom";

const HomeGruppi = () => {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    getGruppi(username)
      .then((d) => {
        setCardsData(Array.isArray(d.$values) ? d.$values : []);
      })
      .catch(() => setErrore("nessun gruppo disponibile"));
  }, []);

  const filteredCards = cardsData.filter((card) => {
    const name = (card.Nome || card.nome || "").toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesFilter = filter != "" ? name === filter.toLowerCase() : true;
    return matchesSearch && matchesFilter;
  });

  const navigate = useNavigate();
  const handleNewGroup = () => {
    navigate("/nuovo-gruppo");
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
          />
        ))}
      </div>
    </div>
  );
};

export default HomeGruppi;
