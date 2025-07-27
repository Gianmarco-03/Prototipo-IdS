import React from "react";

const UserInfo = ({ user }) => {
  if (!user) return null;
  return (
    <div className="sidebar-section">
      <img src={user.immagine} alt="user" className="sidebar-image" />
      <h3>{user.username}</h3>
      <p>{user.biografia}</p>
      <div className="hashtags">{user.hashtag}</div>
    </div>
  );
};

export default UserInfo;