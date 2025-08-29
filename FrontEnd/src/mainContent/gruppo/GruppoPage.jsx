import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/GruppoPage.css";
import Card from "../evento/components/Card";
import "../evento/styles/SearchBar.css";
import SearchBar from "../evento/components/SearchBar";
import {
  checkAdmin,
  getEventiGruppo,
  findEventiGruppo,
  partecipaGruppo,
  abbandonaGruppo,
  getInvitiPerGruppo
} from "../../service/GruppoService";
import { getGruppoInfo } from "../../service/SideBarService";
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";

const GruppoPage = () => {
  const navigate = useNavigate();
  const { nomeGruppo } = useParams();
  const [eventi, setEventi] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDaValutare, setShowDaValutare] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    includeDescription: false,
    minPartecipanti: "",
    maxPartecipanti: "",
    startDate: "",
    endDate: "",
  });
  const [isPartecipante, setIsPartecipante] = useState(false);

    useEffect(() => {
    sessionStorage.setItem("gruppo", nomeGruppo);
    sessionStorage.removeItem("evento");
  }, [nomeGruppo]);

  const fetchData = async () => {
    const eventiPromise =
      search.trim() === ""
        ? getEventiGruppo(nomeGruppo)
        : findEventiGruppo(nomeGruppo, search);
    const invitiPromise = await getInvitiPerGruppo(nomeGruppo)
    const [d, inv] = await Promise.all([eventiPromise, invitiPromise]);
    const list = d?.$values || d || [];
    const invList = inv ? (Array.isArray(inv.$values) ? inv.$values : inv) : [];
    const invCards = invList.map((i) => ({
      Nome: i.eventoCondiviso?.Nome || i.eventoCondivisoNome || i.eventoCondivisoNome,
      Descrizione:
        i.eventoCondiviso?.Descrizione || i.eventoCondiviso?.descrizione,
      ImmagineProfilo:
        i.eventoCondiviso?.ImmagineProfilo ||
        i.eventoCondiviso?.immagineProfilo,
      nomeGruppo: i.DaGruppo || i.daGruppo,
      accettato: i.Accettato ?? i.accettato,
      invito: true,
    }));
    setEventi([...list, ...invCards]);
  };


  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

    fetchData();

    checkAdmin(nomeGruppo, username).then(setIsAdmin);

    getGruppoInfo(nomeGruppo).then((g) => {
      const list = g?.partecipanti?.$values || g?.partecipanti || [];
      const names = list.map((p) => (typeof p === "string" ? p : p.username));
      setIsPartecipante(names.includes(username));
    });
  }, [nomeGruppo, search]);

  const goToChat = () => {
    if(isPartecipante)
      navigate(`/chat/${encodeURIComponent(nomeGruppo)}`);
    else alert("devi far parte del gruppo per accedere alla chat");

  };

  const goToCreaEvento = () => {
    if(isPartecipante)
      navigate('/nuovo-evento', { state: { gruppo: nomeGruppo } });
    else 
      alert("devi far parte del gruppo per proporre un evento");
  };


  const handlePartecipa = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await partecipaGruppo(nomeGruppo, username);
    setIsPartecipante(true);
  };

  const handleAbbandona = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await abbandonaGruppo(nomeGruppo, username);
    setIsPartecipante(false);
  };

  const filteredEventi = eventi.filter((ev) => {
    let approvato = false;
    if (ev.invito )
      approvato = ev.accettato;
    else approvato = ev.Approvato ?? ev.approvato;
    if (!isAdmin) return approvato;
    if (showDaValutare) return approvato !== true;
    return true;
  });


  return (
    <div className="gruppo-page">
      <div className="gruppo-header shaped">
        <svg
          className="shape-layer"
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
        <div className="gruppo-title-box">
          <h1>{nomeGruppo}</h1>
        </div>
        {isPartecipante ? (
          <button className="gruppo-action" onClick={handleAbbandona}>
            <UserMinusIcon className="group-icon" width={30} height={30} />
          </button>
        ) : (
          <button className="gruppo-action" onClick={handlePartecipa}>
            <UserPlusIcon className="group-icon" width={30} height={30} />
          </button>
        )}
        
      </div>
      <SearchBar
        style={{ marginTop: '4rem' }}
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />
      {isPartecipante && (
          <button   
            className="gruppo-action create-event-button"
            onClick={goToCreaEvento}>
            Crea Evento
          </button>
        )}
        {isAdmin && (
          <div className="toggle-valutazione">
            <div className="toggle-switch">
              <div className={`switch-bg ${showDaValutare ? "right" : "left"}`}></div>
              <div
                className={`option ${!showDaValutare ? "active" : ""}`}
                onClick={() => setShowDaValutare(false)}
              >
                Tutti
              </div>
              <div
                className={`option ${showDaValutare ? "active" : ""}`}
                onClick={() => setShowDaValutare(true)}
              >
                Da valutare
              </div>
            </div>
          </div>
        )}


      <div className="eventi-grid">
        {filteredEventi.map((ev, index) => {
          const gruppoEv = ev.nomeGruppo || ev.NomeGruppo || nomeGruppo;
          return (
            <Card
              key={ev.Nome || ev.nome || index}
              nomeEvento={ev.nome || ev.Nome}
              descrizione={ev.Descrizione || ev.descrizione}
              imgUrl={ev.ImmagineProfilo || ev.immagineProfilo}
              gruppo={gruppoEv}
              approvato={ev.Approvato ?? ev.approvato}
              isAdmin={isAdmin}
              condiviso={gruppoEv !== nomeGruppo}
              onAction={fetchData}
              isInvito={ev.invito}
              accettato={ev.accettato}
            />
          );
        })}
      </div>
      <div className="chat-button-conteiner">
        <svg
          className="shape-layer"
          viewBox="0 0 150 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            id="shapePath"
            d="
              M 0 40
              H 110
              A 4 16 0 0 0 114 24
              V 16
              A 4 16 0 0 1 118 0
              H 150
              V 60
              H 0
            "
            fill="var(--header-bg, #2c2f48)"
          />
          <path
            d="M 118 0 H 150"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 114 16 A 4 16 0 0 1 118 0"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 114 24 V 16"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 110 40 A 4 16 0 0 0 114 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
          <path
            d="M 110 40 H 0"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
        </svg>
        <button className="chat-button" onClick={goToChat}>
          Vai alla Chat
        </button>
      </div>
    </div>
  );
};

export default GruppoPage;
