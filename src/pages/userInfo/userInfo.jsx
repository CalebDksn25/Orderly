import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Firestore functions
import "./userInfo.css";

const UserInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [purpose, setPurpose] = useState(""); // Added purpose state
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("Existing User Data:", userData);

          // If the user has already filled out their data, redirect to dashboard
          if (userData.firstName && userData.lastName && userData.purpose) {
            navigate("/dashboard");
          }
        }
      }
    };

    checkUserData();
  }, [auth, db, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      // Save user data to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          firstName,
          lastName,
          purpose,
          email: user.email,
        },
        { merge: true }
      ); // Merge ensures it won't overwrite existing data

      console.log("User Data Saved:", { firstName, lastName, purpose });

      // Redirect to dashboard after saving data
      navigate("/dashboard");
    }
  };

  return (
    <div className="user-info-container">
      <h1>Welcome! Let's get to know you better.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Purpose of Using Our App:
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save and Continue</button>
      </form>
    </div>
  );
};

export default UserInfo;
