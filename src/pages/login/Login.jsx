import React from "react";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../utils/googleLogin";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // Firestore functions
import "./login.css";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const navigate = useNavigate();
  const db = getFirestore(); // Initialize Firestore

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin(); // Log in the user
      alert("Login successful!");

      // Check Firestore directly here
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User exists, navigating to dashboard...");
        navigate("/dashboard");
      } else {
        console.log("New user detected, redirecting to user info...");
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName || "",
          createdAt: new Date(),
        });
        navigate("/user-info");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
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