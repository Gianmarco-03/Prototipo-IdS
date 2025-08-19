import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NewGroupButton from "./components/NewGroupButton";
import Card from "./components/Card";
import "./styles/HomeEventi.css"; // solo per container e layout generale
import { getEventi, findEventi } from "../../service/HomeService";
import { useNavigate } from "react-router-dom";



const HomeEventi = () => {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

    const fetchData = async () => {
      try {
        const d =
          search.trim() === ""
            ? await getEventi(username)
            : await findEventi(username, search);
        const list = Array.isArray(d.$values) ? d.$values : [];
        setCardsData(list);
        if (!d || list.length === 0) setErrore("nessun evento disponibile");
      } catch {
        setErrore("nessun evento disponibile");
      }
    };

    fetchData();
  }, [search]);

  const filteredCards = cardsData.filter((card) => {
    const name = (card.Nome || card.nome || "").toLowerCase();
    const matchesFilter = filter ? name === filter.toLowerCase() : true;
    return matchesFilter;
  });

  const navigate = useNavigate();
  const handleNewGroup = () => {
    navigate("/nuovo-evento");
  };

  return (
    <div className="container">
            <div className="home-header shaped">
        <svg
          className="shape-layer-HE"
          viewBox="0 0 150 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            id="shapePath"
            d="
              M 0 0
              H 150
              V 20
              H 40
              A 4 16 0 0 0 36 36
              V 44
              A 4 16 0 0 1 32 60
              H 0
              Z
            "
            fill="var(--header-bg, #2c2f48)"
          />
          <path
            d="M 0 0 H 150"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 40 20 A 4 16 0 0 0 36 36"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 36 36 V 44"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 36 44 A 4 16 0 0 1 32 60"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 150 0 V 20"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 0 0 V 60"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 32 60 H 0"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 40 20 H 150"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
        </svg>
      </div>
       <NewGroupButton onClick={handleNewGroup} />
        <SearchBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      <div className="cardsContainer">
        {filteredCards.length === 0 && errore && <p>{errore}</p>}
        {filteredCards.map((g, index) => (          
          <Card
            key={g.Nome || g.nome || index}
            nomeEvento={g.Nome || g.nome}
            descrizione={g.Descrizione || g.descrizione}
            imgUrl={g.ImmagineProfilo || g.immagineProfilo}
            gruppo={g.nomeGruppo}
            approvato={g.approvato}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeEventi;
