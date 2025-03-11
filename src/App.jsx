import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import Navbar from "./components/Navbar/Navbar";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const location = useLocation();

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Only show navbar on home page when not logged in
  const showNavbar = !isLoggedIn && location.pathname === "/";

  return (
    <div className="app">
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/signin"
          element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          Abdulswabur
          element={
            isLoggedIn ? (
              <LoggedIn setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/signin" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
