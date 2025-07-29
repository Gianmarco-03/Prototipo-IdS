import React from "react";

// URL del backend usato per immagini o altri asset statici
const BACKEND_URL = "http://localhost:3000";

// Funzione di utilità per convertire una proprietà in un array normale
// Gestisce sia array nativi che oggetti con la forma { $id, $values } (da .NET ReferenceHandler.Preserve)
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (val.$values) return val.$values;
  return [];
};

const UserInfo = ({ user }) => {
  // Se non c'è utente, non mostrare nulla
  if (!user) return null;

  return (
    <div className="sidebar-section">
      {/* Immagine profilo predefinita */}

       {/* Username */}
      <div className="username-box ">
        <span className="field-label">{user.username}</span>
      </div>

      <div className="profile-border-wrapper">
        <div className="profile-image-container">
          <img
            src={user.immagineProfilo || `${BACKEND_URL}/images/Def_propic.png`}
            className="sidebar-image"
            alt="profilo"
          />
        </div>
      </div>

     

      {/* Biografia */}
      <div className="bio-box info-box">
        <span className="field-label">Bio</span>
        <span className="field-value">{user.biografia}</span>
      </div>

      {/* Hashtag (gestito anche se è un oggetto con $values) */}
      {user.hashtag && (
        <div>
          <strong>Hashtags:</strong>
          <div className="hashtags-box info-box">
              <ul>
                {toArray  (user.hashtag).map((tag,p) => (
                  <span className="HT-card info-box" key={p}>#{tag} </span>
                ))}
              </ul>
          </div>  
        </div>
      )}
    </div>
  );
};

export default UserInfo;
