import React, { useState, useEffect } from "react";
import connection from "./ChatService";
import MessaggioCard from "./components/MessaggioCard"
import "./styles/Chat.css";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { nomeGruppo } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [user, setUser] = useState("");


  useEffect(() => {
     // Simulazione sessione utente
    let savedUser = sessionStorage.getItem("username");
    if (!savedUser) {
      savedUser = "Utente_" + Math.floor(Math.random() * 1000);
      sessionStorage.setItem("username", savedUser);
    }
    setUser(savedUser);

    connection
      .start()
      .then(() => {
          console.log("SignalR connected")
          connection.invoke("JoinGroup", nomeGruppo)
      })
      .catch((err) => console.error("SignalR connection error:", err));

      

    connection.on("ReceiveMessage", (user, message) => {
      setMessages((msgs) => [...msgs, { user, message }]);
    });

    return () => {
      connection.off("ReceiveMessage");
      connection.stop();
    };
  }, []);

  const sendMessage = () => {
    if (inputMsg.trim()) {
      // Puoi modificare qui se vuoi un utente fisso o dinamico
      connection.invoke("SendMessage",nomeGruppo,user, inputMsg).catch(console.error);
      setInputMsg("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <MessaggioCard key={i} user={m.user} message={m.message} />
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-button">
          Invia
        </button>
      </div>
    </div>
  );
};

export default Chat;
