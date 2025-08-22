import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi";
import HomeEventi from "./mainContent/evento/HomeEventi";
import GruppoPage from "./mainContent/gruppo/GruppoPage";
import EventoPage from "./mainContent/evento/EventoPage";
import CreaGruppo from "./mainContent/gruppo/CreaGruppo";
import CreaEvento from "./mainContent/evento/CreaEvento";
import CreaEventoCondiviso from "./mainContent/evento/CreaEventoCondiviso";
import Chat from "./mainContent/chat/Chat";
import Layout from "./Layout";
import Login from "./Auth/Login/Login";
import Registrazione from "./Auth/Registrazione/Registrazione";
import RequireAuth from "././Auth/RequireAuth";
import ModificaUtente from "./mainContent/utente/ModificaUtente";
import ModificaGruppo from "./mainContent/gruppo/ModificaGruppo";
import ModificaEvento from "./mainContent/evento/ModificaEvento";


const App = () => {
  return (
    <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrazione" element={<Registrazione />} />

          {/* Private Routes under Layout */}
          <Route path="/" element={<Layout />}>

            <Route element={<RequireAuth />}>
              <Route index element={<HomeGruppi />} />
              <Route path="gruppo/:nomeGruppo" element={<GruppoPage />} />
              <Route path="evento/:nomeGruppo/:nomeEvento" element={<EventoPage />} />
              <Route path="gruppo/:nomeGruppo/modifica" element={<ModificaGruppo />} />
              <Route path="evento/:nomeGruppo/:nomeEvento/modifica" element={<ModificaEvento />} />
              <Route path="chat/:nomeGruppo" element={<Chat />} />
              <Route path="chat/:nomeGruppo/:nomeEvento" element={<Chat />} />
              <Route path="nuovo-gruppo" element={<CreaGruppo />} />
              <Route path="nuovo-evento" element={<CreaEvento />} />
              <Route path="gruppo/:nomeGruppo/nuovo-evento-condiviso" element={<CreaEventoCondiviso />} />
              <Route path="profilo" element={<ModificaUtente />} />
            </Route>

            <Route path="eventi" element={<HomeEventi />} /> {/* Pubblica */}
          </Route>
        </Routes>

  );
};

export default App;
