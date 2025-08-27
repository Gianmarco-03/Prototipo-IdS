import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NewGroupButton from "./components/NewGroupButton";
import Card from "./components/Card";
import "./styles/HomeGruppi.css"; // solo per container e layout generale
import { creaGruppo } from "../../service/GruppoService";
import { getGruppi } from "../../service/HomeService";
import { findGruppi } from "../../service/SearchService";
import { useNavigate } from "react-router-dom";

const HomeGruppi = () => {
  const [cardsData, setCardsData] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    includeDescription: false,
    minPartecipanti: "",
    maxPartecipanti: "",
  });
  const [errore, setErrore] = useState("");

  useEffect(() => {
    const username =
        sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

      const hasFilters =
        search.trim() !== "" ||
        filters.includeDescription ||
        filters.minPartecipanti ||
        filters.maxPartecipanti;

      const fetchData = async () => {
        try {
          const d = hasFilters
            ? await findGruppi(
                search,
                filters.includeDescription,
                filters.minPartecipanti ? Number(filters.minPartecipanti) : null,
                filters.maxPartecipanti ? Number(filters.maxPartecipanti) : null
              )
            : await getGruppi(username);
          setCardsData(Array.isArray(d.$values) ? d.$values : []);
          if (!d || (d.$values || []).length === 0) setErrore("nessun gruppo disponibile");
        } catch {
          setErrore("nessun gruppo disponibile");
        }
      };

      fetchData();
  }, [search, filters]);

  const filteredCards = cardsData;

  const navigate = useNavigate();
  const handleNewGroup = () => {
    navigate("/nuovo-gruppo");
  };

  return (
    <div className="container">
      <div className="home-header shaped">
        <svg
          className="shape-layer-HG"
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
          filters={filters}
          setFilters={setFilters}
        />
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
