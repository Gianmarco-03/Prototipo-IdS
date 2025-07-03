// MessaggioCard.jsx
import React from "react";
import "../styles/MessaggioCard.css";

const MessaggioCard = ({ user, message }) => {
    const currentUser = sessionStorage.getItem("username");
    const isOwnMessage = user === currentUser;
  return (
    <div className={`MessaggioCard ${isOwnMessage ? "mio" : "altro"}`}>
      <div className="messaggio-card">
      <div className={`messaggio-nome ${isOwnMessage ? "mio" : "altro"}`}>{user}</div>
      <hr />
      <div className={`messaggio-contenuto ${isOwnMessage ? "mio" : "altro"}`}>{message}</div>
    </div>
  </div>
  );
};

export default MessaggioCard;
