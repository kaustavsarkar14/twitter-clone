import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // if (location.pathname === "/login") 
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage/>} />
      </Routes>
    </div>
  );
}

export default App;
