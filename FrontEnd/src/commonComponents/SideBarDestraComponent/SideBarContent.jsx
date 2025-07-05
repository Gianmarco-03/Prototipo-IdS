import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SidebarContent = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/chat")) {
    return (<h>contenuto per la chat</h>);
  }
  else if (location.pathname.startsWith("/gruppo")) {
      let gruppo = location.pathname.split("/")[2]
      gruppo = gruppo.replace("%20"," ")
      return (<h>contenuto per il {gruppo}</h>);
  }
  else{
    return (<h>contenuto la Home dei gruppi</h>);
  }
};

export default SidebarContent;
