import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("-->>>", user);
      if (user) {
        console.log("user", user);
        if (location.pathname === "/login") 
        navigate("/");
      } else {
        console.log("no user");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:username" element={<h1>Profile</h1>} />
      </Routes>
    </div>
  );
}

export default App;
