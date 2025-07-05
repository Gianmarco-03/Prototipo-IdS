import React from "react";

const MainContent = ({ children, className = "" }) => {
  return (
    <main className="main-content">
      {children}
    </main>
  );
};

export default MainContent;
