import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Set initial menu state based on location path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("home");
    else if (path.includes("/recipes")) setMenu("recipes");
    else if (path.includes("/meal-plans")) setMenu("meal-plans");
    else if (path.includes("/nutritional-tips")) setMenu("nutritional-tips");
  }, [location.pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
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
        <li className={menu === "home" ? "active" : ""}>
          <a
            onClick={() => handleProtectedNavigation("/", "home")}
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
        </li>
        <li className={menu === "recipes" ? "active" : ""}>
          <a
            onClick={() => handleProtectedNavigation("/recipes", "recipes")}
            style={{ cursor: "pointer" }}
          >
            Recipes
          </a>
        </li>
        <li className={menu === "meal-plans" ? "active" : ""}>
          <a
            onClick={() =>
              handleProtectedNavigation("/meal-plans", "meal-plans")
            }
            style={{ cursor: "pointer" }}
          >
            Meal Plans
          </a>
        </li>
        <li className={menu === "nutritional-tips" ? "active" : ""}>
          <a
            onClick={() =>
              handleProtectedNavigation("/nutritional-tips", "nutritional-tips")
            }
            style={{ cursor: "pointer" }}
          >
            Nutritional Tips
          </a>
        </li>
        <li className={menu === "about-us" ? "active" : ""}>
          <a
            onClick={() => {
              setMenu("about-us");
              handleLinkClick();
              const footerElement = document.getElementById("footer-section");
              if (footerElement) {
                footerElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{ cursor: "pointer" }}
          >
            About Us
          </a>
        </li>
      </ul>

      {/* Right Side Actions - only show if not logged in */}
      {!isLoggedIn ? (
        <div className="navbar-right">
          <button className="sign-up" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
          <button onClick={() => navigate("/signin")}>Sign In</button>
        </div>
      ) : (
        <div className="navbar-right">
          <button onClick={() => navigate("/profile")}>My Profile</button>
        </div>
      )}

      {/* Better hamburger menu */}
      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
