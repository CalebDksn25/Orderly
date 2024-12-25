import React from "react";
import "./spreadsheet.css";

const Spreadsheet = ({ spreadsheetId }) => {
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?gid=0#gid=0`;

  return (
    <div
      style={{ textAlign: "center", marginTop: "20px", width: "max-content" }}>
      <iframe
        src={spreadsheetUrl}
        width="1000px"
        height="800"
        frameBorder="0"
        style={{ border: "1px solid #ccc" }}
        title="Embedded Spreadsheet"></iframe>

      <div style={{ marginTop: "10px" }}>
        <a href={spreadsheetUrl} target="_blank" rel="noopener noreferrer">
          Spreadsheet in New Tab
        </a>
      </div>
    </div>
  );
};

export default Spreadsheet;
