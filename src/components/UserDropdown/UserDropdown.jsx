import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./UserDropdown.css";

function UserDropdown({ setIsLoggedIn, isOpen, onClose }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "User",
    email: "user@example.com",
  });

  useEffect(() => {
    // Get user data from localStorage if available
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData.name || parsedData.email) {
          setUserData({
            name: parsedData.name || "User",
            email: parsedData.email || "user@example.com",
          });
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="user-dropdown">
      <div className="dropdown-content">
        <div className="dropdown-header">
          <img src={assets.logo_login || assets.user_avatar} alt="User" />
          <div className="user-info">
            <h4>{userData.name}</h4>
            <p>{userData.email}</p>
          </div>
        </div>

        <div className="dropdown-menu">
          <button
            onClick={() => {
              navigate("/loggedin/profile");
              onClose();
            }}
          >
            <span className="menu-icon">👤</span>
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              navigate("/loggedin/settings");
              onClose();
            }}
          >
            <span className="menu-icon">⚙️</span>
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              navigate("/loggedin/saved");
              onClose();
            }}
          >
            <span className="menu-icon">❤️</span>
            <span>Saved Items</span>
          </button>
        </div>

        <div className="dropdown-footer">
          <button onClick={handleLogout} className="logout-button">
            <span className="menu-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="dropdown-overlay" onClick={onClose} />
    </div>
  );
}

export default UserDropdown;
