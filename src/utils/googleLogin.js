import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../auth/firebaseConfig"; // Ensure Firebase app is initialized

const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Log all available user information for debugging
    console.log("Google Login Successful: ", user);

    // Return the full user object for further use
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL, // Optional: Add if you need profile picture
    };
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};