import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Import getDoc function
import "./user.css";

const User = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState(""); // State for purpose
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUser({
            uid: user.uid,
            name: userData.displayName,
            email: user.email,
            purpose: userData.purpose || "", // Fetch purpose if available
          });
          setName(userData.displayName);
          setPurpose(userData.purpose || ""); // Set purpose state
        }
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
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const db = getFirestore();
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        displayName: name,
        purpose: purpose,
      });
      setUser((prevUser) => ({
        ...prevUser,
        name: name,
        purpose: purpose,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user information: ", error);
    }
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
      {isEditing ? (
        <div>
          <p>
            <strong>Name:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <strong>Purpose:</strong>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </p>
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Purpose:</strong> {user.purpose}
          </p>
          <button onClick={handleEdit} className="edit-button">
            Edit
          </button>
        </div>
      )}
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
