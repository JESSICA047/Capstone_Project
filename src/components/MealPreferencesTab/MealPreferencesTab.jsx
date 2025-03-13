import React, { useState } from "react";
import "./MealPreferencesTab.css";

const MealPreferencesTab = ({ userData, updateUserData }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (cuisine) => {
    const currentPreferences = [...(formData.cuisinePreferences || [])];
    if (currentPreferences.includes(cuisine)) {
      setFormData({
        ...formData,
        cuisinePreferences: currentPreferences.filter(
          (item) => item !== cuisine
        ),
      });
    } else {
      setFormData({
        ...formData,
        cuisinePreferences: [...currentPreferences, cuisine],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData(formData);
    setIsEditing(false);
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
    <div className="meal-preferences-tab">
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
              <label htmlFor="preferredDiet">Preferred Diet Type</label>
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
              <label htmlFor="allergies">Allergies/Intolerances</label>
              <textarea
                id="allergies"
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                placeholder="List any food allergies or intolerances"
              />
            </div>

            <div className="form-group">
              <label htmlFor="excludeIngredients">Ingredients to Avoid</label>
              <textarea
                id="excludeIngredients"
                name="excludeIngredients"
                value={formData.excludeIngredients}
                onChange={handleInputChange}
                placeholder="Separate ingredients with commas (e.g., bell peppers, mushrooms)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="mealServings">Default Meal Servings</label>
              <select
                id="mealServings"
                name="mealServings"
                value={formData.mealServings}
                onChange={handleInputChange}
              >
                <option value="1">1 serving</option>
                <option value="2">2 servings</option>
                <option value="4">4 servings</option>
                <option value="6">6 servings</option>
                <option value="8">8 servings</option>
              </select>
            </div>
          </div>

          <div className="nutrition-targets">
            <h3>Daily Nutrition Targets</h3>
            <div className="nutrition-grid">
              <div className="form-group">
                <label htmlFor="calorieTarget">Daily Calories (kcal)</label>
                <input
                  type="number"
                  id="calorieTarget"
                  name="calorieTarget"
                  value={formData.calorieTarget}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="proteinTarget">Protein (g)</label>
                <input
                  type="number"
                  id="proteinTarget"
                  name="proteinTarget"
                  value={formData.proteinTarget}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carbTarget">Carbohydrates (g)</label>
                <input
                  type="number"
                  id="carbTarget"
                  name="carbTarget"
                  value={formData.carbTarget}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fatTarget">Fat (g)</label>
                <input
                  type="number"
                  id="fatTarget"
                  name="fatTarget"
                  value={formData.fatTarget}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="cuisine-preferences">
            <h3>Cuisine Preferences</h3>
            <div className="cuisine-grid">
              {cuisineOptions.map((cuisine) => (
                <div className="cuisine-checkbox" key={cuisine}>
                  <input
                    type="checkbox"
                    id={`cuisine-${cuisine}`}
                    checked={
                      formData.cuisinePreferences?.includes(cuisine) || false
                    }
                    onChange={() => handleCheckboxChange(cuisine)}
                  />
                  <label htmlFor={`cuisine-${cuisine}`}>{cuisine}</label>
                </div>
              ))}
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
                  preferredDiet: userData.preferredDiet,
                  allergies: userData.allergies,
                  cuisinePreferences: userData.cuisinePreferences,
                  mealServings: userData.mealServings,
                  calorieTarget: userData.calorieTarget,
                  proteinTarget: userData.proteinTarget,
                  carbTarget: userData.carbTarget,
                  fatTarget: userData.fatTarget,
                  excludeIngredients: userData.excludeIngredients,
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="preferences-display">
          <div className="preferences-grid">
            <div className="preference-card">
              <h3>Diet Preferences</h3>
              <div className="preference-item">
                <span className="label">Diet Type:</span>
                <span className="value">
                  {userData.preferredDiet || "Not specified"}
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Allergies:</span>
                <span className="value">{userData.allergies || "None"}</span>
              </div>
              <div className="preference-item">
                <span className="label">Avoided Ingredients:</span>
                <span className="value">
                  {userData.excludeIngredients || "None"}
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Meal Servings:</span>
                <span className="value">
                  {userData.mealServings || "2"} servings
                </span>
              </div>
            </div>

            <div className="preference-card">
              <h3>Nutrition Targets</h3>
              <div className="preference-item">
                <span className="label">Daily Calories:</span>
                <span className="value">
                  {userData.calorieTarget || "2000"} kcal
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Protein:</span>
                <span className="value">
                  {userData.proteinTarget || "100"} g
                </span>
              </div>
              <div className="preference-item">
                <span className="label">Carbohydrates:</span>
                <span className="value">{userData.carbTarget || "200"} g</span>
              </div>
              <div className="preference-item">
                <span className="label">Fat:</span>
                <span className="value">{userData.fatTarget || "65"} g</span>
              </div>
            </div>
          </div>

          <div className="cuisine-display">
            <h3>Preferred Cuisines</h3>
            <div className="cuisine-tags">
              {userData.cuisinePreferences &&
              userData.cuisinePreferences.length > 0 ? (
                userData.cuisinePreferences.map((cuisine) => (
                  <span key={cuisine} className="cuisine-tag">
                    {cuisine}
                  </span>
                ))
              ) : (
                <p>No cuisine preferences specified</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPreferencesTab;
