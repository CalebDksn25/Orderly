import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="side-navbar">
      <a href="#accounts">Accounts</a>
      <a href="#spreadsheet">Spreadsheet</a>
      <a href="#stores">Stores</a>
      <a href="#vizuals">Vizuals</a>
    </div>
  );
};

export default Navbar;
