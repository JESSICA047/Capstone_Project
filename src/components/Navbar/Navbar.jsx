import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Set initial menu state based on location path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("home");
    else if (path.includes("/recipes")) setMenu("recipes");
    else if (path.includes("/meal-plans")) setMenu("meal-plans");
    else if (path.includes("/nutritional-tips")) setMenu("nutritional-tips");
  }, [location.pathname]);

  const handleProtectedNavigation = (path, menuItem) => {
    setMenu(menuItem);

    // If clicking on current path, scroll to top
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to new page (with authentication check)
      if (!isLoggedIn && path !== "/") {
        navigate("/signin");
      } else {
        navigate(path);
      }
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Function to toggle the hamburger menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to close the menu when a link is clicked
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false); // Close the menu
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a
          onClick={() => handleProtectedNavigation("/", "home")}
          style={{ cursor: "pointer" }}
        >
          FitFare
        </a>
      </div>

      {/* Navigation Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <a
            onClick={() => handleProtectedNavigation("/", "home")}
            className={menu === "home" ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
        </li>
        <li>
          <button
            onClick={() => handleProtectedNavigation("/recipes", "recipes")}
            className={menu === "recipes" ? "active" : ""}
          >
            Recipes
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              handleProtectedNavigation("/meal-plans", "meal-plans")
            }
            className={menu === "meal-plans" ? "active" : ""}
          >
            Meal Plans
          </button>
        </li>
        <li>
          <button
            onClick={() =>
              handleProtectedNavigation("/nutritional-tips", "nutritional-tips")
            }
            className={menu === "nutritional-tips" ? "active" : ""}
          >
            Nutritional Tips
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setMenu("about-us");
              handleLinkClick();
              const footerElement = document.getElementById("footer-section");
              if (footerElement) {
                footerElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={menu === "about-us" ? "active" : ""}
          >
            About Us
          </button>
        </li>
        <li className="mobile-auth">
          <button className="sign-up" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button className="sign-in" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </li>
      </ul>

      {/* Right Side Actions */}
      <div className="navbar-right">
        <button className="sign-up" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className="sign-in" onClick={() => navigate("/signin")}>
          Sign In
        </button>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
    </nav>
  );
}

export default Navbar;
