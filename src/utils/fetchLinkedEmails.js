import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

export const fetchLinkedEmails = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("No user is logged in!");
    }

    const userDoc = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      console.log("Fetched linked emails:", docSnap.data().linkedEmails);
      return docSnap.data().linkedEmails || []; // Return the array or an empty array if undefined
    } else {
      console.log("No document found for the user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching linked emails:", error.message);
    throw error;
  }
};
