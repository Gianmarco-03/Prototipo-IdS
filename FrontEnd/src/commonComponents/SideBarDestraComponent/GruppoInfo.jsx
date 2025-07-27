import React from "react";

const GroupInfo = ({ gruppo }) => {
  if (!gruppo) return null;
  return (
    <div className="sidebar-section">
      <img src={gruppo.immagine} alt="gruppo" className="sidebar-image" />
      <h3>{gruppo.nome}</h3>
      <p>{gruppo.descrizione}</p>
      <ul>
        {gruppo.partecipanti?.slice(0, 5).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupInfo;