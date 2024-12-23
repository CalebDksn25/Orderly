import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Orderly. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
