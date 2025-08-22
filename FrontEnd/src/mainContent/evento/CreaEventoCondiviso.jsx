import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { creaEventoCondiviso } from "../../service/EventoService";
import { getGruppoInfo } from "../../service/SideBarService";
import "./styles/CreaEvento.css";
import "../utente/styles/ModificaUtente.css";

const CreaEventoCondiviso = () => {
  const { nomeGruppo } = useParams();
  const [data, setData] = useState({ Nome: "", Descrizione: "", DataInizio: "", DataFine: "" });
  const [inviti, setInviti] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const fileRef = useRef(null);
  const [errore, setErrore] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImgUrl(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";
    const gruppi = inviti.split(",").map(g => g.trim()).filter(Boolean);
    const valid = [];
    for (const g of gruppi) {
      try {
        const info = await getGruppoInfo(g);
        if (info) valid.push(g);
      } catch {
        // ignore
      }
    }
    try {
      const ok = await creaEventoCondiviso(
        nomeGruppo || "",
        {
          usernamePromotore: username,
          Nome: data.Nome,
          Descrizione: data.Descrizione,
          DataInizio: new Date(data.DataInizio),
          DataFine: data.DataFine ? new Date(data.DataFine) : null,
          Approvato: true,
          nomeGruppo : nomeGruppo
        },
        valid,
        username
      );
      if (ok) navigate(`/evento/${encodeURIComponent(nomeGruppo)}/${encodeURIComponent(data.Nome)}`);
      else setErrore("Creazione fallita");
    } catch {
      setErrore("Errore di connessione");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Nuovo Evento Condiviso</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Titolo</label>
        <input className="auth-input" name="Nome" value={data.Nome} onChange={handleChange} required />
        <label className="auth-label">Descrizione</label>
        <textarea className="auth-input" name="Descrizione" value={data.Descrizione} onChange={handleChange} />
        <label className="auth-label">Data Inizio</label>
        <input type="date" className="auth-input" name="DataInizio" defaultValue={data.DataInizio} onChange={handleChange} required />
        <label className="auth-label">Data Fine</label>
        <input type="date" className="auth-input" name="DataFine" value={data.DataFine} onChange={handleChange} />
        <label className="auth-label">Immagine</label>
        <div
          className="profile-image-wrapper"
          onClick={() => fileRef.current?.click()}
        >
          {imgUrl && (
            <img src={imgUrl} alt="evento" className="profile-image" />
          )}
          <div className="profile-image-overlay">Cambia</div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <label className="auth-label">Invita gruppi (separati da virgola)</label>
        <input className="auth-input" value={inviti} onChange={(e) => setInviti(e.target.value)} />
        <button className="auth-button" type="submit">Crea</button>
      </form>
      {errore && <p style={{color:'red'}}>{errore}</p>}
    </div>
  );
};

export default CreaEventoCondiviso;