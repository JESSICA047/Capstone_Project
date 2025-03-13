import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FooterLogin.css";
import { assets } from "../../assets/assets";

function FooterLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFooterNavigation = (path) => {
    // If clicking on current path, scroll to top
    if (
      (path === "" && location.pathname === "/loggedin") ||
      location.pathname === `/loggedin${path}`
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/loggedin${path}`);
    }
  };

  return (
    <footer id="footer-section" className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <div className="logo">
            <h2>FitFare</h2>
          </div>
          <div className="footer-text">
            <h2>About Us</h2>
            <p>Get healthy and organized with MealPlanPro!</p>
            <p>
              Discover a world of delicious and nutritious meal ideas, carefully
              curated to suit your dietary needs and preferences. Plan your meal
              for the week, daily and monthly
            </p>
            <p>
              Join our community today and start cooking your way to a
              healthier, happier you.
            </p>
          </div>
          <div className="footer-socials">
            <img src={assets.facebook} alt="facebook" />
            <img src={assets.instagram} alt="instagram" />
            <img src={assets.twitter} alt="twitter" />
          </div>
        </div>
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li
              onClick={() => handleFooterNavigation("")}
              style={{ cursor: "pointer" }}
            >
              Home
            </li>
            <li
              onClick={() => handleFooterNavigation("/recipes")}
              style={{ cursor: "pointer" }}
            >
              Recipes
            </li>
            <li
              onClick={() => handleFooterNavigation("/meal-plans")}
              style={{ cursor: "pointer" }}
            >
              Meal Plans
            </li>
            <li
              onClick={() => handleFooterNavigation("/nutritional-tips")}
              style={{ cursor: "pointer" }}
            >
              Nutritional Tips
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3>Contact Us</h3>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright-text">
          <span className="copyright">&copy;</span> 2025 FitFare. All rights
          reserved.
        </p>
        <p>Privacy Policy | Terms & Conditions</p>
      </div>
    </footer>
  );
}

export default FooterLogin;
