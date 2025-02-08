import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        {/* If user is logged in, go to Home, else go to Signin */}
        <Route path="/" element={user ? <Home /> : <Signin />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;