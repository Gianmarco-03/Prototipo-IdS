import React from "react";
import "../styles/NewGroupButton.css";
import "./SearchBar"
import { PlusIcon } from "@heroicons/react/24/outline";


const NewGroupButton = ({ onClick }) => {
  return (
    <div className="groupContainer">
        <div className="gruppo-title-box">
          <h1>{"eventi"}</h1>
        </div>
        <button className="newGroupButton" onClick={onClick}>
          <PlusIcon className="event-icon" width={30} height={30}  /> 
        </button>
    </div>
  );
};

export default NewGroupButton;
