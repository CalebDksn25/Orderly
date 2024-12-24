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

      // Check if the user's additional info exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log("User data exists:", userDoc.data());
        // Navigate to the dashboard if user data exists
        navigate("/dashboard");
      } else {
        console.log("User data does not exist. Redirecting to user info form.");

        // Create an initial document for the user in Firestore (optional)
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName || "",
          createdAt: new Date(),
        });

        // Navigate to the user info form if user data does not exist
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