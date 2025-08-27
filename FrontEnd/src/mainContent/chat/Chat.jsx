import React, { useState, useEffect } from "react";
import connection from "../../service/ChatService";
import MessaggioCard from "./components/MessaggioCard";
import "./styles/Chat.css";
import { useParams } from "react-router-dom";
import { checkAdmin } from "../../service/GruppoService";
import { checkOrganizzatore } from "../../service/EventoService";

const Chat = () => {
  const { nomeGruppo } = useParams();
  const {nomeEvento } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [user, setUser] = useState("");
  const [canDelete, setCanDelete] = useState(false);

  let idChat = nomeGruppo;
  if (nomeEvento)
    idChat = nomeGruppo+ "/" + nomeEvento;

  useEffect(() => {
    let savedUser = sessionStorage.getItem("user");
    if (!savedUser) {
      savedUser = "Utente_" + Math.floor(Math.random() * 1000);
      sessionStorage.setItem("user", savedUser);
    }
    setUser(savedUser);

    if (nomeEvento) {
      checkOrganizzatore(nomeEvento, nomeGruppo, savedUser).then(setCanDelete);
    } else {
      checkAdmin(nomeGruppo, savedUser).then(setCanDelete);
    }

    connection
      .start()
      .then(() => {
          console.log("SignalR connected")
          connection.invoke("JoinGroup", idChat)
      })
      .catch((err) => console.error("SignalR connection error:", err));

      

    connection.on("ReceiveMessage", (id, user, message, time) => {
      setMessages((msgs) => [...msgs, { user,time, id, message,  }]);
    });

    connection.on("MessageDeleted", (id) => {
      setMessages((msgs) => msgs.filter((m) => m.id !== id));
    });

    return () => {
      connection.off("ReceiveMessage");
      connection.off("MessageDeleted");
      connection.stop();
    };
  }, []);

  const sendMessage = () => {
    if (inputMsg.trim()) {
      // Puoi modificare qui se vuoi un utente fisso o dinamico
      connection.invoke("SendMessage", idChat, user, inputMsg).catch(console.error);

    }
  };

  const deleteMessage = (id) => {
    connection.invoke("DeleteMessage", idChat, id).catch(console.error);
  };

  const renderMessages = () => {
    const elements = [];
    let lastDate = null;
    messages.forEach((m, i) => {
      const date = new Date(m.time).toLocaleDateString();
      if (date !== lastDate) {
        elements.push(
          <div key={`sep-${date}-${i}`} className="separator day">
            {date}
          </div>
        );
        lastDate = date;
      }
      elements.push(
        <MessaggioCard
          key={m.id}
          user={m.user}
          message={m.message}
          time={m.time}
          canDelete={canDelete || m.user === user}
          onDelete={() => deleteMessage(m.id)}
        />
      );
    });
    return elements;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">{renderMessages()}</div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="chat-input"
        />
        <button onClick={sendMessage} className="invio">
          Invia
        </button>
      </div>
    </div>
  );
};

export default Chat;
