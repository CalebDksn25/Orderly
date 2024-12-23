import React from "react";
import "./navbar.css";

const Navbar = ({ setActiveTab }) => {
  return (
    <div className="side-navbar">
      <a href="#dashboard" onClick={() => setActiveTab("dashboard")}>
        Dashboard
      </a>
      <a href="#accounts" onClick={() => setActiveTab("accounts")}>
        Accounts
      </a>
      <a href="#spreadsheet" onClick={() => setActiveTab("spreadsheet")}>
        Spreadsheet
      </a>
      <a href="#stores" onClick={() => setActiveTab("stores")}>
        Stores
      </a>
      <a href="#vizuals" onClick={() => setActiveTab("vizuals")}>
        Vizuals
      </a>
    </div>
  );
};

export default Navbar;
