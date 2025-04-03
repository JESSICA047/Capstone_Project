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

  // In your logout handler function:

  const handleLogout = () => {
    // Clear the welcome flag so it shows again on next login
    localStorage.removeItem("hasSeenWelcome");

    // Your existing logout code
    localStorage.removeItem("userData");
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
              navigate("/dashboard/profile");
              onClose();
            }}
          >
            <span className="menu-icon">👤</span>
            <span>Profile</span>
          </button>

          <button
            onClick={() => {
              // Navigate to profile page with saved-recipes tab active
              navigate("/dashboard/profile", {
                state: { activeTab: "saved-recipes" },
              });
              onClose();
            }}
          >
            <span className="menu-icon">❤️</span>
            <span>Saved Recipes</span>
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
