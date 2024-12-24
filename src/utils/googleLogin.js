import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../auth/firebaseConfig"; // Ensure Firebase app is initialized

const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  // Add scope to manage the user's Google Drive files
  provider.addScope("https://www.googleapis.com/auth/drive.file");

  try {
    // Sign in with Google and get the user details
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get the OAuth2 access token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    console.log("Google Account Linked:", user.email);
    console.log("Access Token:", token);

    // Return both email and access token
    return { email: user.email, token };
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};
