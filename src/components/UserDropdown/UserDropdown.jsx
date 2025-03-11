import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDropdown.css";

function UserDropdown({ setIsLoggedIn, isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  if (!isOpen) return null;

  return (
    <div className="user-dropdown">
      <div className="dropdown-content">
        <button onClick={() => navigate("/loggedin/profile")}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="dropdown-overlay" onClick={onClose} />
    </div>
  );
}

export default UserDropdown;
