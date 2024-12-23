import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const saveSites = async (sites) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in!");
    }

    // Use the user's UID as the document ID
    const userDoc = doc(db, "users", user.uid);

    // Save the sites array to Firestore
    await setDoc(userDoc, { sites }, { merge: true });
    console.log("Sites saved successfully!");
  } catch (error) {
    console.error("Error saving sites:", error.message);
    throw error;
  }
};
