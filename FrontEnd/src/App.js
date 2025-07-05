import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./mainContent/gruppo/HomeGruppi";
import GruppoPage from "./mainContent/gruppo/GruppoPage";
import Chat from "./mainContent/chat/Chat";
import Layout from "./Layout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeGruppi />} />
        <Route path="gruppo/:nomeGruppo" element={<GruppoPage />} />
        <Route path="chat/:nomeGruppo" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default App;
