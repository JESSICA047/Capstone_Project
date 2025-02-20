import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

      <div className="hamburger" onClick={toggleMenu}>
        ☰
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
          <Link
            to="/recipes"
            onClick={() => {
              setMenu("recipes");
              handleLinkClick();
            }}
            className={menu === "recipes" ? "active" : ""}
          >
            Recipes
          </Link>
        </li>
        <li>
          <Link
            to="/meal-plans"
            onClick={() => {
              setMenu("meal-plans");
              handleLinkClick();
            }}
            className={menu === "meal-plans" ? "active" : ""}
          >
            Meal Plans
          </Link>
        </li>
        <li>
          <Link
            to="/nutritional-tips"
            onClick={() => {
              setMenu("nutritional-tips");
              handleLinkClick();
            }}
            className={menu === "nutritional-tips" ? "active" : ""}
          >
            Nutritional Tips
          </Link>
        </li>
        <li>
          <Link
            to="/about-us"
            onClick={() => {
              setMenu("about-us");
              handleLinkClick();
            }}
            className={menu === "about-us" ? "active" : ""}
          >
            About Us
          </Link>
        </li>
      </ul>

      {/* Right Side Actions */}
      <div className="navbar-right">
        <button onClick={handleLinkClick}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
