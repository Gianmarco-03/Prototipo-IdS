import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi";
import HomeEventi from "./mainContent/evento/HomeEventi";
import GruppoPage from "./mainContent/gruppo/GruppoPage";
import EventoPage from "./mainContent/evento/EventoPage";
import CreaGruppo from "./mainContent/gruppo/CreaGruppo";
import CreaEvento from "./mainContent/evento/CreaEvento";
import Chat from "./mainContent/chat/Chat";
import Layout from "./Layout";
import Login from "./Auth/Login/Login";
import Registrazione from "./Auth/Registrazione/Registrazione";
import RequireAuth from "././Auth/RequireAuth";


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
              <Route path="chat/:nomeGruppo" element={<Chat />} />
              <Route path="chat/:nomeGruppo/:nomeEvento" element={<Chat />} />
              <Route path="nuovo-gruppo" element={<CreaGruppo />} />
              <Route path="nuovo-evento" element={<CreaEvento />} />
            </Route>

            <Route path="eventi" element={<HomeEventi />} /> {/* Pubblica */}
          </Route>
        </Routes>

  );
};

export default App;
