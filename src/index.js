import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "boxicons/css/boxicons.min.css"; // Import Boxicons CSS
import { gapi } from 'gapi-script'; // Ensure this import remains

const root = ReactDOM.createRoot(document.getElementById("root"));

// Initialize gapi client
gapi.load('client:auth2', () => {
  gapi.client.init({
    clientId: 'YOUR_GOOGLE_CLIENT_ID',
    scope: 'email',
  }).then(() => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
