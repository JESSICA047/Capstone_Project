import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddToMealPlanModal from "../AddToMealPlanModal/AddToMealPlanModal";
import { useToast } from "../../contexts/ToastContext"; // Create this context for notifications
import "./RecipeItem.css";

const RecipeItem = ({
  id,
  name,
  description,
  image,
  category,
  calories,
  protein,
  carbs,
  fat,
  prepTime,
  cookTime,
}) => {
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast(); // Use toast context for notifications

  const handleViewRecipe = () => {
    navigate(`/recipe/${id}`);
  };

  const handleAddToMealPlan = (mealPlanData) => {
    // Get existing meal plan from localStorage
    const existingMealPlan = JSON.parse(
      localStorage.getItem("mealPlan") || "[]"
    );

    // Check if recipe is already in the meal plan for the same day and meal
    const isDuplicate = existingMealPlan.some(
      (item) =>
        item.recipeId === mealPlanData.recipeId &&
        item.day === mealPlanData.day &&
        item.meal === mealPlanData.meal
    );

    if (isDuplicate) {
      showToast(
        "Recipe already exists in your meal plan for this day and meal",
        "warning"
      );
      return;
    }

    // Add recipe to meal plan with all needed information
    const updatedMealPlan = [
      ...existingMealPlan,
      {
        ...mealPlanData,
        recipeImage: image,
        recipeCalories: calories || 0,
        recipeProtein: protein || 0,
        recipeCarbs: carbs || 0,
        recipeFat: fat || 0,
        dateAdded: new Date().toISOString(),
      },
    ];

    // Save to localStorage
    localStorage.setItem("mealPlan", JSON.stringify(updatedMealPlan));

    showToast(
      `${name} added to your meal plan for ${mealPlanData.day} ${mealPlanData.meal}`,
      "success"
    );
    setShowMealPlanModal(false);
  };

  return (
    <div className="recipe-item">
      <div className="recipe-image-container" onClick={handleViewRecipe}>
        <img src={image} alt={name} className="recipe-image" />
        {prepTime && cookTime && (
          <div className="recipe-time">
            <span>{prepTime + cookTime} min</span>
          </div>
        )}
      </div>

      <div className="recipe-info">
        <h3 className="recipe-name" onClick={handleViewRecipe}>
          {name}
        </h3>
        <p className="recipe-description">{description}</p>

        {(calories || protein || carbs || fat) && (
          <div className="recipe-nutrition">
            {calories && (
              <div className="nutrition-pill">
                <span className="nutrition-value">{calories}</span>
                <span className="nutrition-label">cal</span>
              </div>
            )}
            {protein && (
              <div className="nutrition-pill">
                <span className="nutrition-value">{protein}g</span>
                <span className="nutrition-label">protein</span>
              </div>
            )}
            {carbs && (
              <div className="nutrition-pill">
                <span className="nutrition-value">{carbs}g</span>
                <span className="nutrition-label">carbs</span>
              </div>
            )}
            {fat && (
              <div className="nutrition-pill">
                <span className="nutrition-value">{fat}g</span>
                <span className="nutrition-label">fat</span>
              </div>
            )}
          </div>
        )}

        <div className="recipe-categories">
          {category.slice(0, 3).map((cat, index) => (
            <span key={index} className="category-tag">
              {cat}
            </span>
          ))}
          {category.length > 3 && (
            <span className="category-tag more-tag">
              +{category.length - 3}
            </span>
          )}
        </div>

        <div className="recipe-actions">
          <button onClick={handleViewRecipe} className="view-recipe-button">
            View Recipe
          </button>
          <button
            className="add-to-meal-plan-button"
            onClick={() => setShowMealPlanModal(true)}
          >
            <i class="fa fa-plus" aria-hidden="true"></i> Add to Meal Plan
          </button>
        </div>
      </div>

      {showMealPlanModal && (
        <AddToMealPlanModal
          recipe={{ id, name, image }}
          isOpen={showMealPlanModal}
          onClose={() => setShowMealPlanModal(false)}
          onSave={handleAddToMealPlan}
        />
      )}
    </div>
  );
};

export default RecipeItem;
