import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut function
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./user.css"; // Import the CSS file

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to home page
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <h1>User Information</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <div className="button-container">
        <button>Manage Subscription</button>
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default User;
