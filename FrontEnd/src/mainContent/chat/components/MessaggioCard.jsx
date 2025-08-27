import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import "../styles/MessaggioCard.css";

const MessaggioCard = ({ user, message, time, canDelete, onDelete }) => {
  const currentUser = sessionStorage.getItem("user");
  const isOwnMessage = user === currentUser;
  const formattedTime = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className={`MessaggioCard ${isOwnMessage ? "mio" : "altro"}`}>
      <div className="messaggio-card">
        <div className="messaggio-header">
          <div className={`messaggio-nome ${isOwnMessage ? "mio" : "altro"}`}>{user}</div>
          <div className="header-right">
            <div className="messaggio-orario">{formattedTime}</div>
            {canDelete && (
              <TrashIcon className="delete-icon" onClick={onDelete} />
            )}
          </div>
        </div>
        <div className={`separator`}></div>
        <div className={`messaggio-contenuto ${isOwnMessage ? "mio" : "altro"}`}>{message}</div>
      </div>
    </div>
  );
};

export default MessaggioCard;