import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../utils/googleLogin";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import "./login.css";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin(); // Log in the user
      alert("Login successful!");

      // Check if the user's additional info exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // If user data exists, navigate to the dashboard
        navigate("/dashboard");
      } else {
        // If user data does not exist, navigate to the user info form
        navigate("/user-info");
      }
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