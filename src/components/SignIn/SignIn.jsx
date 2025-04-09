import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./SignIn.css";
import PropTypes from "prop-types";

function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    setIsLoggedIn(true);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="signin-container">
      <div className="left">
        <img src={assets.signin} alt="" />
        <div className="text">
          <h3>Welcome Back!</h3>
          <p>To keep connected with us please login with your</p>
          <p>personal info</p>
        </div>
      </div>
      <div className="right">
        <h1>Sign In</h1>
        <input type="email" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <a href="/forgot-password">
          <p>Forgot Password?</p>
        </a>
        <button className="signin-btn" onClick={handleSignIn}>
          LOGIN
        </button>
        <p>or sign in with</p>
        <div className="social-media">
          <img src={assets.google} alt="" />
          <img src={assets.instagram} alt="" />
          <img src={assets.facebook} alt="" />
        </div>
        <p className="text">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
SignIn.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SignIn;
