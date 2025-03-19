import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarLogin from "../../components/NavbarLogin/NavbarLogin";
import FooterLogin from "../../components/FooterLogin/FooterLogin";
import { assets } from "../../assets/assets";
import PersonalInfoTab from "../../components/PersonalInfoTab/PersonalInfoTab";
import MealPreferencesTab from "../../components/MealPreferencesTab/MealPreferencesTab";
import SavedRecipesTab from "../../components/SavedRecipesTab/SavedRecipesTab";
import SecurityTab from "../../components/SecurityTab/SecurityTab";
import "./ProfilePage.css";

const ProfilePage = ({ setIsLoggedIn }) => {
  // Initial state with demo user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    weight: "75",
    height: "180",
    goal: "Lose weight",
    activityLevel: "Moderate",
    preferredDiet: "Balanced",
    allergies: "None",
    age: "30",
    gender: "Male",
    cuisinePreferences: ["Italian", "Mediterranean", "Mexican"],
  });

  // Get the location object to check for state
  const location = useLocation();

  // Set the active tab, with priority:
  // 1. Tab specified in location state (from navigation)
  // 2. Default to "personal"
  const [activeTab, setActiveTab] = useState(() => {
    if (location.state && location.state.activeTab) {
      return location.state.activeTab;
    }
    return "personal";
  });

  // Load user data from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData((prev) => ({ ...prev, ...parsedData }));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  // Render the active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case "personal":
        return (
          <PersonalInfoTab userData={userData} setUserData={setUserData} />
        );
      case "meal-preferences":
        return (
          <MealPreferencesTab userData={userData} setUserData={setUserData} />
        );
      case "saved-recipes":
        return <SavedRecipesTab />;
      case "security":
        return <SecurityTab />;
      default:
        return (
          <PersonalInfoTab userData={userData} setUserData={setUserData} />
        );
    }
  };

  return (
    <>
      <NavbarLogin setIsLoggedIn={setIsLoggedIn} />
      <div className="profile-page">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <img
                src={assets.logo_login || assets.user_avatar}
                alt="User Avatar"
              />
              <h2>{userData.name}</h2>
              <p>{userData.email}</p>
            </div>
            <div className="profile-navigation">
              <button
                className={activeTab === "personal" ? "active" : ""}
                onClick={() => setActiveTab("personal")}
              >
                Personal Information
              </button>
              <button
                className={activeTab === "meal-preferences" ? "active" : ""}
                onClick={() => setActiveTab("meal-preferences")}
              >
                Meal Preferences
              </button>
              <button
                className={activeTab === "saved-recipes" ? "active" : ""}
                onClick={() => setActiveTab("saved-recipes")}
              >
                Saved Recipes
              </button>
              <button
                className={activeTab === "security" ? "active" : ""}
                onClick={() => setActiveTab("security")}
              >
                Password & Security
              </button>
            </div>
          </div>

          <div className="profile-main">{renderActiveTab()}</div>
        </div>
      </div>
      <FooterLogin />
    </>
  );
};

export default ProfilePage;
