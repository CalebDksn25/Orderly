import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../auth/firebaseConfig"; // Ensure Firebase app is initialized

const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google Account Linked:", user.email);
    return user.email; // Returns the logged-in email
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};
