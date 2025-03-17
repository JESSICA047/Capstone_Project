import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";
import UserDropdown from "../UserDropdown/UserDropdown";
import "./NavbarLogin.css";

function NavbarLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Set initial menu state based on location path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/loggedin") setMenu("home");
    else if (path.includes("/recipes")) setMenu("recipes");
    else if (path.includes("/meal-plans")) setMenu("meal-plans");
    else if (path.includes("/nutritional-tips")) setMenu("nutritional-tips");
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleNavigation = (path, menuItem) => {
    setMenu(menuItem);

    // If clicking on current page, scroll to top
    if (
      (path === "" && location.pathname === "/loggedin") ||
      location.pathname === `/loggedin${path}`
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to new page
      navigate(`/loggedin${path}`);
    }

    handleLinkClick();
  };

  return (
    <div>
      <div className="login-navbar">
        <div className="navbar-left">
          <a
            onClick={() => handleNavigation("", "home")}
            style={{ cursor: "pointer" }}
          >
            FitFare
          </a>
        </div>

        {/* Add the mobile menu toggle button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <button
              onClick={() => handleNavigation("", "home")}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/recipes", "recipes")}
              className={menu === "recipes" ? "active" : ""}
            >
              Recipes
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/meal-plans", "meal-plans")}
              className={menu === "meal-plans" ? "active" : ""}
            >
              Meal Plans
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                handleNavigation("/nutritional-tips", "nutritional-tips")
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
        </ul>

        <div
          className="login-navbar-right"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{ cursor: "pointer" }}
        >
          <img src={assets.logo_login} alt="" />
          <p>
            Hello, <span>User!</span>
          </p>
          <UserDropdown
            setIsLoggedIn={setIsLoggedIn}
            isOpen={isDropdownOpen}
            onClose={() => setIsDropdownOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default NavbarLogin;
