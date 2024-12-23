import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import "boxicons/css/boxicons.min.css"; // Ensure Boxicons CSS is imported

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Orderly Dash</div>
      <div className="user-icon">
        <Link to="/user">
          <i className="bx bx-user-circle"></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
