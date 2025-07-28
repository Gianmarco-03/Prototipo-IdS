import React from "react";

const EventInfo = ({ evento }) => {
  if (!evento) return null;

  const partecipanti = (evento.partecipanti || []).map((p) =>
    typeof p === "string" ? p : p.username
  );
  const organizzatori = (evento.organizzatori || []).map((o) =>
    typeof o === "string" ? o : o.username
  );

  return (
    <div className="sidebar-section">
      <img src={evento.immagine} alt="evento" className="sidebar-image" />
      <h3>{evento.nome}</h3>
      <p>{evento.descrizione}</p>
     {evento.gruppo && <p>Gruppo: {evento.gruppo}</p>}
      {evento.dataInizio && (
        <p>
          Inizio: {new Date(evento.dataInizio).toLocaleDateString()}
          {evento.dataFine &&
            ` - Fine: ${new Date(evento.dataFine).toLocaleDateString()}`}
        </p>
      )}
      {organizzatori.length > 0 && (
        <div>
          <strong>Organizzatori:</strong>
          <ul>
            {organizzatori.slice(0, 5).map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </div>
      )}
      {partecipanti.length > 0 && (
        <div>
          <strong>Partecipanti:</strong>
          <ul>
            {partecipanti.slice(0, 5).map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventInfo;
