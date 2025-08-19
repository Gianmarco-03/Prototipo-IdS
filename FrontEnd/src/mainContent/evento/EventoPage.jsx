import React, { useEffect, useState } from "react";
import { getEventoInfo } from "../../service/SideBarService";
import { partecipaEvento, abbandonaEvento } from "../../service/EventoService";
import "./styles/EventoPage.css";import { useNavigate, useParams } from "react-router-dom";
import "./styles/EventoPage.css"
import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";


const BACKEND_URL = "http://localhost:3000";

const EventoPage = () => {
  const navigate = useNavigate();
  const { nomeEvento, nomeGruppo } = useParams();
  const [evento, setEvento] = useState(null);
  const [isPartecipante, setIsPartecipante] = useState(false);

  useEffect(() => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    getEventoInfo(nomeEvento, nomeGruppo).then((ev) => {
      setEvento(ev);
      const list = ev?.partecipanti?.$values || ev?.partecipanti || [];
      const names = list.map((p) => (typeof p === "string" ? p : p.username));
      setIsPartecipante(names.includes(username));
    });
  }, [nomeEvento, nomeGruppo]);


  const goToChat = () => {
    navigate(`/chat/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(nomeEvento)}`);
   };

  const handlePartecipa = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await partecipaEvento(nomeGruppo,nomeEvento, username);
    setIsPartecipante(true);
    
  };

  const handleAbbandona = async () => {
    const username =
      sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    await abbandonaEvento(nomeGruppo,nomeEvento, username);
    setIsPartecipante(false);
  };

  const nome = evento?.nome?.split("/").pop() || nomeEvento;
  const img = evento?.immagineProfilo || evento?.ImmagineProfilo;
  const descr = evento?.descrizione || evento?.Descrizione;


  return (
   <div className="evento-page">
      <div className="evento-header">
      <div className="evento-image-container">
        <img
          src={img || `${BACKEND_URL}/images/Def_gropic.png`}
          alt="evento"
          className="evento-image"
        />
      </div>
  <div className="evento-header shaped">
    {/* Sfondo 6 lati con angoli morbidi (S) */}
    <svg
      className="shape-layer"
      viewBox="0 0 150 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* 1) RIEMPIMENTO */}
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

      {/* Bordo superiore */}
      <path
        d="M 0 0 H 150"
        fill="none"
        stroke="white"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="butt"
      />

      {/* Curva 1: da (40,20) a (36,36) */}
      <path
        d="M 40 20 A 4 16 0 0 0 36 36"
        fill="none"
        stroke="white"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="butt"
      />

      {/* (opzionale) Tratto verticale centrale: da (36,36) a (36,44) */}
      <path
        d="M 36 36 V 44"
        fill="none"
        stroke="white"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="butt"
      />

      {/* Curva 2: da (36,44) a (32,60) */}
      <path
        d="M 36 44 A 4 16 0 0 1 32 60"
        fill="none"
        stroke="white"
        strokeWidth={3}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="butt"
      />

      {/* (Esempi di altri lati, abilita solo quelli che vuoi) */}
      {/* Destra: M 150 0 V 20 */}
      {<path d="M 150 0 V 20" fill="none" stroke="white" strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinecap="butt" />}

      {/* Sinistra: M 0 0 V 60 */}
      {<path d="M 0 0 V 60" fill="none" stroke="white" strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinecap="butt" /> }

      {/* Basso: M 32 60 H 0 */}
      {<path d="M 32 60 H 0" fill="none" stroke="white" strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinecap="butt" /> }
      {<path d="M 40 20 H 150" fill="none" stroke="white" strokeWidth={3} vectorEffect="non-scaling-stroke" strokeLinecap="butt" /> }
    </svg>

    
    <div className="evento-title-box">
      <h1>{nome}</h1>
    </div>

    {isPartecipante ? (
      <button className="evento-action" onClick={handleAbbandona}>
        <UserMinusIcon className="event-icon" width={30} height={30} />
      </button>
    ) : (
      <button className="evento-action" onClick={handlePartecipa}>
        <UserPlusIcon className="event-icon" width={30} height={30} />
      </button>
    )}
    </div>
  </div>
      <div className="evento-description-box">
        {descr}
      </div>
      <div className="chat-button-conteiner">
        <svg
          className="shape-layer"
          viewBox="0 0 150 60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* 1) RIEMPIMENTO */}
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
          {/* Curva 1: da (114,16) a (118,0) */}
          <path
            d="M 114 16 A 4 16 0 0 1 118 0"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />
           {/* (opzionale) Tratto verticale centrale: da (36,36) a (36,44) */}
          <path
            d="M 114 24 V 16"
            fill="none"
            stroke="white"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="butt"
          />

          {/* Curva 2: da (36,44) a (32,60) */}
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

export default EventoPage;
