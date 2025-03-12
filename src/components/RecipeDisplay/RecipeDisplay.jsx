import React from "react";
import RecipeItem from "../RecipesItem/RecipeItem";
import "./RecipeDisplay.css";

const RecipeDisplay = ({ recipes }) => {
  return (
    <div className="recipe-display">
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            description={recipe.description}
            image={recipe.image}
            category={recipe.category}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeDisplay;
