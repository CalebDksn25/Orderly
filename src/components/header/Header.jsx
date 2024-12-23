import React from "react";
import "./header.css";
import "boxicons/css/boxicons.min.css"; // Ensure Boxicons CSS is imported

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Orderly Dash</div>
      <div className="user-icon">
        <i className="bx bx-user-circle"></i>{" "}
        {/* Ensure the class name is correct */}
      </div>
    </header>
  );
};

export default Header;
