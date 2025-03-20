import React, { useState } from "react";
import "./MealPreferencesTab.css";

const MealPreferencesTab = ({ userData, setUserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    preferredDiet: userData.preferredDiet || "Balanced",
    allergies: userData.allergies || "None",
    cuisinePreferences: userData.cuisinePreferences || [
      "Italian",
      "Mediterranean",
    ],
    mealServings: userData.mealServings || "2",
    calorieTarget: userData.calorieTarget || "2000",
    proteinTarget: userData.proteinTarget || "100",
    carbTarget: userData.carbTarget || "200",
    fatTarget: userData.fatTarget || "65",
    excludeIngredients: userData.excludeIngredients || "",
  });

  // Add this function - it's missing in your component
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create updated user data
    const updatedUserData = { ...userData, ...formData };

    // Update state in parent component
    setUserData(updatedUserData);

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // Exit edit mode
    setIsEditing(false);
  };

  const handleCheckboxChange = (cuisine) => {
    // Create a copy of the current cuisinePreferences array
    let updatedCuisines = [...formData.cuisinePreferences];

    if (updatedCuisines.includes(cuisine)) {
      // Remove cuisine if it's already in the array
      updatedCuisines = updatedCuisines.filter((item) => item !== cuisine);
    } else {
      // Add cuisine if it's not in the array
      updatedCuisines.push(cuisine);
    }

    // Update formData with new cuisinePreferences
    setFormData({
      ...formData,
      cuisinePreferences: updatedCuisines,
    });
  };

  const dietOptions = [
    "Balanced",
    "High-protein",
    "Low-carb",
    "Low-fat",
    "Vegetarian",
    "Vegan",
    "Keto",
    "Paleo",
    "Mediterranean",
    "Pescatarian",
    "Gluten-free",
  ];

  const cuisineOptions = [
    "Italian",
    "Mediterranean",
    "Mexican",
    "American",
    "Asian",
    "Indian",
    "Greek",
    "Middle Eastern",
    "Thai",
    "Japanese",
    "Chinese",
    "French",
    "Spanish",
  ];

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Meal Preferences</h2>
        {!isEditing && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="preferredDiet">Preferred Diet</label>
              <select
                id="preferredDiet"
                name="preferredDiet"
                value={formData.preferredDiet}
                onChange={handleInputChange}
              >
                {dietOptions.map((diet) => (
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="allergies">Allergies</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="e.g., Nuts, Shellfish, Dairy"
              />
            </div>

            <div className="form-group wide">
              <label>Cuisine Preferences</label>
              <div className="checkbox-grid">
                {cuisineOptions.map((cuisine) => (
                  <div key={cuisine} className="checkbox-item">
                    <input
                      type="checkbox"
                      id={`cuisine-${cuisine}`}
                      checked={formData.cuisinePreferences.includes(cuisine)}
                      onChange={() => handleCheckboxChange(cuisine)}
                    />
                    <label htmlFor={`cuisine-${cuisine}`}>{cuisine}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mealServings">Typical Servings</label>
              <select
                id="mealServings"
                name="mealServings"
                value={formData.mealServings}
                onChange={handleInputChange}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="4">4 People</option>
                <option value="6">6 People</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calorieTarget">Daily Calorie Target</label>
              <input
                type="number"
                id="calorieTarget"
                name="calorieTarget"
                value={formData.calorieTarget}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="proteinTarget">Protein Target (g)</label>
              <input
                type="number"
                id="proteinTarget"
                name="proteinTarget"
                value={formData.proteinTarget}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbTarget">Carbs Target (g)</label>
              <input
                type="number"
                id="carbTarget"
                name="carbTarget"
                value={formData.carbTarget}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fatTarget">Fat Target (g)</label>
              <input
                type="number"
                id="fatTarget"
                name="fatTarget"
                value={formData.fatTarget}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group wide">
              <label htmlFor="excludeIngredients">Ingredients to Avoid</label>
              <textarea
                id="excludeIngredients"
                name="excludeIngredients"
                value={formData.excludeIngredients}
                onChange={handleInputChange}
                placeholder="Enter ingredients to avoid, separated by commas"
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setFormData({
                  preferredDiet: userData.preferredDiet || "Balanced",
                  allergies: userData.allergies || "None",
                  cuisinePreferences: userData.cuisinePreferences || [
                    "Italian",
                    "Mediterranean",
                  ],
                  mealServings: userData.mealServings || "2",
                  calorieTarget: userData.calorieTarget || "2000",
                  proteinTarget: userData.proteinTarget || "100",
                  carbTarget: userData.carbTarget || "200",
                  fatTarget: userData.fatTarget || "65",
                  excludeIngredients: userData.excludeIngredients || "",
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="preference-display">
          <div className="preference-grid">
            <div className="preference-card">
              <h3>Diet & Nutrition</h3>
              <div className="preference-item">
                <span className="label">Preferred Diet:</span>
                <span className="value">
                  {userData.preferredDiet || "Balanced"}
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Daily Calories:</span>
                <span className="value">
                  {userData.calorieTarget || "2000"} kcal
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Protein:</span>
                <span className="value">
                  {userData.proteinTarget || "100"}g
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Carbs:</span>
                <span className="value">{userData.carbTarget || "200"}g</span>
              </div>
              <div className="preference-item">
                <span className="label">Fat:</span>
                <span className="value">{userData.fatTarget || "65"}g</span>
              </div>
            </div>

            <div className="preference-card">
              <h3>Meal Planning</h3>
              <div className="preference-item">
                <span className="label">Cuisines:</span>
                <span className="value cuisine-tags">
                  {userData.cuisinePreferences &&
                  userData.cuisinePreferences.length > 0
                    ? userData.cuisinePreferences.map((cuisine, index) => (
                        <span key={index} className="cuisine-tag">
                          {cuisine}
                        </span>
                      ))
                    : "No preferences set"}
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Typical Servings:</span>
                <span className="value">
                  {userData.mealServings || "2"} people
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Allergies:</span>
                <span className="value">{userData.allergies || "None"}</span>
              </div>
              <div className="preference-item">
                <span className="label">Avoided Ingredients:</span>
                <span className="value">
                  {userData.excludeIngredients
                    ? userData.excludeIngredients
                    : "None specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPreferencesTab;
