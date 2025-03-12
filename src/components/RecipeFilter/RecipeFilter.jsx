import React from "react";
import { fitnessPlans } from "../PlanFilter/PlanFilter";
import "./RecipeFilter.css";

const mealTypeEmojis = {
  Breakfast: "🍳",
  Lunch: "🍽️",
  Dinner: "🌙",
  Snack: "🥨",
};

const foodGroupEmojis = {
  Protein: "🥩",
  Vegetable: "🥬",
  Grain: "🌾",
  Fruit: "🍎",
};

const RecipeFilter = ({ activeFilters, setActiveFilters }) => {
  const handleFilterChange = (category, type) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      const categoryArray = newFilters[category];

      if (categoryArray.includes(type)) {
        // Remove the filter if it's already active
        newFilters[category] = categoryArray.filter((item) => item !== type);
      } else {
        // Add the filter if it's not active
        newFilters[category] = [...categoryArray, type];
      }

      return newFilters;
    });
  };

  return (
    <div className="recipe-filter">
      <div className="filter-section">
        <h3>🎯 Fitness Plans</h3>
        <div className="filter-options">
          {Object.entries(fitnessPlans).map(([planName, planInfo]) => (
            <label key={planInfo.id}>
              <input
                type="checkbox"
                checked={activeFilters.fitnessPlans?.includes(planName)}
                onChange={() => handleFilterChange("fitnessPlans", planName)}
              />
              <span className="plan-icon-small">{planInfo.icon}</span>
              {planName}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>⏰ Meal Types</h3>
        <div className="filter-options">
          {Object.entries(mealTypeEmojis).map(([type, emoji]) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={activeFilters.mealTypes.includes(type)}
                onChange={() => handleFilterChange("mealTypes", type)}
              />
              <span className="category-emoji">{emoji}</span>
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>🥗 Food Groups</h3>
        <div className="filter-options">
          {Object.entries(foodGroupEmojis).map(([type, emoji]) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={activeFilters.foodGroups.includes(type)}
                onChange={() => handleFilterChange("foodGroups", type)}
              />
              <span className="category-emoji">{emoji}</span>
              {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;
