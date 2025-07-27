import React from "react";

const EventInfo = ({ evento }) => {
  if (!evento) return null;
  return (
    <div className="sidebar-section">
      <img src={evento.immagine} alt="evento" className="sidebar-image" />
      <h3>{evento.nome}</h3>
      <p>{evento.descrizione}</p>
      <p>Gruppo: {evento.gruppo}</p>
      <ul>
        {evento.partecipanti?.slice(0, 5).map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventInfo;