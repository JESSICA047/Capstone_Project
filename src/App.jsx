import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import LoggedIn from "./pages/LoggedIn/LoggedIn";
import Navbar from "./components/Navbar/Navbar";
import Recipe from "./pages/Recipes/Recipes";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail";
import MealPlan from "./pages/MealPlan/MealPlan";
import NutritionTipsPage from "./pages/NutritionTipsPage/NutritionTipsPage";
import ProfilePage from "./pages/Profilepage/ProfilePage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { ToastProvider } from "./contexts/ToastContext";
import { UserStatsProvider } from "./contexts/UserStatsContext/UserStatsContext";
import { AuthProvider } from "./contexts/AuthContext";
import PropTypes from "prop-types";

function App() {
  // Initialize state from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Only show navbar on home page when not logged in
  const showNavbar = !isLoggedIn && location.pathname === "/";

  // Modified setIsLoggedIn handler that also redirects to home page
  const handleLogout = (value) => {
    setIsLoggedIn(value);
    if (value === false) {
      // Redirect to home page on logout
      navigate("/");
    }
  };

  // Protected route wrapper component
  const ProtectedRoute = ({ children }) => {
    // If user just logged out, we don't want to redirect to signin
    // as the navigate("/") in UserDropdown will take care of the redirection
    if (!isLoggedIn && location.pathname.includes("/dashboard")) {
      return <Navigate to="/" replace />;
    }
    return isLoggedIn ? (
      children
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthProvider>
      <div className="app">
        {showNavbar && <Navbar isLoggedIn={isLoggedIn} />}
        <ScrollToTop /> {/* Add this component */}
        <UserStatsProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route
                path="/signup"
                element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route
                path="/signin"
                element={<SignInPage setIsLoggedIn={setIsLoggedIn} />}
              />
              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <LoggedIn setIsLoggedIn={handleLogout} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/recipes"
                element={
                  <ProtectedRoute>
                    <Recipe />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/recipe/:id"
                element={
                  <ProtectedRoute>
                    <RecipeDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/meal-plans"
                element={
                  <ProtectedRoute>
                    <MealPlan />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/nutritional-tips"
                element={
                  <ProtectedRoute>
                    <NutritionTipsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage setIsLoggedIn={setIsLoggedIn} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <LoggedIn setIsLoggedIn={handleLogout} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ToastProvider>
        </UserStatsProvider>
      </div>
    </AuthProvider>
  );
}

export default App;
