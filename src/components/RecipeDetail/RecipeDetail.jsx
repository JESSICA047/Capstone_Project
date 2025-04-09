import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes_list } from "../../assets/assets";
import NavbarLogin from "../NavbarLogin/NavbarLogin";
import FooterLogin from "../FooterLogin/FooterLogin";
import AddToMealPlanModal from "../AddToMealPlanModal/AddToMealPlanModal";
import { useToast } from "../../contexts/ToastContext"; // Import the toast hook
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMealPlanModal, setShowMealPlanModal] = useState(false);
  const { showToast } = useToast(); // Use the toast hook

  // Find the recipe by id
  const recipe = recipes_list.find((recipe) => recipe.id === parseInt(id));

  if (!recipe) {
    return <div className="recipe-not-found">Recipe not found</div>;
  }

  const handleAddToMealPlan = (mealPlanData) => {
    try {
      // Get current meal plan from localStorage
      const mealPlanJSON = localStorage.getItem("mealPlan");
      let mealPlan = mealPlanJSON ? JSON.parse(mealPlanJSON) : {};

      // Initialize the day if it doesn't exist
      if (!mealPlan[mealPlanData.day]) {
        mealPlan[mealPlanData.day] = {};
      }

      // Add the recipe to the meal plan
      mealPlan[mealPlanData.day][mealPlanData.meal] = {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        calories: recipe.calories,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat,
        category: recipe.category || [],
      };

      // Save to localStorage
      localStorage.setItem("mealPlan", JSON.stringify(mealPlan));

      // Show toast notification instead of alert
      showToast(
        `${recipe.name} added to your meal plan for ${mealPlanData.day}'s ${mealPlanData.meal}`,
        "success"
      );
      setShowMealPlanModal(false);
    } catch (error) {
      console.error("Error adding to meal plan:", error);
      showToast("Could not add to meal plan", "error");
    }
  };

  const handleSaveRecipe = () => {
    try {
      // Get existing saved recipes from localStorage
      const savedRecipesJSON = localStorage.getItem("savedRecipes");
      let savedRecipes = savedRecipesJSON ? JSON.parse(savedRecipesJSON) : [];

      // Check if recipe is already saved (compare as numbers)
      const isAlreadySaved = savedRecipes.some(
        (item) => parseInt(item.id) === parseInt(recipe.id)
      );

      if (isAlreadySaved) {
        // Show toast notification instead of alert
        showToast(`${recipe.name} is already in your saved recipes`, "info");
        return;
      }

      // Add to saved recipes
      savedRecipes.push({
        ...recipe,
        savedAt: new Date().toISOString(),
      });

      // Save to localStorage
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

      // Show toast notification instead of alert
      showToast(`${recipe.name} added to your saved recipes`, "success");
    } catch (error) {
      console.error("Error saving recipe:", error);
      showToast("Could not save recipe", "error");
    }
  };

  return (
    <>
      <NavbarLogin />
      <div className="recipe-detail-container">
        <div className="recipe-detail">
          <button className="back-button" onClick={() => navigate(-1)}>
            &larr; Back to Recipes
          </button>

          <div className="recipe-header">
            <h1>{recipe.name}</h1>
            <div className="recipe-meta">
              {recipe.prepTime && (
                <span className="prep-time">
                  <i className="fas fa-clock"></i> Prep: {recipe.prepTime} mins
                </span>
              )}
              {recipe.cookTime && (
                <span className="cook-time">
                  <i className="fas fa-fire"></i> Cook: {recipe.cookTime} mins
                </span>
              )}
              {recipe.servings && (
                <span className="servings">
                  <i className="fas fa-utensils"></i> Servings:{" "}
                  {recipe.servings}
                </span>
              )}
            </div>
          </div>

          <div className="recipe-image-container">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-detail-image"
            />
          </div>

          <div className="recipe-content">
            {(recipe.calories ||
              recipe.protein ||
              recipe.carbs ||
              recipe.fat) && (
              <div className="nutrition-breakdown">
                <h2>Nutrition (per serving)</h2>
                <div className="nutrition-grid">
                  {recipe.calories && (
                    <div className="nutrition-item">
                      <span className="nutrition-value">{recipe.calories}</span>
                      <span className="nutrition-label">Calories</span>
                    </div>
                  )}
                  {recipe.protein && (
                    <div className="nutrition-item">
                      <span className="nutrition-value">{recipe.protein}g</span>
                      <span className="nutrition-label">Protein</span>
                    </div>
                  )}
                  {recipe.carbs && (
                    <div className="nutrition-item">
                      <span className="nutrition-value">{recipe.carbs}g</span>
                      <span className="nutrition-label">Carbs</span>
                    </div>
                  )}
                  {recipe.fat && (
                    <div className="nutrition-item">
                      <span className="nutrition-value">{recipe.fat}g</span>
                      <span className="nutrition-label">Fat</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="ingredients-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="ingredient-item">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.instructions && recipe.instructions.length > 0 && (
              <div className="instructions-section">
                <h2>Instructions</h2>
                <ol className="instructions-list">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="instruction-step">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="recipe-actions">
            <button
              className="add-to-meal-plan-btn"
              onClick={() => setShowMealPlanModal(true)}
            >
              <i className="fa fa-plus"></i> Add to Meal Plan
            </button>
            <button className="save-recipe-button" onClick={handleSaveRecipe}>
              <i className="fa fa-heart" aria-hidden="true"></i> Save
            </button>
          </div>
        </div>
      </div>

      {showMealPlanModal && (
        <AddToMealPlanModal
          recipe={recipe}
          isOpen={showMealPlanModal}
          onClose={() => setShowMealPlanModal(false)}
          onSave={handleAddToMealPlan}
        />
      )}

      <FooterLogin />
    </>
  );
};

export default RecipeDetail;
