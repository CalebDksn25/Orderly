import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../auth/firebaseConfig"; // Ensure Firebase app is initialized

const auth = getAuth(app);

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  // Add Gmail API scopes
  provider.addScope("https://www.googleapis.com/auth/gmail.readonly");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Retrieve OAuth 2.0 tokens for Gmail API access
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // Log user and token information
    console.log("Google Login Successful: ", user);
    console.log("Gmail Access Token: ", accessToken);

    // Return user object and token for further use
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      accessToken, // OAuth 2.0 access token for Gmail API
    };
  } catch (error) {
    console.error("Error with Google Login:", error.message);
    throw error;
  }
};