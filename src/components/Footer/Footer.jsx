import React from "react";
import assets from "../../assets/assets";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <img src={assets.footer_image} alt="footer" />
      <div className="footer-left">
        <div className="logo">
          <h2>FitFare</h2>
        </div>
        <h2>About Us</h2>
        <p>Get healthy and organized with MealPlanPro!</p>
        <p>
          Discover a world of delicious and nutricious meal ideas, carefully
          curated to suit your dietary needs and preferences. Plan your meal for
          the week, daily and monthly
        </p>
        <p>
          Join our community today and start cooking your way to a healthier,
          happier you.
        </p>
        {/* <div className="footer-socials">
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" />
          <img src={twitter} alt="twitter" />
          <img src={youtube} alt="youtube" />
        </div> */}
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
      </div>
    </div>
  );
}

export default Footer;
