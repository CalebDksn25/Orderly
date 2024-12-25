import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Correct import

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  // Add scope to manage the user's Google Drive files
  provider.addScope("https://www.googleapis.com/auth/drive.file");

  try {
    // Sign in with Google and get the user details
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken();
    console.log("Google Account Linked:", user.email);
    console.log("Token:", token); // Log the token for debugging
    return { email: user.email, token }; // Returns the logged-in email and token
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};
