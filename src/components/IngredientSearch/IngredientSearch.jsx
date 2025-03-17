import React, { useState } from "react";
import "./IngredientSearch.css";

const IngredientSearch = ({ recipes, onSuggestionsGenerated }) => {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleAddIngredient = () => {
    if (inputValue.trim() && !ingredients.includes(inputValue.trim())) {
      setIngredients([...ingredients, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddIngredient();
    }
  };

  const findRecipesWithIngredients = () => {
    if (ingredients.length === 0) return;

    setIsSearching(true);

    // Logic to match recipes that contain these ingredients
    // This is a simple implementation - could be improved
    const matchedRecipes = recipes.filter((recipe) => {
      // Check if recipe has ingredients property
      if (!recipe.ingredients) return false;

      // Count how many of user's ingredients are in the recipe
      const matchCount = ingredients.filter((ing) =>
        recipe.ingredients.some((recipeIng) =>
          recipeIng.toLowerCase().includes(ing.toLowerCase())
        )
      ).length;

      // Return recipes that use at least one of the user's ingredients
      return matchCount > 0;
    });

    // Sort by number of matching ingredients (most matches first)
    matchedRecipes.sort((a, b) => {
      const aMatches = ingredients.filter((ing) =>
        a.ingredients.some((recipeIng) =>
          recipeIng.toLowerCase().includes(ing.toLowerCase())
        )
      ).length;

      const bMatches = ingredients.filter((ing) =>
        b.ingredients.some((recipeIng) =>
          recipeIng.toLowerCase().includes(ing.toLowerCase())
        )
      ).length;

      return bMatches - aMatches;
    });

    onSuggestionsGenerated(matchedRecipes);
    setIsSearching(false);
  };

  return (
    <div className="ingredient-search">
      <h2>Find Recipes by Ingredients</h2>
      <p>Enter ingredients you have and we'll suggest recipes you can make</p>

      <div className="ingredient-input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter an ingredient..."
          className="ingredient-input"
        />
        <button onClick={handleAddIngredient} className="add-ingredient-btn">
          Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-tag">
              {ingredient}
              <button
                onClick={() => handleRemoveIngredient(ingredient)}
                className="remove-ingredient"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={findRecipesWithIngredients}
        disabled={ingredients.length === 0 || isSearching}
        className="find-recipes-btn"
      >
        {isSearching ? "Searching..." : "Find Recipes"}
      </button>
    </div>
  );
};

export default IngredientSearch;
