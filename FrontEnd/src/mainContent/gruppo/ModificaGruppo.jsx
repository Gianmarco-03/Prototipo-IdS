import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getGruppo,
  updateGruppo,
  uploadImmagine,
  checkAdmin,
} from "../../service/GruppoService";
import "./styles/ModificaGruppo.css";

const ModificaGruppo = () => {
  const { nomeGruppo } = useParams();
  const username =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const [descrizione, setDescrizione] = useState("");
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [autorizzato, setAutorizzato] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!username) return;
    checkAdmin(nomeGruppo, username).then((ok) => {
      setAutorizzato(ok);
      if (!ok) setMessaggio("Non autorizzato");
    });
    getGruppo(nomeGruppo).then((g) => {
      if (g) {
        setDescrizione(g.descrizione || "");
        setImgUrl(g.immagineProfilo || "");
      }
    });
  }, [nomeGruppo, username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!autorizzato) return;
    try {
      let path = imgUrl;
      if (file) {
        const res = await uploadImmagine(nomeGruppo, file);
        path = res;
        setImgUrl(path);
      }
      await updateGruppo({
        Nome: nomeGruppo,
        Descrizione: descrizione,
        ImmagineProfilo: path,
      });
      setMessaggio("Gruppo aggiornato");
    } catch (err) {
      setMessaggio("Errore durante l'aggiornamento");
    }
  };

  if (!autorizzato) {
    return <div className="auth-container">{messaggio}</div>;
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Modifica Gruppo</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Nome Gruppo</label>
        <input className="auth-input" value={nomeGruppo} disabled />
        <label className="auth-label">Immagine</label>
        <div
          className="profile-image-wrapper"
          onClick={() => fileInputRef.current?.click()}
        >
          {imgUrl && (
            <img src={imgUrl} alt="Gruppo" className="profile-image" />
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
        <button className="auth-button" type="submit">
          Salva
        </button>
      </form>
      {messaggio && <p>{messaggio}</p>}
    </div>
  );
};

export default ModificaGruppo;
