import React, { useState } from "react";
import "./RecipeFilter.css";

const RecipeFilter = ({
  activeFilters,
  setActiveFilters,
  searchQuery,
  setSearchQuery,
}) => {
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const foodGroups = ["Protein", "Grain", "Vegetable", "Fruit"];
  const fitnessPlans = [
    "Weight Loss",
    "Muscle Gain",
    "Performance",
    "Wellness",
    "Strength Training",
    "Lean Muscle",
  ];
  const dietaryPreferences = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "High-Protein",
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFilter = (filterType, value) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[filterType]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        return { ...prev, [filterType]: [...currentFilters, value] };
      } else {
        currentFilters.splice(index, 1);
        return { ...prev, [filterType]: currentFilters };
      }
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      mealTypes: [],
      foodGroups: [],
      fitnessPlans: [],
      dietaryPreferences: [],
    });
    setSearchQuery("");
  };

  return (
    <div className="recipe-filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Keep your existing filter sections */}
      <div className="filter-section">
        <h3>Meal Type</h3>
        <div className="filter-options">
          {mealTypes.map((type) => (
            <button
              key={type}
              className={`filter-button ${
                activeFilters.mealTypes.includes(type) ? "active" : ""
              }`}
              onClick={() => toggleFilter("mealTypes", type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Keep your existing food group and fitness plan filters */}

      {/* Add dietary preferences filter */}
      <div className="filter-section">
        <h3>Dietary Preferences</h3>
        <div className="filter-options">
          {dietaryPreferences.map((pref) => (
            <button
              key={pref}
              className={`filter-button ${
                activeFilters.dietaryPreferences?.includes(pref) ? "active" : ""
              }`}
              onClick={() => toggleFilter("dietaryPreferences", pref)}
            >
              {pref}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Fitness Plan</h3>
        <div className="filter-options">
          {fitnessPlans.map((plan) => (
            <button
              key={plan}
              className={`filter-button ${
                activeFilters.fitnessPlans.includes(plan) ? "active" : ""
              }`}
              onClick={() => toggleFilter("fitnessPlans", plan)}
            >
              {plan}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Food Groups</h3>
        <div className="filter-options">
          {foodGroups.map((group) => (
            <button
              key={group}
              className={`filter-button ${
                activeFilters.foodGroups.includes(group) ? "active" : ""
              }`}
              onClick={() => toggleFilter("foodGroups", group)}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <button className="clear-filters-button" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default RecipeFilter;
