import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../utils/googleLogin";
import "./login.css";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <div className="form">
        <h2>Log In</h2>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Log In with Google
        </button>
        <span className="span">
          Don't have an account? <a href="/signup">Sign up</a>
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
