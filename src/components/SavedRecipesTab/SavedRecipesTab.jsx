import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useUserStats } from "../../contexts/UserStatsContext/UserStatsContext";
import "./SavedRecipesTab.css";

const SavedRecipesTab = () => {
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { updateStat } = useUserStats(); // Add this line to get the updateStat function

  // Load saved recipes from localStorage when component mounts
  useEffect(() => {
    const loadSavedRecipes = () => {
      try {
        // Get saved recipes from localStorage
        const savedRecipesJSON = localStorage.getItem("savedRecipes");
        if (savedRecipesJSON) {
          const parsedRecipes = JSON.parse(savedRecipesJSON);
          setSavedRecipes(parsedRecipes);
          // Add this line to update the count in context
          updateStat("recipesBookmarked", parsedRecipes.length);
        }
      } catch (error) {
        console.error("Error loading saved recipes:", error);
      }
    };

    loadSavedRecipes();
  }, []);

  // Handle removing a recipe from saved recipes
  const handleRemoveRecipe = (recipeId) => {
    try {
      // Filter out the recipe to remove
      const updatedRecipes = savedRecipes.filter(
        (recipe) => recipe.id !== recipeId
      );

      // Update state
      setSavedRecipes(updatedRecipes);

      // Save to localStorage
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
      updateStat("recipesBookmarked", updatedRecipes.length);
    } catch (error) {
      console.error("Error removing recipe:", error);
    }
  };

  // Handle viewing a recipe - this navigates to the recipe details page
  const handleViewRecipe = (recipeId) => {
    navigate(`/loggedin/recipe/${recipeId}`);
  };

  // Handle browsing all recipes
  const handleBrowseRecipes = () => {
    navigate("/loggedin/recipes");
  };

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Saved Recipes</h2>
      </div>

      <div className="saved-recipes">
        {savedRecipes && savedRecipes.length > 0 ? (
          <div className="recipe-cards">
            {savedRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title || recipe.name} />
                </div>
                <div className="recipe-details">
                  <h3>{recipe.title || recipe.name}</h3>
                  <div className="recipe-stats">
                    <div className="stat">
                      <span className="icon">🔥</span>
                      <span>{recipe.calories} calories</span>
                    </div>
                    <div className="stat">
                      <span className="icon">🍗</span>
                      <span>{recipe.protein}g protein</span>
                    </div>
                    {recipe.time && (
                      <div className="stat">
                        <span className="icon">⏱️</span>
                        <span>{recipe.time} mins</span>
                      </div>
                    )}
                  </div>
                  <div className="recipe-actions">
                    <button
                      className="view-recipe-btn"
                      onClick={() => handleViewRecipe(recipe.id)}
                    >
                      View Recipe
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveRecipe(recipe.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Saved Recipes</h3>
            <p>
              You haven't saved any recipes yet. Browse our recipes and click
              the save button to add them here!
            </p>
            <button
              className="browse-recipes-btn"
              onClick={handleBrowseRecipes}
            >
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipesTab;
