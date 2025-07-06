import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import NewGroupButton from "./components/NewGroupButton";
import Card from "./components/Card";
import "./styles/HomeEventi.css"; // solo per container e layout generale

const cardsData = [
  {
    id: 1,
    nome: "Evento A",
    descrizione: "Descrizione breve dell'evento proposto nel  gruppo A",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+A",
    gruppo : "gruppo A"
  },
  {
    id: 2,
    nome: "Evento B",
    descrizione: "Descrizione più lunga dell'evento proposto nel gruppo B con dettagli extra e contenuto che esce fuori da tutto aljhfspoàihgaoghaeoihgadsojvwpjgpshgslakdmaperjgapjnepaihrjapjfpaerijhgaepmnbpesrajhaejhldakfnbkùapojgrwùprj",
    imgUrl: "/gruppo/images/Gruppo B.png",
    gruppo : "gruppo B"
  },
  {
    id: 3,
    nome: "Evento C",
    descrizione: "Descrizione breve dell'evento proposto nel  gruppo C",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+C",
    gruppo : "gruppo C"
  },
  {
    id: 4,
    nome: "Evento D",
    descrizione: "Descrizione breve dell'evento proposto nel  gruppo D",
    imgUrl: "https://via.placeholder.com/400x200?text=Gruppo+C",
    gruppo : "gruppo D"

  },
];

const HomeEventi = () => {
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
        {filteredCards.map(({ id, nome, descrizione, imgUrl, gruppo }) => (
          <Card
            key={id}
            nome={nome}
            descrizione={descrizione}
            imgUrl={imgUrl}
            gruppo={gruppo}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeEventi;
