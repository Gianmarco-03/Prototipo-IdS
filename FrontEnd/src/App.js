import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeGruppi from "./gruppo/HomeGruppi";
import GruppoPage from "./gruppo/GruppoPage";
import Chat from "./chat/Chat";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeGruppi />} />
      <Route path="/gruppo/:nomeGruppo" element={<GruppoPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default App;
