import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import Navbar from "./components/Navbar/Navbar";
import Recipe from "./pages/Recipes/Recipes";
import MealPlan from "./pages/MealPlan/MealPlan";
import NutritionTipsPage from "./pages/NutritionTipsPage/NutritionTipsPage";

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

  // Protected route wrapper component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  };

  return (
    <div className="app">
      {showNavbar && <Navbar isLoggedIn={isLoggedIn} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/signin"
          element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Protected Routes */}
        <Route
          path="/loggedin"
          element={
            <ProtectedRoute>
              <LoggedIn setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loggedin/recipes"
          element={
            <ProtectedRoute>
              <Recipe />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loggedin/meal-plans"
          element={
            <ProtectedRoute>
              <MealPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loggedin/nutritional-tips"
          element={
            <ProtectedRoute>
              <NutritionTipsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loggedin/*"
          element={
            <ProtectedRoute>
              <LoggedIn setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
