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

  const [descrizione, setDescrizione] = useState("");
  const [dataInizio, setDataInizio] = useState("");
  const [dataFine, setDataFine] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [autorizzato, setAutorizzato] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!username) return;
    checkOrganizzatore(nomeEvento, nomeGruppo, username).then((ok) => {
      setAutorizzato(ok);
      if (!ok) setMessaggio("Non autorizzato");
    });
    getEvento(nomeGruppo, nomeEvento).then((ev) => {
      if (ev) {
        setDescrizione(ev.descrizione || "");
        setDataInizio(ev.dataInizio ? ev.dataInizio.split("T")[0] : "");
        setDataFine(ev.dataFine ? ev.dataFine.split("T")[0] : "");
        setImgUrl(ev.immagineProfilo || "");
      }
    });
  }, [nomeEvento, nomeGruppo, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autorizzato) return;
    try {
      let path = imgUrl;
      if (file) {
        const res = await uploadImmagine(nomeEvento, nomeGruppo, file);
        path = res;
        setImgUrl(path);
      }
      await updateEvento({
        Nome: nomeEvento,
        nomeGruppo: nomeGruppo,
        Descrizione: descrizione,
        DataInizio: new Date(dataInizio),
        DataFine: dataFine ? new Date(dataFine) : null,
        ImmagineProfilo: path,
      });
      setMessaggio("Evento aggiornato");
    } catch (err) {
      setMessaggio("Errore durante l'aggiornamento");
    }
  };

  if (!autorizzato) {
    return <div className="auth-container">{messaggio}</div>;
  }

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
          {imgUrl && (
            <img src={imgUrl} alt="Evento" className="profile-image" />
          )}
          <div className="profile-image-overlay">Cambia</div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files[0];
            if (f) {
              setFile(f);
              setImgUrl(URL.createObjectURL(f));
            }
          }}
        />
        <label className="auth-label">Descrizione</label>
        <textarea
          className="auth-input"
          value={descrizione}
          onChange={(e) => setDescrizione(e.target.value)}
        />
        <label className="auth-label">Data Inizio</label>
        <input
          type="date"
          className="auth-input"
          value={dataInizio}
          onChange={(e) => setDataInizio(e.target.value)}
        />
        <label className="auth-label">Data Fine</label>
        <input
          type="date"
          className="auth-input"
          value={dataFine}
          onChange={(e) => setDataFine(e.target.value)}
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