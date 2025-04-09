import { useNavigate, useLocation } from "react-router-dom";
import "./FooterLogin.css";
import { assets } from "../../assets/assets";

function FooterLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFooterNavigation = (path) => {
    // If clicking on current path, scroll to top
    if (
      (path === "" && location.pathname === "/dashboard") ||
      location.pathname === `/dashboard${path}`
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(`/dashboard${path}`);
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
            <p>
              FitFare is your ultimate companion for achieving your health goals
              while enjoying every bite of your journey.
            </p>
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
            <li
              onClick={() => handleFooterNavigation("/contact")}
              style={{ cursor: "pointer" }}
            >
              Contact Us
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3>Contact Us</h3>
          <p>Email: support@fitfare.com</p>
          <p>Phone: +233 (54) 123-4567</p>
          <p>Address: 123 Healthy Way, Wellness City, Ho </p>
          <p>Follow us on social media for the latest updates!</p>
          <div className="footer-socials">
            <img src={assets.facebook} alt="facebook" />
            <img src={assets.instagram} alt="instagram" />
            <img src={assets.twitter} alt="twitter" />
          </div>
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
