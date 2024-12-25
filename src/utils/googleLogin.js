import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../auth/firebaseConfig"; // Ensure Firebase app is initialized

const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Log user information
    console.log("Google Login Successful: ", user);

    // Return user object for further use
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};