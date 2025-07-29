import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { creaGruppo } from "../../service/GruppoService";
import "./styles/CreaGruppo.css";

const CreaGruppo = () => {
  const [data, setData] = useState({ Nome: "", Descrizione: "" });
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
      const ok = await creaGruppo(data, username);
      if (ok) navigate(`/gruppo/${data.Nome}`);
      else setErrore("Creazione fallita");
    } catch (err) {
      setErrore("Errore di connessione");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Nuovo Gruppo</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Nome</label>
        <input className="auth-input" name="Nome" value={data.Nome} onChange={handleChange} required />
        <label className="auth-label">Descrizione</label>
        <textarea className="auth-input" name="Descrizione" value={data.Descrizione} onChange={handleChange} />
        <button className="auth-button" type="submit">Crea</button>
      </form>
      {errore && <p style={{color:'red'}}>{errore}</p>}
    </div>
  );
};

export default CreaGruppo;
