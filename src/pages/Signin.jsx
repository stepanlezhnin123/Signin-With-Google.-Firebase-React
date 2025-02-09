import "../styles/styles.scss";
import React from "react";
import { auth, provider } from "../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; // ✅ Import useAuthState

function Signin() {
  const [user, loading, error] = useAuthState(auth); // ✅ Get auth state

  function signInWithGoogle() {
    console.log("Sign-in button clicked!");

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (user) {
    return <h2>Welcome, {user.displayName}!</h2>;
  }

  return (
    <>
      <h1 className="title">Sign in</h1>
      <div className="signin">
        <button className="signin-with-google-button" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </>
  );
}

export default Signin;