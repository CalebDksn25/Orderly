import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const googleLogin = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (!result || !result.user) {
      throw new Error("No user data received");
    }

    return result.user;
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
};
