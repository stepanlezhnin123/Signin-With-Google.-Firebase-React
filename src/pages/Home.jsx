import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { auth } from "../firebase/firebase.js";
import '../styles/styles.scss'

const Home = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  // Signout function
  const logout = () => {
    auth.signOut().then(() => {
      navigate("/"); // ✅ Redirect to Signin after logout
    });
  };

  return (
    <>
    <div>
      <div className="welcome-user">
        Hello, {auth.currentUser?.displayName || "User"}! 👋
      </div>
      <div className="sign-in-field">
        <button className="sign-in-button" onClick={logout}>
            Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Home;