import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getEvento,
  updateEvento,
  uploadImmagine,
  checkOrganizzatore,
} from "../../service/EventoService";
import "./styles/ModificaEvento.css";

const ModificaEvento = () => {
  const { nomeEvento, nomeGruppo } = useParams();
  const username =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const [file, setFile] = useState(null);
  const [evento, setEvento] = useState(null);
  const [messaggio, setMessaggio] = useState("");
  const [autorizzato, setAutorizzato] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loadingEvento, setLoadingEvento] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!username) {
        setMessaggio("Utente non trovato");
        setLoadingAuth(false);
        setLoadingEvento(false);
        return;
      }
      try {
        const ok = await checkOrganizzatore(nomeEvento, nomeGruppo, username);
        if (!alive) return;
        setAutorizzato(ok);
        setLoadingAuth(false);
        if (!ok) {
          setMessaggio("Non autorizzato");
          return;
        }
        const ev = await getEvento(nomeGruppo, nomeEvento);
        if (!alive) return;
        if (ev) setEvento(ev);
      } catch (e) {
        if (!alive) return;
        setMessaggio("Errore di caricamento");
      } finally {
        if (alive) setLoadingEvento(false);
      }
    })();
    return () => { alive = false; };
  }, [nomeEvento, nomeGruppo, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autorizzato || !evento) return;
    try {
      let nextImgUrl = evento.immagineProfilo;
      if (file) {
        const res = await uploadImmagine(nomeEvento, nomeGruppo, file);
        nextImgUrl = res;
        setEvento(prev => prev ? { ...prev, immagineProfilo: res } : prev);
      }
      const payload = { ...evento, immagineProfilo: nextImgUrl };
      await updateEvento(payload);
      setEvento(payload);
      setMessaggio("Evento aggiornato");
    } catch (err) {
      setMessaggio("Errore durante l'aggiornamento");
    }
  };

  // ---- RENDER GUARDS ----
  if (loadingAuth || (autorizzato && loadingEvento)) {
    return <div className="auth-container">Caricamento…</div>;
  }
  if (!autorizzato) {
    return <div className="auth-container">{messaggio || "Non autorizzato"}</div>;
  }
  if (!evento) {
    return <div className="auth-container">Evento non trovato</div>;
  }

  // helper per date "YYYY-MM-DD"
  const asDateInput = (v) => (v ? String(v).slice(0, 10) : "");

  return (
    <div className="auth-container">
      <h2 className="auth-title">Modifica Evento</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Nome Evento</label>
        <input className="auth-input" value={nomeEvento} disabled />
        <label className="auth-label">Gruppo</label>
        <input className="auth-input" value={nomeGruppo} disabled />

        <label className="auth-label">Immagine</label>
        <div
          className="profile-image-wrapper"
          onClick={() => fileInputRef.current?.click()}
        >
          {evento.immagineProfilo ? (
            <img src={evento.immagineProfilo} alt="Evento" className="profile-image" />
          ) : (
            <div className="profile-image placeholder">Scegli immagine</div>
          )}
          <div className="profile-image-overlay">Cambia</div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setFile(f);
              const preview = URL.createObjectURL(f);
              setEvento(prev => prev ? { ...prev, immagineProfilo: preview } : prev);
            }
          }}
        />

        <label className="auth-label">Descrizione</label>
        <textarea
          className="auth-input"
          value={evento.descrizione ?? ""}
          onChange={(e) =>
            setEvento(prev => ({ ...prev, descrizione: e.target.value }))
          }
        />

        <label className="auth-label">Data Inizio</label>
        <input
          type="date"
          className="auth-input"
          value={asDateInput(evento.dataInizio)}
          onChange={(e) =>
            setEvento(prev => ({ ...prev, dataInizio: e.target.value }))
          }
        />

        <label className="auth-label">Data Fine</label>
        <input
          type="date"
          className="auth-input"
          value={asDateInput(evento.dataFine)}
          onChange={(e) =>
            setEvento(prev => ({ ...prev, dataFine: e.target.value })) // <-- niente "DataFine"
          }
        />

        <button className="auth-button" type="submit">
          Salva
        </button>
      </form>

      {messaggio && <p>{messaggio}</p>}
    </div>
  );
};

export default ModificaEvento;
