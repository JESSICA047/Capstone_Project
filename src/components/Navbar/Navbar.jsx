import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      navigate("/signin");
    } else {
      navigate(path);
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
        <Link to="/" onClick={() => setMenu("home")}>
          FitFare{" "}
        </Link>
      </div>

      {/* Navigation Menu */}
      <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              handleLinkClick();
            }}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              handleProtectedNavigation("/recipes");
              setMenu("recipes");
              handleLinkClick();
            }}
            className={menu === "recipes" ? "active" : ""}
          >
            Recipes
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleProtectedNavigation("/meal-plans");
              setMenu("meal-plans");
              handleLinkClick();
            }}
            className={menu === "meal-plans" ? "active" : ""}
          >
            Meal Plans
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleProtectedNavigation("/nutritional-tips");
              setMenu("nutritional-tips");
              handleLinkClick();
            }}
            className={menu === "nutritional-tips" ? "active" : ""}
          >
            Nutritional Tips
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleProtectedNavigation("/about-us");
              setMenu("about-us");
              handleLinkClick();
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
