import React, { useState, useEffect, useRef } from "react";
import {
  getUtente,
  updateUtente,
  uploadImmagine,
} from "../../service/UtenteService";
import "../../Auth/Login/styles/Login.css";
import "./styles/ModificaUtente.css";

const ModificaUtente = () => {
  const username =
    sessionStorage.getItem("user") || sessionStorage.getItem("username") || "";

  const [bio, setBio] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!username) return;
    getUtente(username).then((u) => {
      if (u) {
        setBio(u.biografia || "");
        let fetchedTags = u.hashtag ?? [];
        if (typeof fetchedTags === "string") {
          fetchedTags = fetchedTags
            .split(" ")
            .filter(Boolean)
            .map((t) => (t.startsWith("#") ? t : `#${t}`));
        }
        setTags(Array.isArray(fetchedTags) ? fetchedTags : Array.isArray(fetchedTags.$values) ? fetchedTags.$values : []);
        setImgUrl(u.immagineProfilo || "");
      }
    });
  }, [username]);
  

  const handleTagKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag) {
        const formatted = tag.startsWith("#") ? tag : `#${tag}`;
        setTags([...tags, formatted]);
        setTagInput("");
      }
    } else if (e.key === "Backspace" && !tagInput && tags.length) {
      e.preventDefault();
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let path = imgUrl;
      if (file) {
        const res = await uploadImmagine(username, file);
        path = res;
        setImgUrl(path);
      }
      await updateUtente({
        username: username,
        immagineProfilo: path,
        biografia: bio,
        hashtag: tags,
      });
      setMessaggio("Profilo aggiornato");
    } catch (err) {
      setMessaggio("Errore durante l'aggiornamento");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Modifica Profilo</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Username</label>
        <input className="auth-input" value={username} disabled />

        <label className="auth-label">Immagine Profilo</label>
        <div
          className="profile-image-wrapper"
          onClick={() => fileInputRef.current?.click()}
        >
          {imgUrl && (
            <img src={imgUrl} alt="Profilo" className="profile-image" />
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

        <label className="auth-label">Bio</label>
        <textarea
          className="auth-input"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="auth-label">Hashtag</label>
        <div className="tag-input">
          {tags.map((tag, i) => (
            <span key={i} className="tag-chip" onClick={() => removeTag(i)}>
              {tag}
            </span>
          ))}
          <input
            className="tag-text-input"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>

        <button className="auth-button" onClick={handleSubmit}>
          Salva
        </button>
      </form>
      {messaggio && <p>{messaggio}</p>}
    </div>
  );
};

export default ModificaUtente;