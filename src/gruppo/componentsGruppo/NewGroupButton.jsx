import React from "react";
import "./styles/NewGroupButton.css";

const NewGroupButton = ({ onClick }) => {
  return (
    <button className="newGroupButton" onClick={onClick}>
      Nuovo Gruppo
    </button>
  );
};

export default NewGroupButton;
