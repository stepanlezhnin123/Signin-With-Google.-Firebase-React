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
    return <h2>Loading...</h2>; // ✅ Show loading state
  }

  if (error) {
    return <h2>Error: {error.message}</h2>; // ✅ Show error if any
  }

  if (user) {
    return <h2>Welcome, {user.displayName}!</h2>; // ✅ Show user info if signed in
  }

  return (
    <>
      <h1 className="title">Sign in</h1>
      <div className="sign-in-field">
        <button className="sign-in-button" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </>
  );
}

export default Signin;