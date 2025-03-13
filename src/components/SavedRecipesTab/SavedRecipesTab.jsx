import React from "react";
import { assets } from "../../assets/assets";


const SavedRecipesTab = () => {
  // Demo data for saved recipes
  const savedRecipes = [
    {
      id: 1,
      title: "Avocado & Egg Toast",
      image: assets.lunch_1,
      calories: 320,
      protein: 15,
      time: 10,
      saved: "2023-10-15",
    },
    {
      id: 2,
      title: "Greek Yogurt with Berries",
      image: assets.lunch_1,
      calories: 220,
      protein: 18,
      time: 5,
      saved: "2023-10-10",
    },
    {
      id: 3,
      title: "Chicken Quinoa Bowl",
      image: assets.lunch_1,
      calories: 450,
      protein: 35,
      time: 25,
      saved: "2023-09-25",
    },
  ];

  return (
    <div className="profile-section">
      <div className="section-header">
        <h2>Saved Recipes</h2>
      </div>

      <div className="saved-recipes">
        {savedRecipes.length > 0 ? (
          <div className="recipe-cards">
            {savedRecipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.title} />
                </div>
                <div className="recipe-details">
                  <h3>{recipe.title}</h3>
                  <div className="recipe-stats">
                    <div className="stat">
                      <span className="icon">🔥</span>
                      <span>{recipe.calories} calories</span>
                    </div>
                    <div className="stat">
                      <span className="icon">🍗</span>
                      <span>{recipe.protein}g protein</span>
                    </div>
                    <div className="stat">
                      <span className="icon">⏱️</span>
                      <span>{recipe.time} mins</span>
                    </div>
                  </div>
                  <div className="recipe-actions">
                    <button className="view-recipe-btn">View Recipe</button>
                    <button className="remove-btn">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <img src={assets.empty_plate} alt="No saved recipes" />
            <h3>No Saved Recipes</h3>
            <p>
              You haven't saved any recipes yet. Browse our recipes and click
              the save button to add them here!
            </p>
            <button className="browse-recipes-btn">Browse Recipes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipesTab;
