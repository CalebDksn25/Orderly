import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../utils/googleLogin";
import { createSpreadsheetForUser } from "../../utils/createSpreadsheetForUser"; // Import spreadsheet creation utility
import { saveSpreadsheetId } from "../../utils/saveSpreadsheetId"; // Import Firestore save utility
import Spreadsheet from "../spreadsheeet/Spreadsheet"; // Import Spreadsheet component
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [spreadsheetId, setSpreadsheetId] = React.useState(null);

  const handleGoogleLogin = async () => {
    try {
      // Step 1: Authenticate the user with Google
      const { email, token } = await googleLogin();

      // Step 2: Create a Google Spreadsheet for the new user
      const spreadsheetId = await createSpreadsheetForUser(token);

      // Step 3: Save the spreadsheet ID to Firestore
      await saveSpreadsheetId(email, spreadsheetId);

      setSpreadsheetId(spreadsheetId); // Set the spreadsheet ID in state

      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="form">
      <h2>Sign Up</h2>
      <button onClick={handleGoogleLogin} className="google-login-button">
        Sign Up with Google
      </button>
      <span className="span">
        Already have an account? <a href="/login">Log in</a>
      </span>
      {spreadsheetId && <Spreadsheet spreadsheetId={spreadsheetId} />}
    </div>
  );
};

export default Signup;
