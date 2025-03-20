import React, { useState } from "react";
import "./SecurityTab.css";
import { assets } from "../../assets/assets";

const SecurityTab = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    // Clear messages when user starts typing again
    setErrorMessage("");
    setSuccessMessage("");
  };

  // In the SecurityTab.jsx file, update the handlePasswordChange function
  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setErrorMessage("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New password and confirm password don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    // For demo purposes, we'll update any stored password in localStorage
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      // In a real app, you would hash the password
      userData.password = passwordData.newPassword;
      localStorage.setItem("userData", JSON.stringify(userData));

      setSuccessMessage("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Close the password change form after a delay
      setTimeout(() => {
        setIsChangingPassword(false);
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Failed to update password. Please try again.");
    }
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Password & Security</h2>
      </div>

      <div className="security-content">
        <div className="security-card">
          <h3>Password</h3>
          <p>Last changed: 3 months ago</p>

          {!isChangingPassword ? (
            <button
              className="edit-button"
              onClick={() => setIsChangingPassword(true)}
            >
              Change Password
            </button>
          ) : (
            <form onSubmit={handlePasswordChange} className="password-form">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-button">
                  Update Password
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setErrorMessage("");
                    setSuccessMessage("");
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="security-card">
          <h3>Login Settings</h3>

          <div className="security-option">
            <div>
              <h4>Two-Factor Authentication</h4>
              <p>Add an extra layer of security to your account</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="security-option">
            <div>
              <h4>Login Notifications</h4>
              <p>Get notified when someone logs into your account</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div className="security-card">
          <h3>Connected Accounts</h3>

          <div className="connected-account">
            <div className="account-info">
              <img src={assets.google} alt="Google" />
              <div>
                <h4>Google</h4>
                <p>Connected on Oct 15, 2023</p>
              </div>
            </div>
            <button className="disconnect-btn">Disconnect</button>
          </div>

          <div className="connected-account">
            <div className="account-info">
              <img src={assets.facebook} alt="Facebook" />
              <div>
                <h4>Facebook</h4>
                <p>Not connected</p>
              </div>
            </div>
            <button className="connect-btn">Connect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
