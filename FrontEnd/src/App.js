import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi";
import HomeEventi from "./mainContent/evento/HomeEventi";
import GruppoPage from "./mainContent/gruppo/GruppoPage";
import EventoPage from "./mainContent/evento/EventoPage";
import Chat from "./mainContent/chat/Chat";
import Layout from "./Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeGruppi />} />
        <Route path="gruppo/:nomeGruppo" element={<GruppoPage />} />
        <Route path="evento/:nomeGruppo/:nomeEvento" element={<EventoPage />} />
        <Route path="chat/:nomeGruppo" element={<Chat />} />
        <Route path="chat/:nomeGruppo/:nomeEvento" element={<Chat />} />
        <Route path="/eventi" element={<HomeEventi />} />
      </Route>
    </Routes>
  );
};

export default App;
