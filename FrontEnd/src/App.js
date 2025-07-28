import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi";
import HomeEventi from "./mainContent/evento/HomeEventi";
import GruppoPage from "./mainContent/gruppo/GruppoPage";
import EventoPage from "./mainContent/evento/EventoPage";
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
            <Route index element={<HomeGruppi />} />

            <Route element={<RequireAuth />}>
              <Route path="gruppo/:nomeGruppo" element={<GruppoPage />} />
              <Route path="evento/:nomeGruppo/:nomeEvento" element={<EventoPage />} />
              <Route path="chat/:nomeGruppo" element={<Chat />} />
              <Route path="chat/:nomeGruppo/:nomeEvento" element={<Chat />} />
            </Route>

            <Route path="eventi" element={<HomeEventi />} /> {/* Pubblica */}
          </Route>
        </Routes>

  );
};

export default App;
