import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore();

export const saveSpreadsheetId = async (userId, spreadsheetId) => {
  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, {
      spreadsheetId: spreadsheetId,
    });
    console.log("Spreadsheet ID saved to Firestore!");
  } catch (error) {
    console.error("Error saving spreadsheet ID:", error.message);
    throw error;
  }
};
