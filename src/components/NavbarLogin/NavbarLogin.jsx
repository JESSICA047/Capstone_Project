import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import UserDropdown from "../UserDropdown/UserDropdown";
import "./NavbarLogin.css";

function NavbarLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleNavigation = (path) => {
    if (path === "/") {
      // If trying to go to home, first check if logged in
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedIn) {
        navigate(path);
      }
    } else {
      navigate(`/loggedin${path}`);
    }
    handleLinkClick();
  };

  return (
    <div>
      <div className="login-navbar">
        <div className="navbar-left">
          <Link to="/loggedin" onClick={() => setMenu("home")}>
            FitFare{" "}
          </Link>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <button
              onClick={() => {
                setMenu("home");
                handleNavigation("/");
              }}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMenu("recipes");
                handleNavigation("/recipes");
              }}
              className={menu === "recipes" ? "active" : ""}
            >
              Recipes
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMenu("meal-plans");
                handleNavigation("/meal-plans");
              }}
              className={menu === "meal-plans" ? "active" : ""}
            >
              Meal Plans
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setMenu("nutritional-tips");
                handleNavigation("/nutritional-tips");
              }}
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
