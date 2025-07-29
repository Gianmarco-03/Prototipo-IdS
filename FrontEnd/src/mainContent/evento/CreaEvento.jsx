import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creaEvento } from "../../service/EventoService";
import "./styles/CreaEvento.css";

const CreaEvento = () => {
  const [data, setData] = useState({ Nome: "", Descrizione: "", DataInizio: "", DataFine: "", GruppoId: "" });
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    try {
      const ok = await creaEvento({
        Nome: data.Nome,
        Descrizione: data.Descrizione,
        DataInizio: new Date(data.DataInizio),
        DataFine: data.DataFine ? new Date(data.DataFine) : null,
        GruppoId: data.GruppoId || null
      }, username);
      if (ok) navigate(`/evento/${encodeURIComponent(data.GruppoId)}/${encodeURIComponent(data.Nome)}`);
      else setErrore("Creazione fallita");
    } catch (err) {
      setErrore("Errore di connessione");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Nuovo Evento</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Titolo</label>
        <input className="auth-input" name="Nome" value={data.Nome} onChange={handleChange} required />
        <label className="auth-label">Descrizione</label>
        <textarea className="auth-input" name="Descrizione" value={data.Descrizione} onChange={handleChange} />
        <label className="auth-label">Data Inizio</label>
        <input type="date" className="auth-input" name="DataInizio" value={data.DataInizio} onChange={handleChange} required />
        <label className="auth-label">Data Fine</label>
        <input type="date" className="auth-input" name="DataFine" value={data.DataFine} onChange={handleChange} />
        <label className="auth-label">Gruppo</label>
        <input className="auth-input" name="GruppoId" value={data.GruppoId} onChange={handleChange} />
        <button className="auth-button" type="submit">Crea</button>
      </form>
      {errore && <p style={{color:'red'}}>{errore}</p>}
    </div>
  );
};

export default CreaEvento;