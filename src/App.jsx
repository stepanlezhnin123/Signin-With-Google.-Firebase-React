import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, loading] = useAuthState(auth);
  
  if (loading) {
    return (
      <>
      <div className="loading">
        Loading...
      </div>
      </>
    )
  }

  return (
     <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Signin />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>

  )
}


export default App;