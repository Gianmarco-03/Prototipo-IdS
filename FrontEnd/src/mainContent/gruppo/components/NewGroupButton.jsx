import React from "react";
import "../styles/NewGroupButton.css";

const NewGroupButton = ({ onClick }) => {
  return (
    <div className="groupContainer">
      <input type="text" value="Gruppi" readOnly className="groupTextBox" />
      <div className="newGroupButtonWrapper">

        <button className="newGroupButton" onClick={onClick}>
         +
        </button>
      </div>
    </div>
  );
};

export default NewGroupButton;
