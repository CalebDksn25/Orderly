import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../utils/googleLogin";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
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
    </div>
  );
};

export default Signup;
