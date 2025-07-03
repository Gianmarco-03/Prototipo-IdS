import React, { useState } from "react";
import SearchBar from "./componentsGruppo/SearchBar";
import NewGroupButton from "./componentsGruppo/NewGroupButton";
import Card from "./componentsGruppo/Card";
import "./HomeGruppo.css"; // solo per container e layout generale

const cardsData = [
  {
    id: 1,
    nome: "Gruppo A",
    descrizione: "Descrizione breve del gruppo A",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+A",
  },
  {
    id: 2,
    nome: "Gruppo B",
    descrizione: "Descrizione più lunga del gruppo B con dettagli extra",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+B",
  },
  {
    id: 3,
    nome: "Gruppo C",
    descrizione: "Descrizione breve del gruppo C",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+C",
  },
];

const App = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredCards = cardsData.filter((card) => {
    const matchesSearch = card.nome.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter ? card.nome === filter : true;
    return matchesSearch && matchesFilter;
  });

  const handleNewGroup = () => {
    alert("Funzione 'Nuovo Gruppo' da implementare!");
  };

  return (
    <div className="container">
      <div className="topBar">
        <SearchBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
        <NewGroupButton onClick={handleNewGroup} />
      </div>

      <div className="cardsContainer">
        {filteredCards.map(({ id, nome, descrizione, imgUrl }) => (
          <Card
            key={id}
            nome={nome}
            descrizione={descrizione}
            imgUrl={imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
