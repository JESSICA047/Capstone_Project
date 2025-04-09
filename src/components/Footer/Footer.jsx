import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer">
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
          <div className="footer-socials">
            <img src={assets.facebook} alt="facebook" />
            <img src={assets.instagram} alt="instagram" />
            <img src={assets.twitter} alt="twitter" />
          </div>
        </div>
        <div className="footer-center">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
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
    </div>
  );
}

export default Footer;
