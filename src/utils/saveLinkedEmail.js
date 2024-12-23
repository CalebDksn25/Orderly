import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const saveLinkedEmail = async (email) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in!");
    }

    const userDoc = doc(db, "users", user.uid);

    // Use arrayUnion to add the email without overwriting the existing array
    await updateDoc(userDoc, {
      linkedEmails: arrayUnion(email),
    });

    console.log("Email added successfully:", email);
  } catch (error) {
    console.error("Error saving linked email:", error.message);
    throw error;
  }
};

export const deleteLinkedEmail = async (email) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in!");
    }

    const userDoc = doc(db, "users", user.uid);

    // Use arrayRemove to delete the email from the array in Firestore
    await updateDoc(userDoc, {
      linkedEmails: arrayRemove(email),
    });

    console.log("Email deleted successfully:", email);
  } catch (error) {
    console.error("Error deleting linked email:", error.message);
    throw error;
  }
};
